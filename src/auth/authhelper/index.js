import { API } from "../../backend";

export const signup = (user) => {
	return fetch(`${API}signup`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
		},
		body: JSON.stringify(user),
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

export const signin = (user) => {
	return fetch(`${API}signin`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
		},
		body: JSON.stringify(user),
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

export const authenticate = (data, next) => {
	if (typeof window !== undefined) {
		localStorage.setItem("jwt", JSON.stringify(data));
		next();
	}
};

export const isAuthenticated = () => {
	if (typeof window === undefined) {
		return false;
	}
	if (localStorage.getItem("jwt")) {
		return JSON.parse(localStorage.getItem("jwt"));
	} else {
		return false;
	}
};

export const signout = (next) => {
	if (typeof window !== undefined) {
		
		const { token } = isAuthenticated();
		localStorage.removeItem("jwt");
		next();

		return fetch(`${API}signout`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				Authorization: `Bearer ${token}`,
			},
		})
			.then((response) => console.log(response))
			.catch((err) => console.log(err));
	}
};
