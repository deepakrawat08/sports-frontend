import { API } from "../../backend";

export const teamByStatus = (userId, token, status) => {
	return fetch(`${API}getAllTeamsByStatus/${userId}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify({ status: status }),
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

export const teamByStatusAndCoord = (userId, token, status, coordinator) => {
	return fetch(`${API}getAllTeamsByStatusa/${userId}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify({ status: status, game: coordinator }),
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

export const individualByStatus = (userId, token, status) => {
	return fetch(`${API}getAllIndividual/ByStatus/admin/${userId}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify({ status: status }),
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

export const individualByStatusAndCoord = (userId, token, status,coordinator) => {
	return fetch(`${API}getAllIndividual/ByStatus/coordinator/${userId}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify({ status: status,game:coordinator }),
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

export const updateTStatus = (userId, token, status, teamCode, coordinator) => {
	console.log(coordinator);
	return fetch(`${API}updateStatus/team/${userId}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
			Accept: "application/json",
		},
		body: JSON.stringify({
			status: status,
			teamCode: teamCode,
			coordinator: coordinator,
		}),
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

export const updateIStatus = (userId, token, status, regNo, coordinator) => {
	return fetch(`${API}updateStatus/individual/${userId}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
			Accept: "application/json",
		},
		body: JSON.stringify({
			status: status,
			regNo: regNo,
			coordinator: coordinator,
		}),
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

export const updateUserRole = (userId, token, rollNo, role) => {
	return fetch(`${API}updateRole/asCoordinator/${userId}`, {
		method: "PUT",
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
			Accept: "application/json",
		},
		body: JSON.stringify({ rollNumber: rollNo, role: role }),
	})
		.then((response) => {
			return response.json();
		})
		.catch((error) => {
			return {
				fetchError: `Network Error: ${error}. Please try again later.`,
			};
		});
}

export const getAllCoordinators = () => {
	return fetch(`${API}getCoordinators`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
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
