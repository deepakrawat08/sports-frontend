import React, { useEffect, useState } from "react";
import {
	getBranchName,
	getGameName,
	getYear,
} from "../user.js/userHelper/format";
import { isAuthenticated } from "../auth/authhelper";
import {
	teamByStatus,
	individualByStatus,
	updateIStatus,
	updateTStatus,
} from "./helper/getTeam";

export default function ARegistration({
	adminTab = undefined,
	setadminTab = (f) => f,
}) {
	const [regTab, setregTab] = useState({
		currentReg: "",
		pending: "p",
		accepted: "a",
		rejected: "r",
	});
	const [modeTab, setmodeTab] = useState({
		currentMode: "",
		team: "t",
		individual: "i",
	});
	const [process, setprocess] = useState({
		loading: "",
		fetchError: "",
		error: "",
	});
	const [teamDB, setteamDB] = useState({
		fetchErrorTeam: "",
		errorTeam: "",
		teamArray: [],
		teamSuccess: false,
	});
	const [individualDB, setindividualDB] = useState({
		fetchErrorindividual: "",
		errorIndividual: "",
		individualSuccess: false,
		individualArray: [],
	});
	const [forTeam, setforTeam] = useState({
		isShowTeamEnable: false,
		teamEnableId: "",
	});
	const {
		fetchErrorindividual,
		errorIndividual,
		individualArray,
		individualSuccess,
	} = individualDB;

	const { loading, fetchError, error } = process;
	const { isShowTeamEnable, teamEnableId } = forTeam;
	const { currentMode, team, individual } = modeTab;
	const { fetchErrorTeam, errorTeam, teamArray, teamSuccess } = teamDB;
	const { currentReg, pending, accepted, rejected } = regTab;
	const { current, registration, coordinator } = adminTab;

	const setStatus = (value) => {
		if (currentReg !== value && value === pending) {
			setregTab({
				...regTab,
				currentReg: "p",
			});
		} else if (currentReg !== value && value === accepted) {
			setregTab({
				...regTab,
				currentReg: "a",
			});
		} else if (currentReg !== value && value === rejected) {
			setregTab({
				...regTab,
				currentReg: "r",
			});
		}
		if (currentReg !== value) {
			setmodeTab({
				...modeTab,
				currentMode: "",
			});
			setteamDB({
				fetchErrorTeam: "",
				errorTeam: "",
				teamArray: [],
			});
			setindividualDB({
				fetchErrorindividual: "",
				errorIndividual: "",
				individualArray: [],
			});
			setprocess({
				loading: "",
				fetchError: "",
				error: "",
			});
		}
	};

	const setModeTab = (value) => {
		if (value !== currentMode && value === team) {
			setmodeTab({
				...modeTab,
				currentMode: team,
			});
		} else if (value !== currentMode && value === individual) {
			setmodeTab({
				...modeTab,
				currentMode: individual,
			});
		}
		if (value !== currentMode) {
			setprocess({
				loading: "Loading.......",
			});
		}
	};

	const { user, token } = isAuthenticated();

	const getAllTeams = () => {
		teamByStatus(user._id, token, currentReg).then((data) => {
			if (!data.fetchError) {
				if (data.error) {
					setteamDB({
						...teamDB,
						teamSuccess: false,
					});
					setprocess({
						loading: "",
						error: data.error,
					});
				} else {
					setteamDB({
						...teamDB,
						teamArray: data,
						teamSuccess: true,
					});
					setprocess({
						loading: "",
					});
				}
			} else {
				setteamDB({
					...teamDB,
					teamSuccess: false,
				});
				setprocess({
					loading: "",
					fetchError: data.fetchError,
				});
			}
		});
	};
	const getAllIndividual = () => {
		individualByStatus(user._id, token, currentReg).then((data) => {
			if (!data.fetchError) {
				if (data.error) {
					setindividualDB({
						...individualDB,
						individualSuccess: false,
					});
					setprocess({
						loading: "",
						error: data.error,
					});
				} else {
					setindividualDB({
						...individualDB,
						individualArray: data,
						individualSuccess: true,
					});
					setprocess({
						loading: "",
					});
				}
			} else {
				setindividualDB({
					...individualDB,
					individualSuccess: false,
				});
				setprocess({
					loading: "",
					fetchError: data.fetchError,
				});
			}
		});
	};
	//load all the team and individaul reg. whenever currentReg or currentMode changes
	useEffect(() => {
		//to reset show team button
		setforTeam({
			isShowTeamEnable: false,
			teamEnableId: "",
		});
		if (currentMode === team) {
			//if  currentMode is team
			getAllTeams();
		} else if (currentMode === individual) {
			//if  currentMode is individual
			getAllIndividual();
		}
	}, [currentReg, currentMode]);

	//registration nav to choose status i.e. pending , accepted and rejected
	const regNav = () => {
		return (
			current === "reg" && (
				<div id="reg_tab">
					<button
						onClick={() => {
							setStatus(pending);
						}}
						className={
							currentReg === pending
								? "reg_tab_focused_btn"
								: "reg_tab_btn"
						}
					>
						<span className="reg_section">
							Pending Registration
						</span>
					</button>
					<button
						onClick={() => {
							setStatus(accepted);
						}}
						className={
							currentReg === accepted
								? "reg_tab_focused_btn"
								: "reg_tab_btn"
						}
					>
						<span className="reg_section">
							Accepted Registration
						</span>
					</button>
					<button
						onClick={() => {
							setStatus(rejected);
						}}
						className={
							currentReg === rejected
								? "reg_tab_focused_btn"
								: "reg_tab_btn"
						}
					>
						<span className="reg_section">
							Rejected Registration
						</span>
					</button>
				</div>
			)
		);
	};

	//registration mode to choose reguistration type i.e. team and individual
	const modeNav = () => {
		return (
			current === "reg" &&
			currentReg !== "" && (
				<div id="reg_mode_tab">
					<button
						className={
							currentMode === team
								? "reg_mode_btn_focused"
								: "reg_mode_btn"
						}
						onClick={() => {
							setModeTab(team);
						}}
					>
						<span className="reg_mode_section">Team</span>
					</button>
					<button
						className={
							currentMode === individual
								? "reg_mode_btn_focused"
								: "reg_mode_btn"
						}
						onClick={() => {
							setModeTab(individual);
						}}
					>
						<span className="reg_mode_section">Individual</span>
					</button>
				</div>
			)
		);
	};

	//handle button to show or hide team on basis of teamArray index
	const showTeamHandle = (i) => {
		if (!isShowTeamEnable || i === teamEnableId) {
			if (i === teamEnableId) {
				setforTeam({
					isShowTeamEnable: !isShowTeamEnable,
					teamEnableId: "",
				});
			} else {
				setforTeam({
					isShowTeamEnable: !isShowTeamEnable,
					teamEnableId: i,
				});
			}
		} else {
			setforTeam({
				...forTeam,
				teamEnableId: i,
			});
		}
	};

	//function for sorting teamArray acc. to latest registration
	const sortlatest = (mode) => {
		if (mode === team) {
			teamArray.sort(function (team1, team2) {
				return team1.teamCreatedAt < team2.teamCreatedAt ? 1 : -1;
			});
			return teamArray;
		} else {
			individualArray.sort(function (player1, player2) {
				return player1.createdAt < player2.createdAt ? 1 : -1;
			});
			return individualArray;
		}
	};

	//sturcutre for registration having fuctionality to check and update status
	const checkAndUpdateRegStruct = () => {
		return (
			//if there is no loading,error, fetchError and currentMode is team with
			//teamArray length is > 0
			(teamArray.length > 0 && (
				<div id="adteams">
					<div className="adheading_table">
						<p className="adheading_col" id="adheading_sno">
							Reg No.
						</p>
						<p className="adheading_col" id="adheading_name">
							Team Code
						</p>
						<p className="adheading_col" id="adheading_rollNo">
							Captain Name
						</p>
						<p className="adheading_col" id="adheading_rollNo">
							Captain Branch
						</p>
						<p className="adheading_col" id="adheading_branch">
							Sport
						</p>
						<p className="adheading_col" id="adheading_year">
							Year
						</p>
						<p className="adheading_col" id="adheading_flag"></p>
					</div>
					{sortlatest(currentMode).map((team, i) => {
						return (
							<div
								className={
									teamEnableId === i
										? "adteam_details_selected"
										: "adteam_details"
								}
								key={team.teamRegNo}
							>
								<div className="adcaptain">
									<p
										className="adcaptain_col"
										id="adcaptain_sno"
									>
										{team.teamRegNo}
									</p>
									<p
										className="adcaptain_col"
										id="adcaptain_name"
									>
										{team.teamCode}
									</p>
									<p
										className="adcaptain_col"
										id="adcaptain_rollNo"
									>
										{team.captainFullName} (
										{team.captainRollNo})
									</p>
									<p
										className="adcaptain_col"
										id="adcaptain_rollNo"
									>
										{getBranchName(team.captainBranch)}
									</p>
									<p
										className="adcaptain_col"
										id="adcaptain_branch"
									>
										{getGameName(team.teamGame)}
									</p>
									<p
										className="adcaptain_col"
										id="adcaptain_year"
									>
										{getYear(team.teamYear)}
									</p>
									<button
										className="adshowTeam_button"
										id="adplayer_flag"
										onClick={() => {
											showTeamHandle(i);
										}}
									>
										{teamButtonONOFF(i)}
									</button>
								</div>
								{isShowTeamEnable &&
									teamEnableId === i &&
									showTeam(i)}
								{updateTButton(team.teamCode)}
							</div>
						);
					})}
				</div>
			)) ||
			//if there is no loading,error, fetchError and currentMode is team with
			//teamArray length is === 0
			(teamArray.length === 0 && (
				<div>
					<p className="emptyArray_notify">
						No {emptyArrayTeam(currentMode)}{" "}
						{emptyArrayStatus(currentReg)}
					</p>
				</div>
			))
		);
	};

	//all individual player list structure
	const individualStructure = () => {
		return (
			//if there is no loading,error, fetchError and currentMode is individual with
			//individualArray length is > 0
			(individualArray.length > 0 && (
				<div id="adindividual">
					<div className="adiheading_table">
						<p className="adiheading_col" id="adiheading_sno">
							Reg No.
						</p>
						<p className="adiheading_col" id="adiheading_name">
							Player Name
						</p>
						<p className="adiheading_col" id="adiheading_rollNo">
							Roll No.
						</p>
						<p className="adiheading_col" id="adiheading_rollNo">
							Sport
						</p>
						<p className="adiheading_col" id="adiheading_branch">
							Branch
						</p>
						<p className="adiheading_col" id="adiheading_year">
							Year
						</p>
					</div>
					{individualArray.length > 0 &&
						sortlatest(currentMode).map((player, i) => {
							return (
								<div
									className="adIndividual_detail"
									key={player.playerRegNo}
								>
									<div className="adiplayer">
										<p
											className="adiplayer_col"
											id="adiplayer_sno"
										>
											{player.playerRegNo}
										</p>
										<p
											className="adiplayer_col"
											id="adiplayer_name"
										>
											{player.playerName}
										</p>
										<p
											className="adiplayer_col"
											id="adiplayer_rollNo"
										>
											{player.playerRollNo}
										</p>
										<p
											className="adiplayer_col"
											id="adiplayer_rollNo"
										>
											{getGameName(player.playerGame)}
										</p>
										<p
											className="adiplayer_col"
											id="adiplayer_branch"
										>
											{getBranchName(player.playerBranch)}
										</p>
										<p
											className="adiplayer_col"
											id="adiplayer_year"
										>
											{getYear(player.playeryear)}
										</p>
									</div>
									{updateIButton(player.playerRegNo)}
								</div>
							);
						})}
				</div>
			)) ||
			//if there is no loading,error, fetchError and currentMode is individual with
			//individualArray length is === 0
			(individualArray.length === 0 && (
				<div>
					<p className="emptyArray_notify">
						No {emptyArrayTeam(currentMode)}{" "}
						{emptyArrayStatus(currentReg)}
					</p>
				</div>
			))
		);
	};

	//when teamArray or individualArray is empty, this is used for getting mode before emptyArrayStatus
	const emptyArrayTeam = (mode) => {
		if (mode === team) {
			return "Team Registration";
		} else {
			return "Individual Registration";
		}
	};

	//when teamArray or individual array is empty, this is used for getting status after emptyArrayTeam
	const emptyArrayStatus = (status) => {
		if (status === pending) {
			return "Pending";
		} else if (status === accepted) {
			return "Accepted";
		} else if (status === rejected) {
			return "Rejected";
		}
	};
	//method is used for updating Team status
	const updateTeamStatus = (teamCode, updateStatus, coordinator) => {
		updateTStatus(user._id, token, updateStatus, teamCode,coordinator).then((data) => {
			getAllTeams();
		});
	};
	//method is used for updating Individual status
	const updateIndividualStatus = (regNo, updateStatus, coordinator) => {
		console.log(coordinator)
		updateIStatus(user._id, token, updateStatus, regNo,coordinator).then((data) => {
			getAllIndividual();
		});
	};
	//method configuring team update button
	const updateTButton = (teamCode) => {
		if (currentReg === "p") {
			return (
				<div id="adupdate_status_section">
					<button
						className="adupdate_button"
						id="adreject_reg"
						onClick={() => {
							updateTeamStatus(teamCode, rejected,
								user.rollNo);
						}}
					>
						Reject
					</button>
					<button
						className="adupdate_button"
						id="adaccept_reg"
						onClick={() => {
							console.log(user.rollNo)
							updateTeamStatus(teamCode, accepted,
								user.rollNo);
						}}
					>
						Accept
					</button>
				</div>
			);
		} else if (currentReg === "a") {
			return (
				<div id="adupdate_status_section">
					<button
						className="adupdate_button"
						id="adreject_reg"
						onClick={() => {
							console.log(user.rollNo)

							updateTeamStatus(teamCode, rejected,
								user.rollNo);
						}}
					>
						Reject
					</button>
				</div>
			);
		} else if (currentReg === "r") {
			return (
				<div id="adupdate_status_section">
					<button
						className="adupdate_button"
						id="adaccept_reg"
						onClick={() => {
							console.log(user.rollNo)

							updateTeamStatus(teamCode, accepted,
								user.rollNo);
						}}
					>
						Accept
					</button>
				</div>
			);
		}
	};
	//method configuring individual update button
	const updateIButton = (regNo) => {
		if (currentReg === "p") {
			return (
				<div id="adupdate_status_section">
					<button
						className="adupdate_button"
						id="adreject_reg"
						onClick={() => {
							updateIndividualStatus(
								regNo,
								rejected,
								user.rollNo
							);
						}}
					>
						Reject
					</button>
					<button
						className="adupdate_button"
						id="adaccept_reg"
						onClick={() => {
							updateIndividualStatus(
								regNo,
								accepted,
								user.rollNo
							);
						}}
					>
						Accept
					</button>
				</div>
			);
		} else if (currentReg === "a") {
			return (
				<div id="adupdate_status_section">
					<button
						className="adupdate_button"
						id="adreject_reg"
						onClick={() => {
							updateIndividualStatus(regNo, rejected,
								user.rollNo);
						}}
					>
						Reject
					</button>
				</div>
			);
		} else if (currentReg === "r") {
			return (
				<div id="adupdate_status_section">
					<button
						className="adupdate_button"
						id="adaccept_reg"
						onClick={() => {
							updateIndividualStatus(regNo, accepted,
								user.rollNo);
						}}
					>
						Accept
					</button>
				</div>
			);
		}
	};
	//button for showTeam
	const teamButtonONOFF = (i) => {
		if (isShowTeamEnable && teamEnableId === i) {
			return "Hide";
		} else {
			return "Show";
		}
	};
	//show team structure. Team players will be show according to array index passed to show Team(i) method
	const showTeam = (i) => {
		return (
			<div id="adteam_table">
				<p id="adteam_heading">Team Players</p>
				<div id="adteam_member">
					<div className="adheading_team">
						<p
							className="adheading_team_col"
							id="adheading_team_sno"
						>
							S No.
						</p>
						<p
							className="adheading_team_col"
							id="adheading_team_name"
						>
							Name
						</p>
						<p
							className="adheading_team_col"
							id="adheading_team_rollNo"
						>
							Roll No.
						</p>
						<p
							className="adheading_team_col"
							id="adheading_team_branch"
						>
							Branch
						</p>
						<p
							className="adheading_team_col"
							id="adheading_team_year"
						>
							Year
						</p>
					</div>
					{teamArray[i].teamPlayer.map((players, i) => {
						return (
							<div
								className="adplayer"
								key={players.playerRollNo}
							>
								<p className="adplayer_col" id="adplayer_sno">
									{i + 1}
								</p>
								<p className="adplayer_col" id="adplayer_name">
									{players.playerName}
								</p>
								<p
									className="adplayer_col"
									id="adplayer_rollNo"
								>
									{players.playerRollNo}
								</p>
								<p
									className="adplayer_col"
									id="adplayer_branch"
								>
									{getBranchName(players.playerBranch)}
								</p>
								<p className="adplayer_col" id="adplayer_year">
									{getYear(players.playerYear)}
								</p>
							</div>
						);
					})}
				</div>
			</div>
		);
	};

	//show loading component
	const showLoading = () => {
		return (
			loading && (
				<div className="notify">
					<span className="success">{loading}</span>
				</div>
			)
		);
	};

	//show error component
	const showError = (error) => {
		return (
			<div className="notify">
				<span className="error">{error}</span>
			</div>
		);
	};
	return (
		<React.Fragment>
			{regNav()}
			{modeNav()}
			{!error &&
				!fetchError &&
				!loading &&
				currentMode === team &&
				teamSuccess === true &&
				checkAndUpdateRegStruct()}
			{!error &&
				!fetchError &&
				!loading &&
				currentMode === individual &&
				individualSuccess === true &&
				individualStructure()}
			{showLoading()}
			{fetchError && showError(fetchError)}
			{error && showError(error)}
		</React.Fragment>
	);
}
