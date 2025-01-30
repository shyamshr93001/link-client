import React from 'react'
import Login from './Login'
import Register from './Register'
import Header from '../common/Header'
import Footer from '../common/Footer'

const Home = () => {
  return (
    <div>
      <Header/>
      <div className='row'>
          <div className='col-6'>
            <h1>Cards Placeholder</h1>
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
