import React from 'react'
import Login from './Login'
import Register from './Register'

const Home = () => {
  return (
    <div>
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
