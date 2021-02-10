import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import "./admin.css";
import { isAuthenticated } from "../auth/authhelper";
import {
	teamByStatus,
	updateTStatus,
	individualByStatus,
	updateIStatus,
} from "./helper/getTeam";
import {
	getYear,
	getBranchName,
	getGameName,
} from "../user.js/userHelper/format";
import ARegistration from "./ARegistration";
import ACoordinator from "./ACoordinator";

export default function AdminDash() {
	const [adminTab, setadminTab] = useState({
		current: "coord",
		registration: "reg",
		coordinator: "coord",
	});
	const { current, registration, coordinator } = adminTab;

	const setAdminTab = (value) => {
		if (value != current && value === registration) {
			setadminTab({
				...adminTab,
				current: registration,
			});
		} else if (value != current && value === coordinator) {
			setadminTab({
				...adminTab,
				current: coordinator,
			});
		}
	};
	const registrationTab = () => {
		return <ARegistration adminTab={adminTab} setadminTab={setadminTab} />;
	};
	const coordinatorTab = () => {
		return <ACoordinator adminTab={adminTab} setadminTab={setadminTab} />;
	};
	return (
		<Base title="Admin" description="This is admin Dashboard.">
			<div id="admin_tab">
				<button
					className={
						current === "reg"
							? "admin_tab_focused_btn"
							: "admin_tab_btn"
					}
					onClick={() => {
						setAdminTab(registration);
					}}
				>
					<span className="admin_section" id="registration_check">
						Registration Section
					</span>
				</button>
				<button
					className={
						current === "coord"
							? "admin_tab_focused_btn"
							: "admin_tab_btn"
					}
					onClick={() => {
						setAdminTab(coordinator);
					}}
				>
					<span className="admin_section" id="coordinator_check">
						Coordinator Section
					</span>
				</button>
			</div>
			{current ===registration && registrationTab()}
			{current ===coordinator && coordinatorTab()}
		</Base>
	);
}
