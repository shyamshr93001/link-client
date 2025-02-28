import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserInfo from "../components/dashboard/UserInfo";
import { getData } from "../utils/topicUtils";
import { getUser } from "../utils/userUtils";
import { useNavigate } from "react-router-dom";
import Header from "../components/common/Header";
import Topic from "../components/dashboard/Topic";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userData } = useSelector((store) => store.user);
  const { topicData } = useSelector((store) => store.topicReducer);
  const [userTopicData, setUserTopicData] = useState([]);

  const getTopicData = async () => {
    try {
      const privateTopics = topicData.filter(
        (topic) => topic.createdBy === userData.username
      );

      setUserTopicData(privateTopics);
    } catch (err) {}
  };

  useEffect(() => {
    dispatch(getUser(navigate));
    dispatch(getData());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    getTopicData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topicData]);

  useEffect(() => {
    document.title = "Edit Profile";
  }, []);

  return (
    <div>
      <Header
        title={userData.firstName + " " + userData.lastName}
        isLogin={true}
      />
      <div className="container p-0">
        <div className="row">
          <div className="col-4">
            <UserInfo userTopicData={userTopicData}></UserInfo>
            <Topic
              topicData={userTopicData}
              topicHeading="Your Topics"
              getTopicData={getTopicData}
              isUser={false}
            />
            
          </div>
          <div className="col-8"></div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
