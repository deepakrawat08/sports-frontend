import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { getByRollNo } from "./userHelper/registrationHelper";
import "./css/status.css";
import { isAuthenticated } from "../auth/authhelper";
import {
	getTeamByPlayer,
	getIndividualPlayerByRollNo,
} from "./userHelper/statusHelper";
import {
	getGameName,
	getYear,
	getStatus,
	getBranchName,
} from "./userHelper/format";
import { Table, Thead, Th, Td, Tbody, Tr } from "react-super-responsive-table";
import TeamPortal from "../core/TeamPortal";

export default function Status() {
	const [status, setStatus] = useState({
		error: "",
		success: "",
		loading: "Please Wait.....",
	});
	const [teamDbResponse, setTeamdbResponse] = useState({
		teamSuccess: "",
		teamError: "",
		showTeamEnable: false,
	});
	const [individualDbResponse, setindividualDbResponse] = useState({
		individualSuccess: "",
		individualError: "",
	});
	const { error, success, loading } = status;

	const { teamError, teamSuccess, showTeamEnable } = teamDbResponse;
	const { individualError, individualSuccess } = individualDbResponse;

	const [individual, setindividual] = useState([]);
	const [team, setteam] = useState();

	const { user, token } = isAuthenticated();

	const getTeam = () => {
		getByRollNo(user.rollNo, token, user._id).then((data) => {
			console.log(data);
			if (!data.fetchError) {
				const teamCodes = [];
				if (data.participate.length >= 1) {
					data.participate.forEach((sport) => {
						if (sport.teamCode) {
							teamCodes.push(sport.teamCode);
						}
					});
				} else {
					console.log(data.participate.length);
					setTeamdbResponse({
						...teamDbResponse,
						teamSuccess: false,
						teamError: "You are not registered in any Team Games.",
					});
				}
				if (teamCodes.length > 0) {
					console.log(teamCodes.length);
					getTeamByPlayer(
						user.rollNo,
						teamCodes,
						token,
						user._id
					).then((data) => {
						console.log(data);
						if (!data.fetchError) {
							if (data.error) {
								console.log(error);
								setTeamdbResponse({
									...teamDbResponse,
									teamSuccess: false,
									teamError: data.error,
								});
							} else {
								console.log(data);
								setteam(data);
								setTeamdbResponse({
									...teamDbResponse,
									teamSuccess: true,
									teamError: false,
								});
							}
							setStatus({ ...status, error: "", loading: "" });
						} else {
							setTeamdbResponse({
								...teamDbResponse,
								teamSuccess: false,
								teamError: data.error,
							});
							setStatus({ ...status, error: data.fetchError });
						}
					});
				} else {
					console.log("data.participate.length");

					setTeamdbResponse({
						...teamDbResponse,
						teamSuccess: false,
						teamError: "No Record Found",
						loading: "",
					});
					setStatus({ ...status, error: "", loading: "" });
				}
			} else {
				setStatus({ ...status, error: data.fetchError, loading: "" });
			}
		});
	};

	const getIndividual = () => {
		getIndividualPlayerByRollNo(user.rollNo, token, user._id).then(
			(data) => {
				console.log(data);
				if (!data.fetchError) {
					if (data.error) {
						setindividualDbResponse({
							...individualDbResponse,
							individualError: data.error,
							individualSuccess: false,
						});
					} else {
						setindividual((individual) => data);
						setindividualDbResponse({
							...individualDbResponse,
							individualError: false,
							individualSuccess: true,
						});
					}
					setStatus({ ...status, error: "", loading: "" });
				} else {
					setStatus({
						...status,
						error: data.fetchError,
						loading: "",
					});
				}
			}
		);
	};

	useEffect(() => {
		getTeam();
		getIndividual();
	}, []);
	//useState forTeam
	const [forTeam, setForTeam] = useState({
		isShowTeamEnable: false,
		teamEnableVal: "",
	});
	//destructing forTeam
	const { isShowTeamEnable, teamEnableVal } = forTeam;

	const teamStructure = () => {
		return (
			<div id="structure">
				<p className="status_heading">Team Status</p>
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
								id="team_heading_sportName"
							>
								Status
							</Th>

							<Th
								className="team_heading_col"
								id="team_heading_insName"
							>
								Inspected By
							</Th>
							<Th></Th>
						</Tr>
					</Thead>
					{console.log(team)}
					<Tbody>
						{team.map((regs, i) => (
							<Tr className="team_data_row" key={regs.teamRegNo}>
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
								<Td className="team_data">
									{getStatus(regs.status)}
								</Td>
								<Td className="team_data">
									{regs.approvedByName &&
										regs.approvedByName +
											" " +
											regs.approvedByRollNo}
									{!regs.approvedByName &&
										"Not Inspected Yet"}
								</Td>
								<Td
									className="team_data icon"
									onClick={() => {
										showTeamHandle(i);
									}}
								>
									<i className="fas fa-eye "></i>
								</Td>
								{teamEnableVal === i && (
									<TeamPortal
										i={teamEnableVal}
										team={team[i]}
										showTeamHandle={showTeamHandle}
									/>
								)}
							</Tr>
						))}
					</Tbody>
				</Table>
			</div>
		);
	};
	//handler for show team
	const showTeamHandle = (i) => {
		if (!isShowTeamEnable || i === teamEnableVal) {
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
		} else {
			setForTeam({
				...forTeam,
				teamEnableVal: i,
			});
		}
	};
	//button for showTeam
	const teamButtonONOFF = (i) => {
		if (isShowTeamEnable && teamEnableVal === i) {
			return "Hide";
		} else {
			return "Show";
		}
	};

	const individualStructure = () => {
		return (
			<div id="structure">
				<p className="status_heading">Individual Status</p>
				<Table className="steam_table">
					<Thead>
						<Tr className="steam_heading_row">
							<Th className="steam_heading_col">Reg No.</Th>

							<Th className="steam_heading_col">Roll No.</Th>

							<Th
								className="steam_heading_col"
								id="steam_heading_sportName"
							>
								Sport
							</Th>
							<Th
								className="steam_heading_col"
								id="steam_heading_sportName"
							>
								Status
							</Th>
							<Th
								className="steam_heading_col"
								id="steam_heading_insName"
							>
								Inspected By
							</Th>
						</Tr>
					</Thead>

					<Tbody>
						{individual.map((player, i) => {
							console.log(player);
							return (
								<Tr
									className="steam_data_row"
									key={player.regNo}
								>
									<Td className="steam_data">
										{player.regNo}
									</Td>

									<Td className="steam_data">
										{player.rollNo}
									</Td>

									<Td className="steam_data">
										{getGameName(player.game)}
									</Td>
									<Td className="steam_data">
										{getStatus(player.status)}
									</Td>
									<Td className="steam_data">
										{}
										{player.approvedByName &&
											player.approvedByName +
												" " +
												player.approvedByRollNo}
										{!player.approvedByName &&
											"Not Inspected Yet"}
									</Td>
								</Tr>
							);
						})}
					</Tbody>
				</Table>
			</div>
		);
	};

	const showError = (err) => {
		return <h4 className="notify_heading">{err}</h4>;
	};
	const showLoading = () => {
		return <h4 className="notify_heading">{loading}</h4>;
	};

	return (
		<Base
			title="Registration Status"
			description="Check your registration status here."
		>
			<div id="container">
				{loading && showLoading()}

				{error && showError(error)}

				{!teamError && teamSuccess && teamStructure()}

				{teamError && individualError
					? teamError
						? showError(teamError)
						: showError(individualError)
					: ""}

				{!individualError && individualSuccess && individualStructure()}
			</div>
		</Base>
	);
}
{
	/*
				{!error && !loading && (
					<p className="status_heading">Team Status</p>
				)}
				{teamError && !teamSuccess && showError(teamError)}


			{!error && !loading && (
					<p className="status_heading">Individual Status</p>
				)}
			{individualError &&
					!individualSuccess &&
					showError(individualError)}
			*/
}
