import React from 'react'
import ProfileImg from "../../assets/images/profile.png"
import { useSelector } from 'react-redux';

const UserInfo = ({ userTopicData }) => {

  const userData = useSelector(state => state.user.userData)

  const userInfoStyle = {
    width: "fit-content",
  };

  const userInfoParent = {
    backgroundColor: "white",
    borderRadius: "10px"
  }

  return (
    <div className='my-2 p-2' >
      <h2>User Info</h2>
      <div style={userInfoParent}>
        <div className='row'>
          <div className="col-auto">
            <img src={ProfileImg} className='m-2' height={100} />
          </div>
          <div className='col'>
            <div style={userInfoStyle}>
              {userData.firstname + " " + userData.lastname + " (" + userData.username + ")"} 
            </div>

            <div style={userInfoStyle}>
              {userData.email}
            </div>
            <div style={userInfoStyle}>
              {new Date(userData.dateCreated).toLocaleString(undefined, {hour12: true, timeZone: 'Asia/Kolkata'})}
            </div>
            <div style={userInfoStyle}>
              {userTopicData.length} Topics
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserInfo
