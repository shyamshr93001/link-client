import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import { useNavigate } from 'react-router-dom';
import "bootstrap-icons/font/bootstrap-icons.css";
import { toast } from 'react-toastify';
import { LOGOUT_SUCCESS } from '../../redux/constants/userConstants';

function Header(props) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/")
    toast.success(LOGOUT_SUCCESS)
  }
  
  return (
    <div>
      <nav className="navbar navbar-light bg-light justify-content-between px-2">
        <a href="/" className="navbar-brand">
          Link Sharing App
        </a>
        <form className="form-inline">
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
        </form>

        {props.isLogin && (
          <div className="d-flex">
            <button className="btn btn-primary" onClick={props.showTopicModal}>
              <i className="bi bi-chat-fill"></i>
            </button>
            <button className="btn btn-primary mx-2">
              <i className="bi bi-envelope"></i>
            </button>
            <button className="btn btn-primary">
              <i className="bi bi-link-45deg"></i>
            </button>
            <Dropdown id="dropdown-basic-button" className="ms-2">
              <Dropdown.Toggle variant="primary" id="dropdown-basic">
               <i className='bi bi-person-circle mx-2'></i>
                {props.title}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {/* <Dropdown.Item href="#/action-2">Profile</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Users</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Topics</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Posts</Dropdown.Item> */}
                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        )}
      </nav>
    </div>
  );
}


export default Header
