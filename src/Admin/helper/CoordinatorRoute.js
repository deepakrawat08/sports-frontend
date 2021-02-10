import React from "react";
import { useHistory } from "react-router-dom";
import { isAuthenticated, signout } from "../../auth/authhelper";
import { Route, Redirect } from "react-router-dom";
import { isCoordinator } from "../../user.js/userHelper/format";

export default function CoordinatorRoute({ component: Component, ...rest }) {
	const { user } = isAuthenticated();
	const history = useHistory();
	const checkForUser = () => {
		if (user) {
			if (
				window.confirm("Warning! your current session will be signout.")
			) {
				signout(() => {
					console.log("Sign Out");
				});
				return true;
			} else {
				history.goBack();

				console.log(history);
				return false;
			}
		}
		return true;
	};
	return (
		<Route
			{...rest}
			render={(props) =>
				user && isCoordinator(user.role) ? (
					<Component {...props} />
				) : (
					checkForUser() && (
						<Redirect
							to={{
								pathname: "/signIn",
								state: { from: props.location },
							}}
						/>
					)
				)
			}
		/>
	);
}
