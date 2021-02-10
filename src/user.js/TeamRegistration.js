import React, { useState, useEffect } from "react";
import { getByRollNo, createTeam } from "./userHelper/registrationHelper";
import {
	getGameName,
	getYear,
	getTeamPlayerCount,
	getBranchName,
} from "./userHelper/format";
import { isAuthenticated } from "../auth/authhelper/index";
import { isPlayerAllowed } from "./userHelper/registrationUtils";
import "./css/registration.css";
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";

const TeamRegistration = ({
	registration = undefined,
	setregistration = (f) => f,
}) => {
	const { sport } = registration;

	const [dbresponse, setdbresponse] = useState({
		successResponse: "",
		errorResponse: "",
	});

	const { successResponse, errorResponse } = dbresponse;

	const { user, token } = isAuthenticated();
	const [team, setTeam] = useState([]);
	const [teamPlayer, setTeamPlayer] = useState([]);

	const [player, setPlayer] = useState({
		error: "",
		playerRollNo: "",
		playerData: "",
		disabledT: "",
		isAllowed: "",
		canCreateTeam: "",
		success: "",
		teamPlayerCount: getTeamPlayerCount(sport), //*
		message: "Enter Roll Number to see the player details",
	});

	let { teamPlayerCount } = player;

	const {
		playerRollNo,
		canCreateTeam,
		success,
		error,
		isAllowed,
		playerData,
		message,
	} = player;

	//to handle changing data in player useState
	const handlePlayerRollNo = (name) => (event) => {
		setPlayer({
			...player,
			[name]: event.target.value,
			message: "Enter Roll Number to see the player details",
			success: "",
			error: "",
			canCreateTeam: "",
			playerData: "",
		});
		if (event.target.value.length === 10) {
			setbuttons({ enableFind: true, enableAdd: false });
		} else {
			setbuttons({ enableFind: false, enableAdd: false });
		}
	};

	const [buttons, setbuttons] = useState({
		enableFind: false,
		enableAdd: false,
		enableCreateTeam: false,
	});

	const { enableAdd, enableFind, enableCreateTeam } = buttons;

	const checkPlayerInTeamArray = (rollNo) => {
		let check = false;
		team.forEach((val, i) => {
			if (val.rollNo === rollNo) {
				check = true;
				return;
			}
		});
		return check;
	};

	//find button to getPlayer from team
	const findPlayer = (event) => {
		event.preventDefault();
		if (playerRollNo.length < 10) {
			setPlayer({
				...player,
				playerData: "",
				success: "",
				playerRollNo: "",
				error: "Please enter valid roll number",
			});
		} else {
			getByRollNo(playerRollNo, token, user._id).then((data) => {
				if (!data.fetchError) {
					if (data.error) {
						setPlayer({
							...player,
							playerData: "",
							success: "",
							playerRollNo: "",
							error: `${playerRollNo} is not register yet.`,
						});
						setbuttons({ enableFind: false, enableAdd: false });
					} else {
						const playerAllowed = isPlayerAllowed(data);
						setPlayer({
							...player,
							error: "",
							playerData: data,
							isAllowed: playerAllowed,
							success: true,
							disabledT: false,
						});
						console.log(data);
						setbuttons({ enableFind: true, enableAdd: false });
					}
				} else {
					setPlayer({
						...player,
						playerData: "",
						success: "",
						playerRollNo: "",
						error: data.fetchError,
					});
					setbuttons({ enableFind: false, enableAdd: false });
				}
			});
		}
	};

	//add button to add player to team
	const addPlayer = (event) => {
		event.preventDefault();
		//only if adding player belongs to the same year captain belong to
		if (user.year === playerData.year) {
			if (
				!checkPlayerInTeamArray(playerRollNo) &&
				playerRollNo !== user.rollNo
			) {
				if (isAllowed) {
					setTeam((team) => [...team, playerData]);

					setTeamPlayer((teamPlayer) => [
						...teamPlayer,
						playerData.rollNo,
					]);

					setPlayer({
						...player,
						playerData: "",
						success: "",
						playerRollNo: "",
						teamPlayerCount: Number(teamPlayerCount) - 1,
						message: "Enter Roll Number to see the player details",
					});

					setbuttons({
						enableAdd: true,
						enableFind: true,
					});
				} else {
					const rollNo = playerRollNo;
					setPlayer({
						...player,
						playerData: "",
						success: "",
						playerRollNo: "",
						message: `${rollNo} is already reach to limit for participating in any sport`,
					});
					setbuttons({
						enableAdd: true,
						enableFind: true,
					});
				}
			} else {
				setPlayer({
					...player,
					playerData: "",
					success: "",
					playerRollNo: "",
					teamPlayerCount: teamPlayerCount,
					message: `${playerRollNo} is already added to team`,
				});

				setbuttons({
					enableAdd: true,
					enableFind: true,
				});
			}
		} else {
			setPlayer({
				...player,
				playerData: "",
				success: "",
				playerRollNo: "",
				teamPlayerCount: teamPlayerCount,
				message: "You cannot add the players from different Year",
				// message: `${playerRollNo} is not from ${getYear(
				// 	user.year
				// )} year.`,
			});

			setbuttons({
				enableAdd: true,
				enableFind: true,
			});
		}
	};

	const teamPlayerDone = () => {
		if (Number(teamPlayerCount) <= 0) {
			setPlayer({
				...player,
				canCreateTeam: true,
				success: "",
				error: "",
			});
		}
	};

	useEffect(() => {
		teamPlayerDone();
	}, [teamPlayerCount]);

	//getPlayer section user to show details of player according to entered roll number
	const getPlayer = () => {
		return (
			<div class="team_select">
				<div class="find_section">
					<label class="rollNo_label">Roll Number</label>
					<input
						class="find_rollNo"
						type="text"
						maxLength="10"
						value={playerRollNo}
						required
						placeholder="Player Roll Number"
						onChange={handlePlayerRollNo(`playerRollNo`)}
					/>
					<button
						class={"find_btn"}
						type="button"
						style={!enableFind ? { cursor: "not-allowed" } : {}}
						onClick={enableFind && findPlayer}
					>
						Find
					</button>
				</div>

				<div class="show_player">
					{success && (
						<React.Fragment>
							<span class="showplayer_section name">
								<p class="title_show_player">Name:</p>
								{playerData.name}
							</span>
							<span class="showplayer_section rollNo">
								<p class="title_show_player">Roll Number:</p>
								{playerData.rollNo}
							</span>
							<span class="showplayer_section branch">
								<p class="title_show_player">Branch:</p>
								{getBranchName(playerData.branch)}
							</span>
							<span class="showplayer_section year">
								<p class="title_show_player">Year:</p>
								{getYear(playerData.year)}
							</span>
							<span
								class="showplayer_section "
								id="participation"
							>
								<p class="title_show_player">
									Partcipating In:
								</p>
								{playerData.participate.length > 0
									? formatParticipation(
											playerData.participate
									  )
									: "Not participated yet"}
							</span>
							<span class="button_section">
								<button
									class="button_addPlayer "
									type="button"
									style={
										enableAdd
											? {
													pointerEvents: "none",
													opacity: "0.5",
											  }
											: {}
									}
									onClick={addPlayer}
								>
									Add Player
								</button>
							</span>
						</React.Fragment>
					)}
					{!success && (
						<div className="show_player_message">{message}</div>
					)}
				</div>
			</div>
		);
	};

	const formatParticipation = (participatingIn) => {
		let participate = "";
		participatingIn.forEach((val, i) => {
			if (participatingIn.length - 1 > i) {
				if (val.game && val.teamCode) {
					//this is for team game
					participate += `${getGameName(val.game)}( ${
						val.teamCode
					}), `;
				} else {
					//this is for individual game
					participate += `${getGameName(val.game)}( ${val.regNo}), `;
				}
			} else {
				if (val.game && val.teamCode) {
					//this is for team game
					participate += `${getGameName(val.game)}( ${
						val.teamCode
					}).`;
				} else {
					//this is for individual game
					participate += `${getGameName(val.game)}( ${val.regNo}). `;
				}
			}
		});
		return participate;
	};

	//this is the list of player who have been added to team by team captain
	const showAddedTeamPlayer = () => {
		return (
			<div
				className="added_team_player"
				style={
					enableCreateTeam
						? {
								pointerEvents: "none",
								opacity: 0.5,
						  }
						: {}
				}
			>
				<h1 className="container text-secondary text-center ">
					Team Players
				</h1>
				<Table class="team_section">
					<Thead>
						<Tr className="heading_table">
							<th className="heading_col" id="heading_sno">
								S. No.
							</th>
							<th className="heading_col" id="heading_name">
								Name
							</th>
							<th className="heading_col" id="heading_rollNo">
								Roll Number
							</th>
							<th className="heading_col" id="heading_branch">
								Branch
							</th>
							<th className="heading_col" id="heading_year">
								Year
							</th>
							<th className="heading_col" id="heading_flag">
								Flag
							</th>
						</Tr>
					</Thead>
					<Tbody>
						<Tr className="captain">
							<Td className="captain_col" id="captain_sno">
								1
							</Td>
							<Td className="captain_col" id="captain_name">
								{user.name}
							</Td>
							<Td className="captain_col" id="captain_rollNo">
								{user.rollNo}
							</Td>
							<Td className="captain_col" id="captain_branch">
								{getBranchName(user.branch)}
							</Td>
							<Td className="captain_col" id="captain_year">
								{getYear(user.year)}
							</Td>
							<Td className="captain_col" id="captain_flag">
								<span id="captain_tag">Captain</span>
							</Td>
						</Tr>
						{team.map((val, i) => {
							return (
								<Tr className="player">
									<Td className="player_col" id="player_sno">
										{i + 2}
									</Td>
									<Td className="player_col" id="player_name">
										{val.name}
									</Td>
									<Td
										className="player_col"
										id="player_rollNo"
									>
										{val.rollNo}
									</Td>
									<Td
										className="player_col"
										id="player_branch"
									>
										{getBranchName(val.branch)}
									</Td>
									<Td className="player_col" id="player_year">
										{getYear(val.year)}
									</Td>
									<Td className="player_col" id="player_flag">
										{" "}
										<button
											className="remove_btn"
											onClick={removePlayer(
												val.rollNo,
												val._id
											)}
										>
											Remove
										</button>
									</Td>
								</Tr>
							);
						})}
					</Tbody>
				</Table>

				{/*<div className="row mx-4 my-2  p-2 border border-white">
					<div className="col-1  text-white text-center">1</div>
					<div className="col-3  text-white text-center">
						{" "}
						{user.name}
					</div>
					<div className="col-2  text-white text-center">
						{user.rollNo}
					</div>
					<div className="col-4  text-white text-center">
						{getBranchName(user.branch)}
					</div>
					<div className="col-1  text-white text-center">
						{getYear(user.year)}
					</div>
					<div className="col-1  text-white text-center">
						<span className="badge badge-success p-2">Captain</span>
					</div>
				</div>
				{team.map((val, i) => {
					return (
						<div className="row mx-4 my-2  p-2 border border-white">
							<div className="col-1  text-white text-center">
								{i + 2}
							</div>
							<div className="col-3  text-white text-center">
								{" "}
								{val.name}
							</div>
							<div className="col-2  text-white text-center">
								{val.rollNo}
							</div>
							<div className="col-4  text-white text-center">
								{getBranchName(val.branch)}
							</div>
							<div className="col-1  text-white text-center">
								{getYear(val.year)}
							</div>
							<div className="col-1  text-white text-center">
								<button
									onClick={removePlayer(val.rollNo, val._id)}
								>
									Remove
								</button>
							</div>
						</div>
					);
				})}
				*/}
				{canCreateTeam && (
					<div>
						<div className="row mx-5 my-2  p-2 ">
							<button
								type="button"
								class="btn btn-success mx-5 btn-lg btn-block"
								onClick={saveTeamToDB}
							>
								Create Team
							</button>
							<button
								type="button"
								class="btn btn-secondary mx-5 btn-md btn-block"
								onClick={resetTeam}
							>
								Reset
							</button>
						</div>
					</div>
				)}
			</div>
		);
	};

	const removePlayer = (rollNo, _id) => (event) => {
		event.preventDefault();
		team.forEach((val, i) => {
			if (val.rollNo === rollNo) {
				team.splice(i, 1);
			}
		});
		teamPlayer.forEach((val, i) => {
			if (val === _id) {
				teamPlayer.splice(i, 1);
			}
		});

		setPlayer({
			...player,
			canCreateTeam: "",
			teamPlayerCount: Number(teamPlayerCount) + 1,
		});
	};

	const teamSaveDbResponse = () => {
		return (
			successResponse && (
				<div className="container py-3  bg-dark">
					<h3 className="text-center text-white ">
						Registration Successfull
					</h3>

					<p className="text-center text-white ">
						(Please take screenshot of this page)
					</p>

					<div className="col mr-4 mb-2 text-white bg-dark border border-white">
						<div className="row mx-4 p-2 text-white ">
							<h2 className="mr-auto my-2">
								Registration No. : {successResponse.regNo}
							</h2>
						</div>
						<div className="row mx-4 p-2 text-white ">
							<h2 className="mr-auto my-2">
								Team Code: {successResponse.teamCode}
							</h2>
						</div>
						<div className="row mx-4 p-2 text-white">
							<h2 className="my-2 mr-4">
								Captain Name: {successResponse.teamCaptain}
							</h2>
						</div>
						<div className="row mx-4 p-2 text-white">
							<h2 className="mr-4 my-2">
								Game: {getGameName(successResponse.game)}
							</h2>
							<h2 className="my-2 mr-4">
								Year: {getYear(successResponse.year)}
							</h2>
						</div>
					</div>
					<p className="text-white display-4 mx-auto text-center border-white">
						Your Team Mates
					</p>
					<div className="row mx-4 mb-2 p-2 bg-danger">
						<div className="col-1  text-white text-center">
							S. No.
						</div>
						<div className="col-4 text-white text-center">
							Player Name
						</div>
						<div className="col-2  text-white text-center">
							Roll Number
						</div>
						<div className="col-4  text-white text-center">
							Branch
						</div>
						<div className="col-1  text-white text-center">
							Year
						</div>
					</div>
					{successResponse.teamPlayers.map((val, i) => {
						return (
							<div
								className="row mx-4 my-2  p-2 border border-white"
								key={val.rollNo}
							>
								<div className="col-1  text-white text-center">
									{i + 1}
								</div>
								<div className="col-4  text-white text-center">
									{" "}
									{val.name}
								</div>
								<div className="col-2  text-white text-center">
									{val.rollNo}
								</div>
								<div className="col-4  text-white text-center">
									{getBranchName(val.branch)}
								</div>
								<div className="col-1  text-white text-center">
									{getYear(val.year)}
								</div>
							</div>
						);
					})}
					<button
						className="btn btn-success d-block mx-auto"
						onClick={done}
					>
						Done
					</button>
				</div>
			)
		);
	};

	const teamErrorDbResponse = () => {
		return (
			errorResponse && (
				<div className=" container text-white text-center border bg-dark">
					<div className="text-center">
						<h5>Registration Failed</h5>
						<p>{errorResponse}</p>
						<button
							className="btn btn-success d-block mx-auto"
							onClick={done}
						>
							Done
						</button>
					</div>
				</div>
			)
		);
	};

	const done = (event) => {
		event.preventDefault();
		setdbresponse({ successResponse: false, errorResponse: "" });
		setTeam([]);
		setTeamPlayer([]);
		setregistration({ ...registration, sport: "", disabled: "" });
		setPlayer({
			error: "",
			playerRollNo: "",
			playerData: "",
			canCreateTeam: "",
			success: "",
			teamPlayerCount: "", //*
			message: "Enter Roll Number to see the player details",
		});
	};

	const saveTeamToDB = (event) => {
		event.preventDefault();
		setbuttons({ ...buttons, enableCreateTeam: true });
		createTeam(user, teamPlayer, sport, token).then((data) => {
			if (!data.fetchError) {
				if (data.error) {
					setdbresponse({
						successResponse: false,
						errorResponse: data.error,
					});
				} else {
					setdbresponse({
						successResponse: data,
						errorResponse: false,
					});

					setregistration({
						...registration,
						hide: true,
					});
				}
			} else {
				setdbresponse({
					successResponse: false,
					errorResponse: data.fetchError,
				});
			}
		});
	};

	useEffect(() => {
		teamSaveDbResponse();
	}, [successResponse]);

	useEffect(() => {
		teamErrorDbResponse();
	}, [errorResponse]);

	const resetTeam = (event) => {
		event.preventDefault();
		setTeam([]);
		setTeamPlayer([]);
		setPlayer({
			...player,
			teamPlayerCount: getTeamPlayerCount(sport),
			canCreateTeam: "",
		});
	};

	const showError = () => {
		return <h4 className="text-center my-auto">{error}</h4>;
	};

	return (
		<div>
			<div className="alert alert-light mt-3">{error && showError()}</div>
			{!canCreateTeam && !successResponse && getPlayer()}
			{!errorResponse && !successResponse && showAddedTeamPlayer()}
			{teamSaveDbResponse()}
			{teamErrorDbResponse()}
		</div>
	);
};
export default TeamRegistration;
