
import React, { useState, useEffect } from 'react'
import Login from './Login'
import Register from './Register'
import Header from '../common/Header'
import Footer from '../common/Footer'
import Topic from '../dashboard/Topic'
import axios from 'axios'

const Home = () => {
  const [topicData, setTopicData] = useState([])
  const getTopicData = async () => {
    try {
      const topicList = await axios.get(`${process.env.REACT_APP_SERVER_URL}/getTopics`);
      console.log("i am running")
      
      setTopicData(topicList.data.filter(topic => topic.visibility == 'public').slice(0,4))
    }
    catch (err) {
      if (err.response.status == 400) {
        alert(err.response.data);
      }
    }
  }
  useEffect(() => {
      let ignore = false;
  
      if (!ignore) { getTopicData(); }
      return () => { ignore = true; }
    }, []);
  return (
    <div>
      <Header/>
      <div className='row mx-2'>
          <div className='col-6'>
            <Topic topicData={topicData} isUser={false} topicHeading="Top Topics"/>
          </div>
          <div className='col-6'>
            <Login/>
            <Register/>
          </div>
        </div>
    </div>
  )
}

export default Home
