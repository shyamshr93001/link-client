import React from "react";
import ProfileImg from "../../assets/images/profile.png";
import { useSelector } from "react-redux";
import moment from "moment";

const UserInfo = ({ userTopicData }) => {
  //change inline function. move to top
  const userReducer = useSelector((state) => state.user);
  const subsReducer = useSelector((state) => state.subscriptionReducer);

  const { subsData } = subsReducer;
  const { userData } = userReducer;

  const subCount = subsData.filter(
    (sub) => sub.user === userData.username
  ).length;
  const userNameMail = () => {
    return `${userData?.firstName} ${userData?.lastName} (${userData?.username})`;
  };

  return (
    <div className="my-2 p-2">
      <h2>User Info</h2>
      <div className="user-info-parent">
        <div className="row">
          <div className="col-auto">
            <img src={ProfileImg} alt="profile" className="m-2" height={100} />
          </div>
          <div className="col user-info-style">
            <div>{userNameMail()}</div>

            <div>{userData?.email}</div>
            <div>
              {moment(userData?.dateCreated).format('MMM Do YYYY, h:mm:ss a')}
            </div>
            <div>Topics : {userTopicData.length}</div>
            <div>Subscriptions: {subCount}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
