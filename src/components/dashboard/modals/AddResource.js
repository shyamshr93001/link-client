import { Formik, Form, Field, ErrorMessage } from "formik";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createResource } from "../../../utils/resourceUtils";
import { addResourceSchema } from "../../../utils/schemas/resourceSchemas";

const AddResourceModal = ({
  showResourceModal,
  handleResourceClose,
  userSubList,
}) => {
  const dispatch = useDispatch();
  const { userData } = useSelector((store) => store.user);

  const [initialValues, setInitialValues] = useState({
    topic: "",
    description: "",
    url: "",
  });

  useEffect(() => {
    setInitialValues({
      topic: userSubList.length > 0 ? userSubList[0].name : "",
      description: "",
      url: "",
    });
  }, [userSubList]);

  const handleResourceSubmit = async (values, { setSubmitting }) => {
    await createResource(userData, values, dispatch);
    setSubmitting(false);
    handleResourceClose();
  };

  return (
    <div>
      <Modal show={showResourceModal} onHide={handleResourceClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Resource</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={initialValues}
            validationSchema={addResourceSchema}
            onSubmit={handleResourceSubmit}
            enableReinitialize
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="form-group row">
                  <label className="col-auto">Topic</label>
                  <Field as="select" className="col form-control" name="topic">
                    {userSubList.map((subtopic, index) => (
                      <option key={index} value={subtopic.name}>
                        {subtopic.name}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="topic"
                    component="div"
                    className="text-danger"
                  />
                </div>
                <div className="form-group row mt-2">
                  <label className="col-auto">Description</label>
                  <Field
                    type="text"
                    className="col form-control"
                    name="description"
                    placeholder="Enter description"
                  />
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="text-danger"
                  />
                </div>
                <div className="form-group row mt-2">
                  <label className="col-auto">URL</label>
                  <Field
                    type="text"
                    className="col form-control"
                    name="url"
                    placeholder="Enter URL"
                  />
                  <ErrorMessage
                    name="url"
                    component="div"
                    className="text-danger"
                  />
                </div>
                <div className="row mt-2 justify-content-end me-1">
                  <Button
                    variant="secondary"
                    onClick={handleResourceClose}
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
    </div>
  );
};

export default AddResourceModal;
