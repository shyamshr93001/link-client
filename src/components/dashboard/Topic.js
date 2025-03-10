import React, { useState } from "react";
import "./dash.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteTopic } from "../../utils/topicUtils";
import { useDispatch, useSelector } from "react-redux";
import Subscribe from "./Subscribe";
import "bootstrap-icons/font/bootstrap-icons.css";
import moment from "moment";

const Topic = ({
  topicHeading,
  topicData,
  isUser = false,
  handleEditModalShow,
  isUserSub = false,
}) => {
  const dispatch = useDispatch();
  const { userData } = useSelector((store) => store.user);

  const [show, setShow] = useState(false);
  const [topicName, setTopicName] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = (name) => {
    setTopicName(name);
    setShow(true);
  };
  return (
    <>
      <div>
        <h2 className="mt-2">{topicHeading}</h2>
        <div className="mt-3">
          {topicData.toReversed().map((topic, index) => (
            <div key={index} className="topic-card">
              <h4>{topic.name}</h4>
              {!isUser && (
                <div className="my-2">Created by: {topic.createdBy}</div>
              )}
              {isUser && <div>Visibility: {topic.visibility}</div>}
              <div className="d-flex align-items-baseline">
                <div>
                  Date Created:{" "}
                  {moment(topic.dateCreated).format("DD/MM/YY, h:mm:ss a")}
                </div>

                {isUser && (
                  <button
                    className="btn btn-primary mx-2"
                    onClick={(e) => handleEditModalShow(topic)}
                  >
                    <i className="bi bi-pen"></i>
                  </button>
                )}
                {isUser && (
                  <button
                    className="btn btn-danger"
                    onClick={(e) => handleShow(topic.name)}
                  >
                    <i className="bi bi-trash3"></i>
                  </button>
                )}
              </div>
              {topic.createdBy !== userData.username && !isUserSub && (
                <Subscribe topicObj={topic} />
              )}
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
          <Button
            variant="danger"
            onClick={async (e) => {
              await deleteTopic(topicName, dispatch);
              handleClose();
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Topic;
