import React, { useState, useEffect } from 'react'
import Header from '../common/Header'
import UserInfo from './UserInfo'
import Topic from './Topic'
import { Button, Modal, Form, Row } from 'react-bootstrap/';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import EditTopic from './modals/EditTopic';
import Swal from 'sweetalert2'

const Index = () => {

  const navigate = useNavigate()
  const [userData, setUserData] = useState({
    email: '',
    username: '',
    firstname: '',
    lastname: '',
    dateCreated: ''
  })

  const [topicData, setTopicData] = useState([])
  const [userTopicData, setUserTopicData] = useState([])
  const [topicObj, setTopicObj] = useState({})

  const getTopicData = async () => {
    try {
      const topicList = await axios.get(`${process.env.REACT_APP_SERVER_URL}/getTopics`);

      setTopicData(topicList.data.filter(topic => topic.visibility == 'public'))
      setUserTopicData(topicList.data.filter(topic => topic.createdBy == userData.username))
    }
    catch (err) {
      if (err.response.status == 400) {
        alert(err.response.data);
      }
    }
  }

  const [showModal, setShowModal] = useState(false)
  const [showEditTopicModal, setEditTopicModal] = useState(false)

  const handleShow = () => setShowModal(true);
  const handleClose = () => {
    setShowModal(false)
  };

  const handleEditModalShow = (topic) => {
    setTopicObj(topic)
    setEditTopicModal(true)
  };
  const handleEditModalClose = () => {
    setEditTopicModal(false)
  };

  const [name, setName] = useState('');
  const [visibility, setVisibility] = useState('public');

  const getUserData = () => {
    const user = JSON.parse(localStorage.getItem("user"))
    console.log(user)
    if (user === null) {
      navigate("/")
      alert("login")
    }
    else
      setUserData({
        ...user
      })

  }

  const createTopic = async () => {
    const topicForm = {
      name: name,
      visibility: visibility,
      createdBy: userData.username
    }
    try {
      const topic = await axios.post(`${process.env.REACT_APP_SERVER_URL}/createTopic`, topicForm);
      getTopicData()
      handleClose()
      Swal.fire({
        title: "Topic is created successfully",
        icon: "success",
      });
    }
    catch (err) {
      Swal.fire({
        title: err.response.data,
        icon: "error",
      });
    }
  }

  const updateTopic = async (newTopic) => {

    try {
      const topicForm = {
        name: topicObj.name,
        visibility: newTopic.visibility,
        newName: newTopic.name
      }

      const topic = await axios.post(`${process.env.REACT_APP_SERVER_URL}/updateTopic`, topicForm);

      getTopicData()
      handleEditModalClose()
      Swal.fire({
        title: "Updated Topic Successfully",
        icon: "success",
      });
    }
    catch (err) {
      Swal.fire({
        title: err.response.data,
        icon: "error",
      });
    }
  }

  const deleteTopic = async (name) => {
    try {
      console.log(name)
      const topic = await axios.post(`${process.env.REACT_APP_SERVER_URL}/deleteTopic`, { name: name });

      getTopicData()
      Swal.fire({
        title: "Deleted Topic Successfully",
        icon: "success",
      });
    }
    catch (err) {
      Swal.fire({
        title: err.response.data,
        icon: "error",
      });
    }
  }

  useEffect(() => {
    getTopicData()
  }, [userData])

  useEffect(() => {
    let ignore = false;

    if (!ignore) { getUserData(); }
    return () => { ignore = true; }
  }, []);

  return (
    <>
      <div>
        <Header title={userData.firstname + " " + userData.lastname} showTopicModal={handleShow} isLogin={true} />
        <div className='row mx-2'>
          <div className="col-4">
            <UserInfo userData={userData} userTopicData={userTopicData}></UserInfo>
            <Topic topicData={userTopicData}
              topicHeading="Your Topics"
              handleEditModalShow={handleEditModalShow}
              deleteTopic={deleteTopic}
              isUser={true}></Topic>
          </div>
          <div className="col-8">
            <Topic topicData={topicData}
              deleteTopic={deleteTopic}
              topicHeading="Public Topics"></Topic>
          </div>
        </div>
      </div>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Topic</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group as={Row} className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label column className='col-auto'>Name</Form.Label>
              <Form.Control
                type="text"
                style={{ width: 'fit-content' }}
                className='col'
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Topic name"
                autoFocus
              />
            </Form.Group>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="exampleForm.ControlTextarea1">
              <Form.Label column className='col-auto'>Visibility</Form.Label>
              <Form.Select className='col'
                value={visibility}
                onChange={(e) => { setVisibility(e.target.value); }}
              >
                <option>public</option>
                <option>private</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={createTopic}>
            Create
          </Button>
        </Modal.Footer>
      </Modal >
      <EditTopic showEditTopicModal={showEditTopicModal} handleEditModalClose={handleEditModalClose} topicObj={topicObj} updateTopic={updateTopic}></EditTopic>
    </>
  )
}

export default Index
