import React, { useState } from "react";
import { Table, Tbody, Thead, Td, Th, Tr } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import {
	getBranchName,
	getGameName,
	getYear,
} from "../user.js/userHelper/format";
import "./helper/TeamRejShow.css";
import TeamPortal from "./TeamPortal";

export default function TeamRegShow({ teams }) {
	//assigning teams to local variable teamArray
	let teamArray = teams["teams"];

	//useState forTeam
	const [forTeam, setForTeam] = useState({
		isShowTeamEnable: false,
		teamEnableVal: "",
	});
	//destructing forTeam
	const { isShowTeamEnable, teamEnableVal } = forTeam;

	//useState searchBy
	const [searchBy, setSearchBy] = useState({
		regNo: "",
		teamCode: "",
		year: "",
		sport: "",
	});
	//destructing searchBy
	const { regNo, teamCode, year, sport } = searchBy;

	// search handler
	const searchHandle = (name) => (event) => {
		if (name === "regNo") {
			setSearchBy({
				teamCode: "",
				sport: "",
				year: "",
				regNo: event.target.value.toUpperCase(),
			});
		} else if (name === "teamCode") {
			setSearchBy({
				regNo: "",
				sport: "",
				year: "",
				teamCode: event.target.value.toUpperCase(),
			});
		} else if (name === "year") {
			setSearchBy({
				sport: "",
				regNo: "",
				teamCode: "",
				year: event.target.value.toUpperCase(),
			});
		} else if (name === "sport") {
			setSearchBy({
				sport: event.target.value.toUpperCase(),
				regNo: "",
				teamCode: "",
				year: "",
			});
		}
	};
	//search team on basis of search parameter and setting teamArray to matched team
	const search = () => {
		if (regNo !== "" || teamCode !== "" || year !== "" || sport !== "") {
			let newTeams = [];
			if (regNo !== "") {
				teamArray.forEach((team) => {
					if (team.teamRegNo.includes(regNo)) {
						newTeams.push(team);
					}
				});
			} else if (teamCode !== "") {
				teamArray.forEach((team) => {
					if (team.teamCode.includes(teamCode)) {
						newTeams.push(team);
					}
				});
			} else if (year !== "") {
				teamArray.forEach((team) => {
					if (team.teamYear === year) {
						newTeams.push(team);
					}
				});
			} else if (sport !== "") {
				teamArray.forEach((team) => {
					if (team.teamGame === sport) {
						newTeams.push(team);
					}
				});
			}
			teamArray = newTeams;
		}
		console.log(teamArray);
	};

	//Team custom block it contains search and sort division
	const customTeamFind = () => {
		return (
			<section id="tsearch_section">
				<div id="tsearch_regNo" className="tsearch_div">
					<label className="tsearch_title">Registration No.</label>
					<input
						type="text"
						name="regNo"
						value={regNo}
						onChange={searchHandle("regNo")}
						className="tsearch_parameter"
						placeholder="Registration No."
					/>
				</div>
				<div id="tsearch_teamCode" className="tsearch_div">
					<label className="tsearch_title">Team Code</label>
					<input
						type="text"
						name="regNo"
						value={teamCode}
						onChange={searchHandle("teamCode")}
						className="tsearch_parameter"
						placeholder="Team Code"
					/>
				</div>
				<div id="search_Year" className="tsearch_div">
					<label className className="tsearch_title">
						Year
					</label>
					<select
						name=""
						value={year}
						onChange={searchHandle("year")}
						className="tsearch_parameter"
					>
						<option value="">All</option>
						<option value="1Y">1st</option>
						<option value="2Y">2nd</option>
						<option value="3Y">3rd</option>
						<option value="4Y">4th</option>
					</select>
				</div>
				<div id="search_sport" className="tsearch_div">
					<label className className="tsearch_title">
						Sport
					</label>
					<select
						name=""
						value={sport}
						onChange={searchHandle("sport")}
						className="tsearch_parameter"
					>
						<option value="">All Sport</option>
						<option value="CR">Cricket</option>
						<option value="FB">Foot Ball</option>
						<option value="VB">Volley Ball</option>
					</select>
				</div>
			</section>
		);
	};

	//handler for show team
	const showTeamHandle = (i) => {
		console.log(i, "fsfsffsdf");
		if (!isShowTeamEnable) {
			setForTeam({
				...forTeam,
				isShowTeamEnable: !isShowTeamEnable,
				teamEnableVal: i,
			});
		} else {
			setForTeam({
				...forTeam,
				isShowTeamEnable: !isShowTeamEnable,
				teamEnableVal: "",
			});
		}
	};

	//all team list structure
	const teamStructure = () => {
		search();
		sort();
		return (
			teamArray &&
			teamArray.length > 0 && (
				<Table className="team_table">
					<Thead>
						<Tr className="team_heading_row">
							<Th className="team_heading_col">Reg No.</Th>
							<Th className="team_heading_col">Team Code </Th>
							<Th
								className="team_heading_col"
								id="team_heading_capName"
							>
								Captain Name
							</Th>
							<Th className="team_heading_col">Roll Number</Th>
							<Th className="team_heading_col">Year</Th>
							<Th
								className="team_heading_col"
								id="team_heading_sportName"
							>
								Sport
							</Th>
							<Th
								className="team_heading_col"
								id="team_heading_insName"
							>
								Inspected By
							</Th>
							<Th className="team_heading_col">Team</Th>
						</Tr>
					</Thead>
					<Tbody>
						{teamArray.map((regs, i) => (
							<Tr
								className={`team_data_row_${i % 2}`}
								key={regs.teamRegNo}
							>
								<Td className="team_data">{regs.teamRegNo}</Td>
								<Td className="team_data">{regs.teamCode}</Td>
								<Td className="team_data">
									{regs.captainFullName}
								</Td>
								<Td className="team_data">
									{regs.captainRollNo}
								</Td>
								<Td className="team_data">
									{getYear(regs.teamYear)}
								</Td>
								<Td className="team_data">
									{getGameName(regs.teamGame)}
								</Td>
								<Td className="team_data ">
									{regs.approvedByName &&
										regs.approvedByName +
											" " +
											regs.approvedByRollNo}
									{!regs.approvedByName &&
										"Not Inspected Yet"}
								</Td>
								<Td className="team_data " >
										<i
											class="  fas fa-expand-arrows-alt "
											onClick={() => {
												showTeamHandle(i);
											}}
											title="Show Team"
											style={{cursor:'pointer'}}
										/>
								</Td>
								{teamEnableVal === i && (
									<TeamPortal
										i={teamEnableVal}
										team={teamArray[teamEnableVal]}
										showTeamHandle={showTeamHandle}
									/>
								)}
							</Tr>
						))}
					</Tbody>
				</Table>
			)
		);
	};

	const sort = () => {
		console.log(teamArray);
		teamArray = teamArray.sort((teamA, teamB) => {
			return Date(teamA.teamCreatedAt) - Date(teamB.teamCreatedAt);
		});
		console.log(teamArray);
	};
	//show error component
	const showError = () => {
		return (
			teamArray &&
			teamArray.length === 0 && (
				<p className="emptyArray_notify">
					<span>No data available</span>
				</p>
			)
		);
	};

	return (
		<div>
			{customTeamFind()}
			{teamStructure()}
			{showError()}
		</div>
	);
}
