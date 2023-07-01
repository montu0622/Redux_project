import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const Layout = () => {


  const headerHeading = useSelector((state)=>state.header.headerHeading)
const status = useSelector((state)=>state.task.status)
console.log(status);
  
  console.log(headerHeading,"headerHeading");
  return (
    <>
      <div className="sidebar_container">
        <div className="logo">
          <h4 className="sidebar_logo">{headerHeading}</h4>
        </div>
        <div className="avatar">
          <div className="avatar_icon">
            <img src="../assets/images/avatar.svg" alt="" />
          </div>
          <div className="avatar_info">
            <p> {status}</p>
            <span>s.ferguson@gmail.com</span>
          </div>
        </div>
        <div className="action_wrapper">
          <ul className="action">

            <Link to="/">
              <li>
                <a href="/">
                  <img src="../assets/icons/dashboard.svg" alt="icon" />{" "}
                  &nbsp;&nbsp;Dashboard
                </a>
              </li>
            </Link>

            <Link to="/Task">
              <li>
                <a href="/">
                  <img src="../assets/icons/task.svg" alt="icon" />{" "}
                  &nbsp;&nbsp;Tasks
                </a>
              </li>
            </Link>

            <Link to="/Email">
              <li>
                <a href="/">
                  <img src="../assets/icons/mail.svg" alt="icon" />{" "}
                  &nbsp;&nbsp;Email
                </a>
              </li>
            </Link>

            <Link to="/Contact">
              <li>
                <a href="/">
                  <img src="../assets/icons/contact.svg" alt="icon" />{" "}
                  &nbsp;&nbsp;Contacts
                </a>
              </li>
            </Link>

            <Link to="/Chat">
            <li>
              <a href="/">
                <img src="../assets/icons/chat.svg" alt="icon" />{" "}
                &nbsp;&nbsp;Chat
              </a>
            </li>
            </Link>

            <Link to="/Deal">
              <li>
                <a href="/">
                  <img src="../assets/icons/deal.svg" alt="icon" />{" "}
                  &nbsp;&nbsp;Deals
                </a>
              </li>
            </Link>
          </ul>
        </div>
        
        <div className="set">
          <Link to="/Setting">
            <a href="/">
              <img src="../assets/icons/setting.svg" alt="icon" />{" "}
              &nbsp;&nbsp;Settings
            </a>{" "}
          </Link>
        </div>
      </div>
      <div className="header">
        <div className="search_bar">
          <a href="/">
            <img src="../assets/icons/search.svg" alt="icon" />
          </a>
          <input type="text" placeholder="Global search" />
          <span className="underline"></span>
        </div>
        <a href="/">
          <img src="../assets/icons/bell.svg" alt="bell-icon" />
        </a>
      </div>
    </>
  );
};

export default Layout;
