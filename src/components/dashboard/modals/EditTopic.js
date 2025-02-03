import React, { useState, useEffect } from 'react'
import { Button, Modal, Form, Row } from 'react-bootstrap/';

const EditTopic = ({ showEditTopicModal, handleEditModalClose, updateTopic, topicObj }) => {

    const [name, setName] = useState('');
    const [visibility, setVisibility] = useState(topicObj.visibility);

    useEffect(() => {
        setVisibility(topicObj.visibility)
    }, [topicObj])

    return (
        <Modal show={showEditTopicModal} onHide={handleEditModalClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Topic</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group as={Row} controlId="exampleForm.ControlInput1">
                        <Form.Label column className='col-auto'>Topic Name</Form.Label>
                        <Form.Control
                            type="text"
                            style={{ width: 'fit-content' }}
                            className='col'
                            value={topicObj.name}
                            disabled={true}
                            placeholder=""
                            autoFocus
                        />
                    </Form.Group>
                    <Form.Group as={Row} className="my-3" controlId="exampleForm.ControlInput1">
                        <Form.Label column className='col-auto'>New Name</Form.Label>
                        <Form.Control
                            type="text"
                            style={{ width: 'fit-content' }}
                            className='col'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Update Topic name"
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
                <Button variant="secondary" onClick={handleEditModalClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={(e) => updateTopic({name, visibility})}>
                    Update
                </Button>
            </Modal.Footer>
        </Modal >
    )
}

export default EditTopic
