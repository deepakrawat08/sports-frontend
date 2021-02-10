import React from "react";
import ReactDOM from "react-dom";
import { getBranchName, getYear } from "../user.js/userHelper/format";
import { Table, Thead, Th, Tr, Td, Tbody } from "react-super-responsive-table";
import jspdf from "jspdf";
import "jspdf-autotable";

export default function TeamPortal(props) {
	//props should be team object
	const team = props.team;

	const teamHeader = ["S No.", "Player Name", "Roll Number", "Branch"];
	const teamData = [];
	const teamDataForPdf = () => {
		teamData.push([
			"1",
			`${team["captainFullName"]}  (Captain)`,
			team["captainRollNo"],
			getBranchName(team["captainBranch"]),
		]);
		team["teamPlayer"].forEach((player, i) => {
			teamData.push([
				i + 2,
				player.playerName,
				player.playerRollNo,
				getBranchName(player.playerBranch),
			]);
		});
	};
	let doc = new jspdf();
	const downloadPdf = () => {
		teamDataForPdf();
		doc.setFontSize(36);
		doc.text("Khelotsav", 85, 20, {
			styles: { fontSize: 34 },
		});
		doc.setFontSize(12);
		doc.setTextColor(106, 106, 106);
		doc.text("(The Annual Sport Event)", 88, 28);
		doc.setTextColor(0, 0, 0);
		doc.setFontSize(14);
		doc.text(
			`Registration No. :               ${team["teamRegNo"]}`,
			25,
			50
		);
		doc.text(
			`Team Code:                       ${team["teamCode"]}`,
			25,
			60
		);
		doc.text(
			`Team Year:                       ${getYear(team["teamYear"])}`,
			25,
			70
		);
		if (team.approvedByName) {
			doc.text(
				`Inspected By:                    ${team.approvedByName}(${team.approvedByRollNo})`,
				25,
				80
			);
		} else {
			doc.text(
				`Inspected By:                    Not Inspected Yet`,
				25,
				80
			);
		}

		doc.setFontSize(22);
		doc.text(`Team Players`, 86, 95);

		doc.autoTable({
			head: [teamHeader],
			body: teamData,
			startY: 100,
			headStyles: {
				fillColor: [255, 0, 0],
				halign: "center",
				fontSize: 12,
			},
			bodyStyles: { halign: "center", color: 0, fontSize: 10 },
		});

		doc.save(`${team["teamCode"]}.pdf`);
	};

	return ReactDOM.createPortal(
		<div
			style={{
				position: "fixed",
				top: "0",
				left: "0",
				right: "0",
				bottom: "0",
				display: "grid",
				justifyContent: "center",
				alignItems: "center",
				background: "rgba(0,0,0,0.6)",
				overflowY: "auto",
			}}
		>
			<div
				style={{
					background: "#fff",
					borderRadius: "2px",
					margin: "1rem",
					boxShadow:
						"0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
					justifySelf: "center",
					border: "2px solid #f00",
					alignSelf: "center",
					height: "fit-content",
					padding: "40px 0px",
				}}
			>
				<div className="team">
					<p id="team_heading">Team Players</p>
					<div className="team_intro">
						<p id="team_intro_p">
							<span id="team_intro_span">Team Code:</span>
							{team["teamCode"]}
						</p>
						<p id="team_intro_p">
							<span id="team_intro_span">Year:</span>
							{getYear(team["teamYear"])}
						</p>
					</div>
					<Table className="players_table">
						<Thead>
							<Tr className="players_heading_row">
								<Th className="players_heading_col">S No.</Th>
								<Th className="players_heading_col">
									Player Name
								</Th>
								<Th className="players_heading_col">
									Roll Number
								</Th>
								<Th className="players_heading_col">Branch</Th>
							</Tr>
						</Thead>

						<Tbody>
							<Tr className="players_data_row">
								<Td className="players_data">1</Td>
								<Td className="players_data">
									{team["captainFullName"]}
									<i className="fas fa-check"></i>
								</Td>
								<Td className="players_data">
									{team["captainRollNo"]}
								</Td>
								<Td className="players_data">
									{getBranchName(team["captainBranch"])}
								</Td>
							</Tr>
							{props.team["teamPlayer"].map((val, i) => {
								return (
									<Tr
										className="players_data_row"
										key={val.playerRollNo}
									>
										<Td className="players_data">
											{i + 2}
										</Td>
										<Td className="players_data">
											{val.playerName}
										</Td>
										<Td className="players_data">
											{val.playerRollNo}
										</Td>
										<Td className="players_data">
											{getBranchName(val.playerBranch)}
										</Td>
									</Tr>
								);
							})}
						</Tbody>
					</Table>
				</div>
				<button
					onClick={props.showTeamHandle}
					style={{
						display: "block",
						marginLeft: "auto",
						marginTop: "20px",
					}}
				>
					Close
				</button>
				<button
					onClick={downloadPdf}
					style={{
						color: "#000",
						display: "block",
						margin: "0px auto",
						marginTop: "20px",
						backgroundColor: "#0f0",
					}}
				>
					Download
				</button>
			</div>
		</div>,
		document.getElementById("team_portal_root")
	);
}
