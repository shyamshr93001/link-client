import React from 'react'

function Header(props) {
  return (
    <div>
      <nav className="navbar navbar-light bg-light justify-content-between px-2">
        <a className="navbar-brand">Link Sharing App</a>
        <form className="form-inline">
          <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
        </form>
        {props.isLogin &&
          <div className='d-flex'>
            <button className='btn btn-primary mx-2' onClick={props.createTopic}>Create topic</button>
            <div>{props.title}</div>
          </div>
        }
      </nav>
    </div>

  )
}


export default Header
