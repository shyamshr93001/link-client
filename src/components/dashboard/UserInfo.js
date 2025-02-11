import React from "react";
import ProfileImg from "../../assets/images/profile.png";
import { useSelector } from "react-redux";

const UserInfo = ({ userTopicData }) => {
  //change inline function. move to top
  const userReducer = useSelector((state) => state.user);
  const subsReducer = useSelector((state) => state.subscriptionReducer)

  const {subsData} = subsReducer;

  const { userData } = userReducer;

  const userInfoStyle = {
    width: "fit-content",
  };

  const userInfoParent = {
    backgroundColor: "white",
    borderRadius: "10px",
  };

  const subCount = subsData.filter(sub=> sub.user === userData.username).length

  return (
    <div className="my-2 p-2">
      <h2>User Info</h2>
      <div style={userInfoParent}>
        <div className="row">
          <div className="col-auto">
            <img src={ProfileImg} alt="profile" className="m-2" height={100} />
          </div>
          <div className="col">
            <div style={userInfoStyle}>

              {userData?.firstName +
                " " +
                userData?.lastName +
                " (" +
                userData?.username +
                ")"}
            </div>

            <div style={userInfoStyle}>{userData?.email}</div>
            <div style={userInfoStyle}>
              {new Date(userData?.dateCreated).toLocaleString(undefined, {
                hour12: true,
                timeZone: "Asia/Kolkata",
              })}
            </div>
            <div style={userInfoStyle}>Topics : {userTopicData.length}</div>
            <div style={userInfoStyle}>Subscriptions: {subCount}</div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
