import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { updateTopic } from "../../../utils/topicUtils";
import { editTopicSchema } from "../../../utils/schemas/topicSchemas";

const EditTopic = ({ showEditTopicModal, handleEditModalClose, topicObj }) => {
  const dispatch = useDispatch();

  const [initialValues, setInitialValues] = useState({});

  useEffect(() => {
    setInitialValues({
      name: topicObj.name,
      newName: topicObj.name,
      visibility: topicObj.visibility,
    });
  }, [topicObj]);

  const handleEditTopicSubmit = async (values, { setSubmitting }) => {
    await updateTopic(values, dispatch);
    handleEditModalClose();
    setSubmitting(false);
  };

  return (
    <Modal show={showEditTopicModal} onHide={handleEditModalClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Topic</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={initialValues}
          validationSchema={editTopicSchema}
          onSubmit={handleEditTopicSubmit}
          enableReinitialize
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="form-group row">
                <label className="col-auto">Topic Name</label>
                <Field
                  type="text"
                  className="col form-control"
                  name="name"
                  disabled={true}
                />
              </div>
              <div className="form-group row mt-2">
                <label className="col-auto">New Name</label>
                <Field
                  type="text"
                  className="col form-control"
                  name="newName"
                  placeholder="Enter new topic name"
                />
                <ErrorMessage
                  name="newName"
                  component="div"
                  className="text-danger"
                />
              </div>
              <div className="form-group row mt-2">
                <label className="col-auto">Visibility</label>
                <Field
                  as="select"
                  className="col form-control"
                  name="visibility"
                >
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                </Field>
                <ErrorMessage
                  name="visibility"
                  component="div"
                  className="text-danger"
                />
              </div>
              <div className="row mt-2">
                <Button
                  variant="secondary"
                  onClick={handleEditModalClose}
                  className="col-auto"
                >
                  Close
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  disabled={isSubmitting}
                  className="ms-2 col-auto"
                >
                  Save Changes
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default EditTopic;
