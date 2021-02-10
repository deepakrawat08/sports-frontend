import { API } from "../../backend";

export const getAllApprovedTeam = () => {
	return fetch(`${API}getAllApprovedTeams`, {
		method: "GET",
		headers: {
			Accept: "application/json",
			"Content-type": "application/json",
		},
	})
		.then((response) => {
			return response.json();
		})
		.catch((error) => {
			return {
				fetchError: `Network Error: ${error}. Please try again later.`,
			};
		});
};
export const getAllApprovedIndividual = () => {
	return fetch(`${API}getAllApprovedIndividualReg`, {
		method: "GET",
		headers: {
			Accept: "application/json",
			"Content-type": "application/json",
		},
	})
		.then((response) => {
			console.log(response)
			return response.json();
		})
		.catch((error) => {
			return {
				fetchError: `Network Error: ${error}. Please try again later.`,
			};
		});
};
