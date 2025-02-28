import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import Swal from "sweetalert2";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createTopic, getData } from "../utils/topicUtils";
import { getUser } from "../utils/userUtils";
import { getSubsData } from "../utils/subscribeUtils";
import Header from "../components/common/Header";
import UserInfo from "../components/dashboard/UserInfo";
import Topic from "../components/dashboard/Topic";
import EditTopic from "../components/dashboard/modals/EditTopic";
import { createTopicSchema } from "../utils/schemas/topicSchemas";
import { useLoadingBar } from "react-top-loading-bar";
import AddResourceModal from "../components/dashboard/modals/AddResource";
import { getResourceData } from "../utils/resourceUtils";
import Resource from "../components/dashboard/Resource";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { topicData } = useSelector((store) => store.topicReducer);
  const { userData } = useSelector((store) => store.user);
  const { subsData } = useSelector((store) => store.subscriptionReducer);
  const { resourceData } = useSelector((store) => store.resourceReducer);

  const initialValues = {
    name: "",
    visibility: "public",
  };

  const [publicTopicData, setPublicTopicData] = useState([]);
  const [userTopicData, setUserTopicData] = useState([]);
  const [subTopicData, setSubTopicData] = useState([]);
  const [userResourceData, setUserResourceData] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [showEditTopicModal, setShowEditTopicModal] = useState(false);
  const [showResourceModal, setShowResourceModal] = useState(false);
  const [topicObj, setTopicObj] = useState({});
  const [subList, setSubList] = useState([]);

  const { start, complete } = useLoadingBar({ height: 2 });

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  const handleEditModalShow = (topic) => {
    setTopicObj(topic);
    setShowEditTopicModal(true);
  };
  const handleResourceShow = () => {
    setShowResourceModal(true);
  };
  const handleEditModalClose = () => setShowEditTopicModal(false);
  const handleResourceClose = () => setShowResourceModal(false);

  const handleCreateTopicSubmit = async (values, { setSubmitting }) => {
    await dispatch(createTopic(userData, values));
    setSubmitting(false);
    handleClose();
  };

  const getTopicData = async () => {
    try {
      start();
      const publicTopics = topicData.filter(
        (topic) => topic.visibility === "public"
      );
      const privateTopics = topicData.filter(
        (topic) => topic.createdBy === userData.username
      );

      const subList = subsData.filter(
        (sub) => sub.user.username === userData.username
      );

      const subTopics = subList.map((sub) => sub.topic).filter((sub) => sub);
      const privateAndSubList = [...subTopics, ...privateTopics];
      setPublicTopicData(publicTopics);
      setUserTopicData(privateTopics);
      setSubTopicData(subTopics);
      setSubList(privateAndSubList);
    } catch (err) {
      Swal.fire({ title: err, text: err?.response?.data, icon: "error" });
    } finally {
      complete();
    }
  };

  const getUserResourceData = () => {
    try {
      const _userResourceData = resourceData.filter(
        (resource) => resource.createdBy === userData.username
      );
      setUserResourceData(_userResourceData);
    } catch (error) {}
  };

  useEffect(() => {
    getUserResourceData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resourceData]);

  useEffect(() => {
    document.title = "Dashboard";
  }, []);

  useEffect(() => {
    dispatch(getUser(navigate));
    dispatch(getData());
    dispatch(getSubsData());
    dispatch(getResourceData());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    getTopicData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topicData, subsData]);

  return (
    <>
      <div>
        <Header
          title={userData.firstName + " " + userData.lastName}
          showTopicModal={handleShow}
          showResourceModal={handleResourceShow}
          isLogin={true}
        />
        <div className="container p-0">
          <div className="row">
            <div className="col-4">
              <UserInfo userTopicData={userTopicData}></UserInfo>
              <Topic
                topicData={userTopicData}
                topicHeading="Your Topics"
                handleEditModalShow={handleEditModalShow}
                getTopicData={getTopicData}
                isUser={true}
              />
              <Topic
                topicData={subTopicData}
                topicHeading="Your Subs"
                handleEditModalShow={handleEditModalShow}
                isUser={false}
                isUserSub={true}
              ></Topic>
            </div>
            <div className="col-8">
              <Resource userResourceData={userResourceData} />
              <Topic
                topicData={publicTopicData}
                topicHeading="Public Topics"
              ></Topic>
            </div>
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
            validationSchema={createTopicSchema}
            onSubmit={handleCreateTopicSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="form-group row">
                  <label className="col-auto">Name</label>
                  <Field
                    type="text"
                    className="col form-control"
                    name="name"
                    placeholder="Topic name"
                  />
                  <ErrorMessage
                    name="name"
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
                <div className="row mt-2 me-1 justify-content-end">
                  <Button
                    variant="secondary"
                    onClick={handleClose}
                    className="col-auto"
                  >
                    Close
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={isSubmitting}
                    className="col-auto ms-2"
                  >
                    Save Changes
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
      <EditTopic
        showEditTopicModal={showEditTopicModal}
        handleEditModalClose={handleEditModalClose}
        topicObj={topicObj}
      ></EditTopic>
      <AddResourceModal
        showResourceModal={showResourceModal}
        userSubList={subList}
        handleResourceClose={handleResourceClose}
      />
    </>
  );
};

export default Dashboard;
