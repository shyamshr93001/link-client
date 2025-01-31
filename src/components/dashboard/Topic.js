import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './dash.css'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';


const Topic = ({ userData, showModal, handleClose, isUser = false }) => {

    const [topicData, setTopicData] = useState([])
    const [name, setName] = useState('');
    const [visibility, setVisibility] = useState('public');

    const getTopicData = async () => {
        try {
            const topicList = await axios.get(`http://localhost:5000/getTopics`);
            
            
            const myTopic = topicList.data.filter(topic => topic.createdBy == userData.username);
            if (isUser)
                setTopicData(myTopic)
            else
                setTopicData(topicList.data)
        }
        catch (err) {
            if (err.response.status == 400) {
                alert(err.response.data);
            }
        }
    }

    const createTopic = async () => {
        const topicForm = {
            name: name,
            visibility: visibility,
            createdBy: userData.username
        }

        const topic = await axios.post(`http://localhost:5000/createTopic`, topicForm);
        isUser = true
        getTopicData()
        handleClose()
    }

    useEffect(() => {

        console.log(userData);
        let ignore = false;

        if (!ignore) { getTopicData() }
        return () => { ignore = true; }
    }, [userData]);




    return (
        <>
            <div>
                <h2 className='mt-2'>{isUser?"Your Topics":"All Topics"}</h2>
                <div className='mt-3'>
                    {topicData.toReversed().map((topic, index) => (
                        <div key={index} className='topic-card'>
                            <h4>{topic.name}</h4>
                           {!isUser && <p>Created by: {topic.createdBy}</p> }
                            <p>Visibility: {topic.visibility}</p>
                            <p>Date Created: {new Date(topic.dateCreated).toUTCString()}</p>
                        </div>
                    ))}
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
                                onChange={(e) => { setVisibility(e.target.value); console.log(userData) }}
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
        </>
    )
}

export default Topic
