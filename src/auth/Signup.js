import React, { useState } from "react";
import Base from "../core/Base";
import { signup } from "../auth/authhelper/index";
import { API } from "../backend";

export default function Signup() {
	const [values, setvalues] = useState({
		fName: "",
		lName: "",
		rollNo: "",
		branch: "",
		year: "",
		email: "",
		mobileNo: "",
		password: "",
		cpassword: "",
		error: "",
		loading: "",
		success: "",
	});
	const {
		fName,
		lName,
		rollNo,
		branch,
		year,
		email,
		mobileNo,
		password,
		cpassword,
		error,
		loading,
		success,
	} = values;

	const sumbit = (event) => {
		event.preventDefault();
		console.log(checkEmptyField());
		const check = checkEmptyField();
		if (!check) {
			setvalues({ ...values, error: "Please fill all the fields" });
		} else if (check && password && cpassword && password !== cpassword) {
			setvalues({
				...values,
				password: "",
				cpassword: "",
				error: "Confirm password should be same as password",
			});
		} else {
			const user = {
				firstName: fName,
				lastName: lName,
				rollNumber: rollNo,
				year: year,
				branch: branch,
				email: email,
				mobileNo: mobileNo,
				password: password,
			};
			console.log(user);
			setvalues({ ...values, loading: true });
			signup(user)
				.then((data) => {
					if (!data.fetchError) {
						if (data.error) {
							setvalues({
								...values,
								error: data.error,
								success: false,
							});
						} else {
							setvalues({
								fName: "",
								lName: "",
								rollNo: "",
								branch: "",
								year: "",
								email: "",
								mobileNo: "",
								password: "",
								cpassword: "",
								error: "",
								loading: "",
								success: true,
							});
						}
					} else {
						setvalues({
							...values,
							error: data.fetchError,
							success: false,
						});
					}
				})
				.catch((err) => console.log(err));
		}
	};
	const checkEmptyField = () => {
		if (
			fName === "" ||
			lName === "" ||
			rollNo === "" ||
			branch === "" ||
			year === "" ||
			email === "" ||
			mobileNo === "" ||
			password === "" ||
			cpassword === ""
		) {
			return false;
		} else {
			return true;
		}
	};
	const reset = (event) => {
		event.preventDefault();
		setvalues({
			fName: "",
			lName: "",
			rollNo: "",
			branch: "",
			year: "",
			email: "",
			mobileNo: "",
			password: "",
			cpassword: "",
			error: "",
			loading: "",
		});
	};
	const handleChange = (name) => (event) => {
		setvalues({
			...values,
			success:false,
			error: false,
			loading: false,
			[name]: event.target.value,
		});
	};
	const pageLoading = () => {
		return (
			loading && (
				<div className="row">
					<h2 class="col-md-8 offset-md-2">Loading.....</h2>
				</div>
			)
		);
	};
	const errorOccured = () => {
		return (
			error && (
				<div className="row">
					<h2 className="col-md-8 offset-md-2 alert alert-danger">
						{error}
					</h2>
				</div>
			)
		);
	};
	const successful = () => {
		return (
			success && (
				<div className="row">
					<h2 className="col-md-8 offset-md-2 alert alert-danger">
						Signed up successfully. Go for Sign In
					</h2>
				</div>
			)
		);
	};

	const signUpForm = () => (
		<form className="col-md-12 mt-2">
			<div className="form-row">
				<div className="form-group  col-md-5 mb-3 ml-auto">
					<lable>First Name</lable>
					<input
						type="text"
						className="form-control"
						placeholder="First name"
						value={fName}
						onChange={handleChange("fName")}
					/>
				</div>
				<div className="form-group col-md-5 mr-auto">
					<lable>Last Name</lable>
					<input
						type="text"
						class="form-control"
						placeholder="Last name"
						value={lName}
						onChange={handleChange("lName")}
					/>
				</div>
			</div>
			<div className="form-row">
				<div className="form-group col-md-4 ml-auto">
					<lable>Roll Number</lable>
					<input
						type="text"
						className="form-control"
						placeholder="Roll Number"
						value={rollNo}
						maxLength="10"
						onChange={handleChange("rollNo")}
					/>
				</div>
				<div className="form-group col-md-4">
					<lable>Branch</lable>

					<select
						className="form-control"
						value={branch}
						onChange={handleChange("branch")}
					>
						<option value="" selected disabled>
							Select your Branch
						</option>
						<option value="CSE">
							Computer Science and Enginering
						</option>
						<option value="TT">Textile Technology</option>
						<option value="TC">Textile Chemistry</option>
					</select>
				</div>
				<div className="form-group col-md-2 mr-auto">
					<lable>Year</lable>
					<select
						className="form-control"
						value={year}
						onChange={handleChange("year")}
					>
						<option value="" selected disabled>
							Select your Year
						</option>
						<option value="1Y">1st Year</option>
						<option value="2Y">2nd Year</option>
						<option value="3Y">3rd Year</option>
						<option value="4Y">4th Year</option>
					</select>
				</div>
			</div>
			<div className="form-row">
				<div className="form-group col-md-6 ml-auto">
					<lable>Email</lable>
					<input
						type="text"
						className="form-control"
						placeholder="Email"
						value={email}
						onChange={handleChange("email")}
					/>
				</div>
				<div className="form-group col-md-4 mr-auto">
					<lable>Mobile No.</lable>
					<input
						type="text"
						className="form-control"
						placeholder="Mobile No."
						value={mobileNo}
						onChange={handleChange("mobileNo")}
					/>
				</div>
			</div>
			<div className="form-row ">
				<div className="form-group col-md-5 mb-3 ml-auto">
					<lable>Password</lable>
					<input
						type="password"
						className="form-control"
						placeholder="Password"
						value={password}
						onChange={handleChange("password")}
					/>
				</div>
				<div className="form-group col-md-5 mr-auto">
					<lable>Confirm Password</lable>
					<input
						type="password"
						class="form-control"
						placeholder="Confirm Password"
						value={cpassword}
						onChange={handleChange("cpassword")}
					/>
				</div>
			</div>
			<div className="form-row my-3">
				<div className="form-group col-10 text-right mx-auto">
					<button className="btn btn-secondary mx-2" onClick={reset}>
						Reset
					</button>
					<button className="btn btn-primary" onClick={sumbit}>
						Submit
					</button>
				</div>
			</div>
		</form>
	);
	return (
		<Base title="Sign Up" description="Sign up here">
			{pageLoading()}
			{errorOccured()}
			{successful()}
			{signUpForm()}
			{/*JSON.stringify(values)*/}
		</Base>
	);
}
