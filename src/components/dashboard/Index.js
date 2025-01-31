import React, { useState, useEffect } from 'react'
import Header from '../common/Header'
import UserInfo from './UserInfo'
import Topic from './Topic'

import { useNavigate } from 'react-router-dom';

const Index = () => {

  const navigate = useNavigate()
  const [userData, setUserData] = useState({
    email: '',
    username: '',
    firstname: '',
    lastname: '',
    dateCreated: ''
  })

  const [showModal, setShowModal] = useState(false)
  const handleShow = () => setShowModal(true);
  const handleClose = () => {
    setShowModal(false)
  };



  const getUserData = () => {
    const user = JSON.parse(localStorage.getItem("user"))
    console.log(user)
    if (user === null) {
      navigate("/")
      alert("login")
    }
    else
      setUserData({
        ...user
      })
  }

  useEffect(() => {
    let ignore = false;

    if (!ignore) { getUserData(); }
    return () => { ignore = true; }
  }, []);

  return (
    <>
      <div>
        <Header title={userData.firstname + " " + userData.lastname} showTopicModal={handleShow} isLogin={true} />
        <div className='row mx-2'>
          <div className="col-4">
            <UserInfo userData={userData}></UserInfo>
            <Topic userData={userData} showModal={showModal} handleClose={handleClose}
              username='hello'
              isUser={true}></Topic>
          </div>
          <div className="col-8">
            <Topic userData={userData} showModal={showModal} handleClose={handleClose}></Topic>
          </div>
        </div>
      </div>
    </>
  )
}

export default Index
