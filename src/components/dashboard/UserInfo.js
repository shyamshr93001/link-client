import React from "react";
import ProfileImg from "../../assets/images/profile.png";
import moment from "moment";

const UserInfo = ({ userTopicData, userData, subsData }) => {
  // const { userData } = useSelector((state) => state.user);
  // const { subsData } = useSelector((state) => state.subscriptionReducer);

  const subCount = subsData?.filter(
    (sub) => sub.user.username === userData.username
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
              {moment(userData?.dateCreated).format("MMM Do YYYY, h:mm:ss a")}
            </div>
            {userTopicData &&
            <div>Topics : {userTopicData?.length}</div>}
            {subCount && <div>Subscriptions: {subCount}</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
