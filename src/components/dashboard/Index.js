import React, { useState, useEffect, useCallback } from 'react'
import Header from '../common/Header'
import UserInfo from './UserInfo'
import Topic from './Topic'
import axios from 'axios'

const Index = () => {

  const [userData, setUserData] = useState({
    email: '',
    username: '',
    firstname: '',
    lastname: '',
    dateCreated: ''
  })
  const [showModal, setShowModal] = useState(false)
  const [topicData, setTopicData] = useState([])

  const getUserData = () => {
    const user = JSON.parse(localStorage.getItem("user"))
    setUserData({
      ...user
    })
  }


  const getTopicData = async () => {
    try {
      const topicList = await axios.get(`http://localhost:5000/getTopics`);

      setTopicData(topicList.data)
    }
    catch (err) {
      if (err.response.status == 400) {
        alert(err.response.data);
      }
    }
  }

  const createTopic = () => {
  }
  const showTopic = () => {
    setShowModal(true)
  }
  const hideTopic = () => {
    setShowModal(false)
  }

  useEffect(() => {
    let ignore = false;

    if (!ignore) { getUserData(); getTopicData() }
    return () => { ignore = true; }
  }, []);

  return (

    <div>
      <Header title={userData.firstname + " " + userData.lastname} createTopic={showTopic} isLogin={true} />
      <div className='row'>
        <div className="col-4">
          <UserInfo userData={userData}></UserInfo>
        </div>
        <div className="col-8">
          <Topic topicData={topicData}></Topic>
        </div>
      </div>
      {showModal &&
      <div className="myModal" id="topicModal" tabIndex="-1" role="dialog" aria-labelledby="topicModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="topicModalLabel">New message</h5>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label htmlFor="recipient-name" className="col-form-label">Recipient:</label>
                  <input type="text" className="form-control" id="recipient-name" />
                </div>
                <div className="form-group">
                  <label htmlFor="message-text" className="col-form-label">Message:</label>
                  <textarea className="form-control" id="message-text"></textarea>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={hideTopic}>Close</button>
              <button type="button" className="btn btn-primary" onClick={createTopic}>Send message</button>
            </div>
          </div>
        </div>
      </div>
}
    </div>
  )
}

export default Index
