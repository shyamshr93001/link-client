import React from 'react'

function Header() {
  return (
    <div>
      <nav className="navbar navbar-light bg-light justify-content-between">
        <a className="navbar-brand">My Link Sharing App</a>
        <form className="form-inline">
          <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
        </form>
      </nav>
    </div>
  )
}

export default Header
