import { API } from "../../backend";

export const getTeamByPlayer = (rollNo, teamCode, token, userId) => {
	return fetch(`${API}getTeamByPlayer/${userId}`, {
		method: "POST",
		headers: {
			"Content-type": "application/json",
			Accept: "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify({ rollNo: rollNo, teamCodes: teamCode }),
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
export const getIndividualPlayerByRollNo = (rollNo, token, userId) => {
	return fetch(`${API}getIndividualRegistration/${userId}`, {
		method: "POST",
		headers: {
			"Content-type": "application/json",
			Accept: "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify({ rollNo: rollNo}),
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
