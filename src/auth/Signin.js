import React, { useState } from "react";
import Base from "../core/Base";
import { API } from "../backend";
import { signin, authenticate } from "../auth/authhelper/index";
import { Redirect } from "react-router-dom";

export default function Signin({ ...rest }) {
	console.log(rest);
	const [user, setuser] = useState({
		email: "",
		password: "",
		error: "",
		loading: false,
		redirect: "",
	});
	const { email, password, error, loading, redirect } = user;
	const handleChange = (name) => (event) => {
		setuser({
			...user,
			error: "",
			loading: false,
			[name]: event.target.value,
		});
	};
	const pageLoading = () => {
		return (
			loading && (
				<div className="col-11 offset-md-3 text-left">
					<h2 className="col-sm-6">Loading.....</h2>
				</div>
			)
		);
	};
	const signIn = (event) => {
		event.preventDefault();
		console.log(API);
		if (email != "" && password != "") {
			setuser({ ...user, loading: true });
			signin({ email, password }).then((data) => {
				console.log(data);
				if (!data.fetchError) {
					if (data.error) {
						setuser({
							...user,
							loading: false,
							error: data.error.message,
						});
						console.log(data.error);
					} else {
						console.log(data);
						authenticate(data, () => {
							setuser({
								...user,
								loading: false,
								redirect: true,
							});
						});
					}
				} else {
					setuser({
						...user,
						loading: false,
						error: data.fetchError,
					});
				}
			});
		} else {
			if (email != "") {
				alert("Please enter password");
			} else if (password != "") {
				alert("Please enter username");
			} else {
				alert("Please enter username and password");
			}
		}
	};
	const errorOccured = () => {
		return (
			error && (
				<div className="row">
					<h2 className="col-md-6 offset-md-3 alert alert-danger">
						{error}
					</h2>
				</div>
			)
		);
	};
	const redirectProfile = () => {
		return redirect && <Redirect to="/profile" />;
	};
	const signInForm = () => {
		return (
			<form className="col-md-12  text-left my-5">
				<div className="form-row ">
					<div className="form-group mx-auto col-md-6 mb-2">
						<label>Email</label>
						<input
							type="text"
							className="form-control"
							value={email}
							onChange={handleChange("email")}
							id="inputEmail3"
							placeholder="Email"
						/>
					</div>
				</div>
				<div className="form-row ">
					<div className="form-group mx-auto col-md-6 mb-3">
						<label>Password</label>
						<input
							type="password"
							className="form-control"
							value={password}
							id="inputPassword3"
							onChange={handleChange("password")}
							placeholder="Password"
						/>
					</div>
				</div>
				<div className="form-row text-right my-3">
					<div className="form-group mx-auto col-md-6 mb-3">
						<button
							type="submit"
							onClick={signIn}
							className="btn btn-primary "
						>
							Sign in
						</button>
					</div>
				</div>
			</form>
		);
	};
	return (
		<Base title="Sign In" description="Sign in form">
			{pageLoading()}
			{errorOccured()}
			{signInForm()}

			{redirectProfile()}
		</Base>
	);
}
