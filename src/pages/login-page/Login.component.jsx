import React, { useReducer, useContext } from "react";
import { Link, useNavigate } from 'react-router-dom';

import loginReducer, {
	LOGIN_INITITAL_STATE,
} from "../../reducers/loginReducer.js";
import {
	updateEmailAction,
	updatedPasswordAction,
} from "../../actions/loginAction";

import FormInputCon from "../../components/form/form-input-container/FormInputContainer.component";
import isStrongPassword from "validator/lib/isStrongPassword";
import "./login.styles.css";
import Card from "../../components/card/Card.component";
import isEmail  from "validator/lib/isEmail";
import {AuthContext} from "../../contexts/Auth.contexxt.jsx";

const API_URL = process.env.REACT_APP_API_URL;


const Login = () => {
	const navigate = useNavigate();

	const authContextValue = useContext(AuthContext)

	const [loginState, dispatchLoginState] = useReducer(
		loginReducer,
		LOGIN_INITITAL_STATE
	);

	const handelEmail = (event) => {
		const emailInput = event.target.value.toLowerCase().trim();

		if (emailInput === '') {
			dispatchLoginState(
				updateEmailAction(emailInput, false, "Please enter an email address")
			);

			return;
		}

		if (!isEmail(emailInput)) {
			dispatchLoginState(
				updateEmailAction(
					emailInput,
					false,
					"Please enter a valid email address"
				)
			);

			return;
		}

		dispatchLoginState(updateEmailAction(emailInput, true, ''));
	};

	const handelPassword = (event) => {
		const passwordInput = event.target.value.trim();

		if (passwordInput === '') {
			dispatchLoginState(
				updatedPasswordAction(passwordInput, false, "Please enter a password")
			);

			return;
		}
		if (!isStrongPassword(passwordInput)) {
			dispatchLoginState(
				updatedPasswordAction(
					passwordInput,
					false,
					"Please enter a strong password"
				)
			);

			return;
		}
		dispatchLoginState(updatedPasswordAction(passwordInput, true, ''));
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		const values = loginState.values;
		const validities = loginState.validities;

		if (
			values.email === "" ||
			values.password === "" ||
			!validities.email ||
			!validities.password
		) {
			return;
		}

		const data = {
			email: loginState.values.email,
			password: loginState.values.password,
		};

		try {
			const response = await fetch(`${API_URL}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});
			if (!response.ok) {
				throw new Error();
			}

			const resData = await response.json();

			const token = resData.data.token;

			localStorage.setItem('userToken',token);
			authContextValue.setToken(token);
			
			navigate('/')
			
		} catch (err) {
			alert("Error");
		}
	};


	return (
		<main className="loginPage">
			<Card className="loginCard">
				<h3> Wellcome Back </h3>
				<h5>Please Enter Your Info:</h5>
				<form className="loginForm" onSubmit={handleSubmit}>
					<div className="formGroup">
						<FormInputCon
							id="email"
							labelText="Email:"
							required={false}
							type="email"
							isValid={loginState.validities.email}
							errorMessage={loginState.errorMessages.email}
							handleInput={handelEmail}
						/>

						<FormInputCon
							id="password"
							labelText="Password:"
							required={false}
							type="password"
							isValid={loginState.validities.password}
							errorMessage={loginState.errorMessages.password}
							handleInput={handelPassword}
						/>
					</div>

					<Link to="/signup" className="signupLink">
					Click for Sign-up

                    </Link>

					<button class="inputButton" type="submit">
						Login
					</button>
					{/* <a href="http://localhost:3000/"><button type="button">  Home</button></a> */}
				</form>
			</Card>
		</main>
	);
};

export default Login;
