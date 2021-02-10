import React, { useState } from "react";
import "./helper/IndiRegShow.css";
import {
	getYear,
	getBranchName,
	getGameName,
} from "../user.js/userHelper/format";
import { Table, Tbody, Td, Th, Tr, Thead } from "react-super-responsive-table";

export default function IndiRegShow({ individuals }) {
	//getting individual players array in local variable individualArray
	let individualArray = individuals["individualRegs"];
	console.log(individualArray);
	//useState for searchBy
	const [searchBy, setSearchBy] = useState({
		regNo: "",
		year: "",
		rollNumber: "",
		branch: "",
		sport: "",
	});
	//destructing searchBy
	const { regNo, rollNumber, year, branch, sport } = searchBy;

	//search team handler
	const searchHandle = (name) => (event) => {
		if (name === "regNo") {
			setSearchBy({
				rollNumber: "",
				branch: "",
				year: "",
				regNo: event.target.value.toUpperCase(),
				sport: "",
			});
		} else if (name === "rollNumber") {
			setSearchBy({
				regNo: "",
				branch: "",
				year: "",
				sport: "",
				rollNumber: event.target.value.toUpperCase(),
			});
		} else if (name === "year") {
			setSearchBy({
				regNo: "",
				rollNumber: "",
				branch: "",
				year: event.target.value.toUpperCase(),
				sport: "",
			});
		} else if (name === "branch") {
			setSearchBy({
				regNo: "",
				rollNumber: "",
				year: "",
				branch: event.target.value.toUpperCase(),
				sport: "",
			});
		} else if (name === "sport") {
			setSearchBy({
				regNo: "",
				rollNumber: "",
				year: "",
				sport: event.target.value.toUpperCase(),
				branch: "",
			});
		}
	};

	//search player on basis of search parameter and setting individualArray to matched player
	const search = () => {
		if (
			regNo !== "" ||
			rollNumber !== "" ||
			year !== "" ||
			branch !== "" ||
			sport !== ""
		) {
			let newIndividual = [];
			if (regNo !== "") {
				individualArray.forEach((player) => {
					if (player.playerRegNo.includes(regNo)) {
						newIndividual.push(player);
					}
				});
			} else if (rollNumber !== "") {
				individualArray.forEach((player) => {
					if (player.playerRollNo.includes(rollNumber)) {
						newIndividual.push(player);
					}
				});
			} else if (year !== "") {
				individualArray.forEach((player) => {
					if (player.playeryear === year) {
						newIndividual.push(player);
					}
				});
			} else if (branch !== "") {
				individualArray.forEach((player) => {
					if (player.playerBranch === branch) {
						newIndividual.push(player);
					}
				});
			} else if (sport !== "") {
				individualArray.forEach((player) => {
					if (player.playerGame === sport) {
						newIndividual.push(player);
					}
				});
			}
			individualArray = newIndividual;
		}
	};

	//Individual custom block it contains search and sort division
	const customIndividualFind = () => {
		return (
				<section id="isearch_section">
					<div id="isearch_regNo" className="isearch_div">
						<label className="isearch_title">
							Registration No.
						</label>
						<input
							type="text"
							name="regNo"
							value={regNo}
							onChange={searchHandle("regNo")}
							className="isearch_parameter"
							placeholder="Registration No."
						/>
					</div>
					<div id="isearch_teamCode" className="isearch_div">
						<label className="isearch_title">Roll Number</label>
						<input
							type="text"
							name="rollNumber"
							value={rollNumber}
							onChange={searchHandle("rollNumber")}
							className="isearch_parameter"
							placeholder="Roll Number"
						/>
					</div>
					<div id="isearch_branch" className="isearch_div">
						<label className="isearch_title">Branch</label>
						<select
							name=""
							value={branch}
							onChange={searchHandle("branch")}
							className="isearch_parameter"
						>
							<option value="">All branch</option>
							<option value="CSE">
								Computer Science and Engineering
							</option>
							<option value="TT">Textile Technology</option>
							<option value="TC">Textile Chemistry</option>
						</select>
					</div>
					<div id="isearch_Year" className="isearch_div">
						<label  className="isearch_title">
							Year
						</label>
						<select
							name=""
							value={year}
							onChange={searchHandle("year")}
							className="isearch_parameter"
						>
							<option value="">All year</option>
							<option value="1Y">1st</option>
							<option value="2Y">2nd</option>
							<option value="3Y">3rd</option>
							<option value="4Y">4th</option>
						</select>
					</div>
					<div id="isearch_sport" className="isearch_div">
						<label  className="isearch_title">
							Sport
						</label>
						<select
							name=""
							value={sport}
							onChange={searchHandle("sport")}
							className="isearch_parameter"
						>
							<option value="">All Sport</option>
							<option value="TT">Table Tennis</option>
							<option value="BD">Badminton</option>
							<option value="CH">Chess</option>
						</select>
					</div>
				</section>
		);
	};

	//show error component
	const showError = () => {
		return (
			individualArray &&
			individualArray.length === 0 && (
				<p className="emptyArray_notify">
					<span>No data available</span>
				</p>
			)
		);
	};

	//all individual player list structure
	const individualStructure = () => {
		search();
		return (
			individualArray &&
			individualArray.length > 0 && (
				<Table className="players_table">
					<Thead>
						<Tr className="players_heading_row">
							<Th className="players_heading_col">Reg No.</Th>
							<Th
								className="players_heading_col"
								id="player_heading_capName"
							>
								Player Name
							</Th>
							<Th className="players_heading_col">Roll No.</Th>
							<Th
								className="players_heading_col"
								id="player_heading_branch"
							>
								Branch
							</Th>
							<Th className="players_heading_col">Year</Th>
							<Th
								className="players_heading_col"
								id="player_heading_sportName"
							>
								Sport
							</Th>

							<Th
								className="players_heading_col"
								id="player_heading_insName"
							>
								Inspected By
							</Th>
						</Tr>
					</Thead>

					<Tbody>
						{individualArray.map((player,i) => {
							return (
								<Tr
									className={`player_data_row_${i%2}`}
									key={player.playerRegNo}
								>
									<Td className="player_data">
										{player.playerRegNo}
									</Td>
									<Td className="player_data">
										{player.playerName}
									</Td>
									<Td className="player_data">
										{player.playerRollNo}
									</Td>
									<Td className="player_data">
										{getBranchName(player.playerBranch)}
									</Td>
									<Td className="player_data">
										{getYear(player.playeryear)}
									</Td>

									<Td className="player_data">
										{getGameName(player.playerGame)}
									</Td>
									<Td className="player_data">
										{/**/}
										{player.approvedByName &&
											player.approvedByName +
												" (" +
												player.approvedByRollNo+")"}
										{!player.approvedByName &&
											"Not Inspected Yet"}
									</Td>
								</Tr>
							);
						})}
					</Tbody>
				</Table>
			)
		);
	};

	return (
		<div>
			{customIndividualFind()}
			{individualStructure()}
			{showError()}
		</div>
	);
}
