
import React, { useState, useEffect } from 'react'
import Login from './Login'
import Register from './Register'
import Header from '../common/Header'

const Home = () => {
  return (
    <div>
      <Header />
      <div className='row mx-2'>
        <div className='col-6'>
          <h1>Topics Placeholder</h1>
        </div>
        <div className='col-6'>
          <Login />
          <Register />
        </div>
      </div>
    </div>
  )
}

export default Home
