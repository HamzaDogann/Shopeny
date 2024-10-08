import { Outlet } from "react-router-dom";
import { MdSupportAgent } from "react-icons/md";

import Sidebar from "../../components/HelpAndSupportPageComponents/Sidebar.jsx";
import "./HelpAndSupport.scss";

function HelpAndSupport() {
  return (
    <div className="help-and-support-general-box">
      <div className="top-box">
        <div className="help-and-support-title">
          <MdSupportAgent className="support-agent-icon" />
          <p>Yardım ve Destek</p>
        </div>
      </div>

      <div className="help-and-supports-box">
        <Sidebar />
        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default HelpAndSupport;
