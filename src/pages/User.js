import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getOtherUser, getUser } from "../utils/userUtils";
import UserInfo from "../components/dashboard/UserInfo";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/common/Header";
import { createAxiosInstance } from "../utils/axiosUtils";

const User = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const user_name = searchParams.get("name");

  const { userData } = useSelector((store) => store.user);

  const [otherUserData, setOtherUserData] = useState({});

  const getUserData = async () => {
    const data = await getOtherUser(user_name);
    setOtherUserData(data);
  };

  useEffect(() => {
    getUserData();
    createAxiosInstance();
  }, []);

  useEffect(() => {
    dispatch(getUser(navigate));
  }, [dispatch]);

  return (
    <div>
      <Header
        title={userData.firstName + " " + userData.lastName}
        isLogin={true}
      />
      <UserInfo userData={otherUserData} />
    </div>
  );
};

export default User;
