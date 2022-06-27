import React, { useState } from "react";
import "./header.styles.css";
import image from "./logo.png";

import Sidebar from "../sidebar/Sidebar.component";


const Header = () => {
  const [sidebarClass, setSidebarClass] = useState('');

  const showSidebar = () => setSidebarClass('show');

  const hideSidebar = () => setSidebarClass('');

	return (
		<header className="main-header">
			<img src={image} alt="Logo" />

			<h2> Wellcome To Zaki`s BookStore </h2>

      <button className="hamburger-btn" onClick={showSidebar}>
              <div className="bar"></div>
              <div className="bar"></div>
              <div className="bar"></div>
          </button>

          <Sidebar className={sidebarClass} hideSidebar={hideSidebar} />
      </header>
  );
};

export default Header;
