export const getYear = (year) => {
	if (year === "1Y" || year === "1") {
		return "1st";
	}
	if (year === "2Y" || year === "2") {
		return "2nd";
	}
	if (year === "3Y" || year === "3") {
		return "3rd";
	}
	if (year === "4Y" || year === "4") {
		return "4th";
	}
};
export const getTeamPlayerCount = (sport) => {
	console.log(sport);
	switch (sport) {
		case "CR":
			return 3;
		case "FB":
			return 3;
		case "VB":
			return 2;
	}
};

export const getGameName = (game) => {
	switch (game) {
		case "CR": {
			return "Cricket";
		}
		case "FB": {
			return "Foot Ball";
		}
		case "VB": {
			return "Volley Ball";
		}
		case "BD": {
			return "Badminton";
		}
		case "TT": {
			return "Table Tennis";
		}
		case "CH": {
			return "Chess";
		}
	}
};

export const getBranchName = (code) => {
	switch (code) {
		case "CSE":
			return "Computer Science and Engineering";
		case "TT":
			return "Textile Technology";
		case "TC":
			return "Textile Chemistry";
	}
};
export const getStatus = (status) => {
	switch (status) {
		case "p":
			return "Pending";
		case "a":
			return "Accepted";
		case "r":
			return "Rejected";
	}
};

export const isAdmin = (role) => {
	if (role === "a") {
		return true;
	}
};
export const isCoordinator = (role) => {
	if (role != 0 && role.includes("c")) {
		return true;
	}
};

export const getCoordinatorOf = (val) => {
	if (val.includes("c")) {
		return val.substring(1);
	} else {
		return "";
	}
};
