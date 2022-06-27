import React from "react";
import { Link } from "react-router-dom";
import "./sidebar.styles.css";

const Sidebar = (props) => {

	return (
		<div className={`back ${props.className}`}>
			<div className="sidebar">
				<button type="button" className="close" onClick={props.hideSidebar}>
					x
				</button>

				<ul className="sidebar-items">
					<li className="sidebar-item">
						<Link to="/" onClick={props.hideSidebar}>
							Home Page
						</Link>
					</li>
					<li className="sidebar-item">
						<Link to="/login" onClick={props.hideSidebar}>
							Login
						</Link>
					</li>
					<li className="sidebar-item">
						<Link to="/SignUp" onClick={props.hideSidebar}>
							Sign Up
						</Link>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default Sidebar;
