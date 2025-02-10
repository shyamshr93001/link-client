import React, { useState } from 'react'
import './dash.css'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteTopic } from '../../utils/topicUtils';
import { useDispatch } from 'react-redux';
import Subscribe from './Subscribe';


const Topic = ({ topicHeading, topicData, isUser = false, handleEditModalShow }) => {
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const [topicName, setTopicName] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = (name) => {
        setTopicName(name);
        setShow(true);
    }
    return (
        <>
            <div>
                <h2 className='mt-2'>{topicHeading}</h2>
                <div className='mt-3'>
                    {topicData.toReversed().map((topic, index) => (
                        <div key={index} className='topic-card'>
                            <h4>{topic.name}</h4>
                            {!isUser && <p>Created by: {topic.createdBy}</p>}
                            {isUser && <p>Visibility: {topic.visibility}</p>}
                            <div className='d-flex align-items-baseline'>
                                <p>Date Created: {new Date(topic.dateCreated).toLocaleString(undefined, { hour12: true, timeZone: 'Asia/Kolkata' })}</p>

                                {isUser && <button className='btn btn-primary mx-2' onClick={(e) => handleEditModalShow(topic)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pen" viewBox="0 0 16 16">
                                        <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z" />
                                    </svg>
                                </button>}
                                {isUser && <button className='btn btn-danger' onClick={(e) => handleShow(topic.name)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                                    </svg>
                                </button>}

                            </div>
                            {!isUser && <Subscribe topicObj={topic}/> }
                        </div>
                    ))}
                </div>

            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{`Delete ${topicName} Topic`}</Modal.Title>
                </Modal.Header>
                <Modal.Body>You are about to delete topic.</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={async(e) => { await deleteTopic(topicName, dispatch); handleClose() }}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Topic
