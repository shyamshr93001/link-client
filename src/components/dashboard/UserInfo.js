import React from 'react'
import ProfileImg from "../../assets/images/profile.png"

const UserInfo = ({ userData }) => {

  const userInfoStyle = {
    width: "fit-content",
  };

  const userInfoParent = {
    backgroundColor: "white"
  }

  return (
    <div className='m-3 p-2' style={userInfoParent}>
      <div className='row'>
        <div className="col-auto">
          <img src={ProfileImg} height={100} />
        </div>
        <div className='col'>
          <div style={userInfoStyle}>
            {userData.firstname + " " + userData.lastname}
          </div>

          <div style={userInfoStyle}>
            {userData.email}
          </div>
          <div style={userInfoStyle}>
            {new Date(userData.dateCreated).toUTCString()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserInfo
