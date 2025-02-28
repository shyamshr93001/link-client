import React, { useEffect, useState } from "react";
import Header from "../components/common/Header";
import { useDispatch, useSelector } from "react-redux";
import Resource from "../components/dashboard/Resource";
import { getResourceData } from "../utils/resourceUtils";
import { useNavigate } from "react-router-dom";
import { getUser } from "../utils/userUtils";

const Post = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userData } = useSelector((store) => store.user);
  const { resourceData } = useSelector((store) => store.resourceReducer);

  const [userResourceData, setUserResourceData] = useState([]);
  const [userSubResourceData, setUserSubResourceData] = useState([]);
  const getUserResourceData = () => {
    try {
      const _userResourceData = resourceData.filter(
        (resource) => resource.createdBy === userData.username
      );
      setUserResourceData(_userResourceData);
    } catch (error) {}
  };

  const getUserSubResourceData = () => {
    try {
      const _userSubResourceData = resourceData.filter(
        (resource) => resource.topic.createdBy === userData.username
      );
      setUserSubResourceData(_userSubResourceData);
    } catch (error) {}
  };

  useEffect(() => {
    getUserResourceData();
    getUserSubResourceData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resourceData]);

  useEffect(() => {
    document.title = "Post";
  }, []);

  useEffect(() => {
    dispatch(getUser(navigate));
    dispatch(getResourceData());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);
  return (
    <div>
      <Header
        title={userData.firstName + " " + userData.lastName}
        isLogin={true}
      />
      <div className="container p-0">
        <div className="row">
          <div className="col-4">
            <Resource
              userResourceData={userResourceData}
              Title="My Posts"
            />
          </div>
          <div className="col-8">
            <Resource
              userResourceData={userSubResourceData}
              Title="Posts/Shares"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
