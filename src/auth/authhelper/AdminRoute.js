import React from "react";
import { Route, Redirect, useHistory } from "react-router-dom";
import { isAuthenticated, signout } from "./index";
import { isAdmin } from "../../user.js/userHelper/format";

const AdminRoute = ({ component: Component, ...rest }) => {
	const { user } = isAuthenticated();
	const history = useHistory();
	const checkForUser = () => {
		
		console.log(history.location)
		console.log(history.from)
		console.log(history)
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
				
				console.log(history)
				return false;
			}
		}
		return true;
	};
	return (
		<Route
			{...rest}
			render={(props) =>
				user && isAdmin(user.role) ? (
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
};

export default AdminRoute;
