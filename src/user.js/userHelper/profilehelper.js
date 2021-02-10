import { API } from "../../backend";

export const updateProfile = (userId, token, user) => {
	return fetch(`${API}updateUser/${userId}`, {
		method: "PUT",
		headers: {
			"Content-type": "application/json",
			Authorization: `Bearer ${token}`,
			Accept: "application/json",
		},
		body: JSON.stringify(user),
	})
		.then((resopnse) => {
			return resopnse.json();
		})
		.catch((error) => {
			return {
				fetchError: `Network Error:${error}. Please try again later`,
			};
		});
};
