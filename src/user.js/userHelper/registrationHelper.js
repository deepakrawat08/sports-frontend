import { API } from "../../backend";

export const getByRollNo = (rollNo, token, userId) => {
	return fetch(`${API}getUserByRollNo/${userId}`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify({ rollNo: rollNo }),
	})
		.then((response) => {
			return response.json();
		})
		.catch((error) => {
			return {
				fetchError: `Network Error:${error}. Please try again later`,
			};
		});
};

export const createTeam = (user, playerList, game, token) => {
	return fetch(`${API}addteam/${user._id}`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify({
			teamCaptain: user.rollNo,
			year: user.year,
			game: game,
			teamPlayers: playerList,
		}),
	})
		.then((response) => {
			return response.json();
		})
		.catch((error) => {
			return {
				fetchError: `Network Error:${error}. Please try again later`,
			};
		});
};

export const createIndividaulReg = (user, game, token) => {
	return fetch(`${API}addIndividualReg/${user._id}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify({
			userId: user._id,
			rollNumber: user.rollNo,
			game: game,
		}),
	})
		.then((response) => {
			return response.json();
		})
		.catch((error) => {
			return {
				fetchError: `Network Error:${error}. Please try again later`,
			};
		});
};
