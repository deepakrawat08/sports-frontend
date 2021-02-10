import React, { Fragment, useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { isAuthenticated, signout } from "../auth/authhelper/index";
import { getByRole } from "@testing-library/react";
import { isAdmin, isCoordinator } from "../user.js/userHelper/format";
import "./helper/nav.css";

const currentTab = (history, path) => {
	if (history.location.pathname === path) {
		return { color: "#FFF",fontWeight:"600"};
	}
};
const Menu = ({ history, children }) => {
	const { user } = isAuthenticated();

	return (
		<React.Fragment>
			<nav className="nav" style={{ zIndex: "100" }}>
				<div className="navbar_header">
					<span className="title">Khelotsav</span>
				</div>

				<input type="checkbox" id="check" />
				<label id="nav_icon_close" for="check" className="bar_icon">
					<i class="fas fa-bars"></i>
				</label>
				<ul id="nav_items" style={{ zIndex: 100 }}>
					<li className="nav_list">
						<Link
							style={currentTab(history, "/")}
							className="navbar_link"
							to="/"
						>
							Home
						</Link>
					</li>
					<li className="nav_list">
						<Link
							style={currentTab(history, "/regDetailDash")}
							className="navbar_link"
							to="/regDetailDash"
						>
							Participants
						</Link>
					</li>
					{!isAuthenticated() && (
						<Fragment>
							<li className="nav_list">
								<Link
									style={currentTab(history, "/signin")}
									className="navbar_link "
									to="/signin"
								>
									Sign In
								</Link>
							</li>
							<li className="nav_list">
								<Link
									style={currentTab(history, "/signup")}
									className="navbar_link"
									to="/signup"
								>
									Sign Up
								</Link>
							</li>
						</Fragment>
					)}
					{isAuthenticated() && (
						<Fragment>
							<li className="nav_list">
								<Link
									style={currentTab(history, "/registration")}
									className="navbar_link"
									to="/registration"
								>
									Registration
								</Link>
							</li>
							<li className="nav_list">
								<Link
									style={currentTab(history, "/status")}
									className="navbar_link"
									to="/status"
								>
									Status
								</Link>
							</li>
							{isAdmin(user.role) && (
								<li className="nav_list">
									<Link
										style={currentTab(history, "/admin")}
										className="navbar_link"
										to="/admin"
									>
										Admin
									</Link>
								</li>
							)}
							{isCoordinator(user.role) && (
								<li className="nav_list">
									<Link
										style={currentTab(
											history,
											"/coordinator"
										)}
										className="navbar_link"
										to="/coordinator"
									>
										Coordinator
									</Link>
								</li>
							)}

							<li className="nav_list">
								<Link
									style={currentTab(history, "/profile")}
									className="navbar_link"
									to="/profile"
								>
									Profile
								</Link>
							</li>

							<li className="nav_list">
								<Link
									style={{ cursor: "pointer" }}
									className="navbar_link"
									to="/"
									onClick={() => {
										signout(() => {
											console.log("SignOut");
											// history.push("/");
										});
									}}
								>
									Sign Out
								</Link>
							</li>
						</Fragment>
					)}
				</ul>
			</nav>
			<div id="children" style={{ zIndex: "0" }}>
				{children}
			</div>
		</React.Fragment>
	);
};
export default withRouter(Menu);
