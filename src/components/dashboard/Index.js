import React, { useState, useEffect } from 'react'
import Header from '../common/Header'
import UserInfo from './UserInfo'
import Topic from './Topic'
import { Button, Modal, } from 'react-bootstrap';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';


const Index = () => {

  const navigate = useNavigate()

  const [userData, setUserData] = useState({
    email: '',
    username: '',
    firstname: '',
    lastname: '',
    dateCreated: ''
  })

  const initialValues = {
    name: '',
    visibility: 'public'
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Topic name is required'),
    visibility: Yup.string().required('Visibility is required')
  });


  const [topicData, setTopicData] = useState([])
  const [userTopicData, setUserTopicData] = useState([])
  const [showModal, setShowModal] = useState(false)

  const getTopicData = async () => {
    try {
      const topicList = await axios.get(`${process.env.REACT_APP_SERVER_URL}/getTopics`);

      if (topicList == null || topicList.data == null)
        throw "No topics found"

      const publicTopics = topicList.data.filter(topic => topic.visibility == 'public')
      const privateTopics = topicList.data.filter(topic => topic.createdBy == userData.username)
      
      setTopicData(publicTopics)
      setUserTopicData(privateTopics)
    }
    catch (err) {
      Swal.fire({
        title: err,
        text: err?.response?.data,
        icon: "error",
      });
    }
  }

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const getUserData = () => {
    const user = JSON.parse(localStorage.getItem("user"))
    console.log(user)
    if (user === null) {
      Swal.fire({
        title: "Please Login",
        icon: "error",
      });
      navigate("/")
    }
    else
      setUserData({
        ...user
      })
  }

  const handleCreateTopicSubmit = async (values, { setSubmitting }) => {
    try {

      values.createdBy = userData.username
      const topic = await axios.post(`${process.env.REACT_APP_SERVER_URL}/createTopic`, values);
      getTopicData();
      handleClose();
      Swal.fire({
        title: "Topic is created successfully",
        icon: "success",
      });
    }
    catch (err) {
      Swal.fire({
        title: err.response?.data,
        icon: "error",
      });
    }
    finally {
      setSubmitting(false);
    }
  };

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
              // handleEditModalShow={handleEditModalShow}
              getTopicData={getTopicData}
              isUser={true}></Topic>
          </div>
          <div className="col-8">
            <Topic topicData={topicData}
              topicHeading="Public Topics"></Topic>
          </div>
        </div>
      </div>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Topic</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleCreateTopicSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className='form-group row'>
                  <label className='col-auto'>Name</label>
                  <Field type="text" className="col form-control" name="name" placeholder="Topic name" />
                  <ErrorMessage name="name" component="div" className="text-danger" />
                </div>
                <div className='form-group row mt-2'>
                  <label className='col-auto'>Visibility</label>
                  <Field as="select" className="col form-control" name="visibility">
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                  </Field>
                  <ErrorMessage name="visibility" component="div" className="text-danger" />
                </div>
                <div className='row mt-2'>
                  <Button variant="secondary" onClick={handleClose} className='col-auto'>
                    Close
                  </Button>
                  <Button type="submit" variant="primary" disabled={isSubmitting} className='col-auto'>
                    Save Changes
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal >
      {/* <EditTopic showEditTopicModal={showEditTopicModal} handleEditModalClose={handleEditModalClose} topicObj={topicObj}></EditTopic> */}
    </>
  )
}

export default Index
