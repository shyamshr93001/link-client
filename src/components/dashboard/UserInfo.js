import React from 'react'
import ProfileImg from "../../assets/images/profile.png"

const UserInfo = ({ userData }) => {

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
            <img src={ProfileImg} height={100} />
          </div>
          <div className='col'>
            <div style={userInfoStyle}>
              {userData.firstname + " " + userData.lastname + " (" + userData.username + ")"} 
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
    </div>
  )
}

export default UserInfo
