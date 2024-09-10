import React from 'react'
import { Outlet } from 'react-router-dom'
import { MdOutlineAccountCircle } from "react-icons/md";
import Sidebar from '../../components/AccountPageComponents/Sidebar';


import "./Account.scss";

function Account() {
  return (
    <div className="account-general-box">
      <div className="top-box">
        <div className="account-title">
          <MdOutlineAccountCircle className="account-icon" />
          <p>Hesabım</p>
        </div>
      </div>

      <div className="account-box">
        <Sidebar />
        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default React.memo(Account);
