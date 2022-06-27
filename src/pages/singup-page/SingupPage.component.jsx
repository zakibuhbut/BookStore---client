import React, { useReducer , useContext} from "react";
import { Link ,useNavigate } from 'react-router-dom';

import isEmail from "validator/lib/isEmail";

import "./singup-page.styles.css";

import signupReducer, {
	SIGNUP_INITITAL_STATE,
} from "../../reducers/signupReducer.js";
import * as signupActions from "../../actions/signupAction.js";
import Card from '../../components/card/Card.component';
import FormInputCon from "../../components/form/form-input-container/FormInputContainer.component";

import {AuthContext} from "../../contexts/Auth.contexxt.jsx";

const API_URL = process.env.REACT_APP_API_URL;



const SignUp = () => {
	const navigate = useNavigate();

	const authContextValue = useContext(AuthContext)

	const [signupState, dipatchSignUpState] = useReducer(
		signupReducer,
		SIGNUP_INITITAL_STATE
	);

	const handleFirstNameInput = (event) => {
		const firstNameInput = event.target.value.trim();

		if (firstNameInput === "") {
			dipatchSignUpState(
				signupActions.updateFirstName(
					firstNameInput,
					false,
					"Please enter your first name"
				)
			);

			return;
		}

		dipatchSignUpState(signupActions.updateFirstName(firstNameInput, true, ""));
	};

	const handleLastNameInput = (event) => {
		const lastNameInput = event.target.value.trim();

		if (lastNameInput === "") {
			dipatchSignUpState(
				signupActions.updateLastName(
					lastNameInput,
					false,
					"Please enter your last name"
				)
			);

			return;
		}

		dipatchSignUpState(signupActions.updateLastName(lastNameInput, true, ""));
	};

	const handleEmailInput = (event) => {
		const emailInput = event.target.value.toLowerCase().trim();

		if (emailInput === "") {
			dipatchSignUpState(
				signupActions.updateEmailAction(
					emailInput,
					false,
					"Please enter an email address"
				)
			);

			return;
		}

		if (!isEmail(emailInput)) {
			dipatchSignUpState(
				signupActions.updateEmailAction(
					emailInput,
					false,
					"Please enter a valid email address"
				)
			);

			return;
		}

		dipatchSignUpState(signupActions.updateEmailAction(emailInput, true, ""));
	};

	const handlePasswordInput = (event) => {
		const passwordInput = event.target.value.trim();

		if (passwordInput === "") {
			dipatchSignUpState(
				signupActions.updatedPasswordAction(
					passwordInput,
					false,
					"Please enter a password"
				)
			);

			return;
		}

		dipatchSignUpState(
			signupActions.updatedPasswordAction(passwordInput, true, "")
		);
	};

	const handleRepeatedPasswordInput = (event) => {
		const repeatedPasswordInput = event.target.value.trim();

		if (repeatedPasswordInput === "") {
			dipatchSignUpState(
				signupActions.updatedRepeatedPasswordAction(
					repeatedPasswordInput,
					false,
					"Please enter your password again"
				)
			);

			return;
		}

		if (repeatedPasswordInput !== signupState.values.password) {
			dipatchSignUpState(
				signupActions.updatedRepeatedPasswordAction(
					repeatedPasswordInput,
					false,
					"Your passwords don't match"
				)
			);

			return;
		}

		dipatchSignUpState(
			signupActions.updatedRepeatedPasswordAction(
				repeatedPasswordInput,
				true,
				""
			)
		);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (
			!signupState.validities.firstName ||
			!signupState.validities.lastName ||
			!signupState.validities.email ||
			!signupState.validities.password ||
			!signupState.validities.repeatedPassword ||
			signupState.values.firstName === "" ||
			signupState.values.lastName === "" ||
			signupState.values.email === "" ||
			signupState.values.password === "" ||
			signupState.values.repeatedPassword === ""
		) {
			return;
		}

		const data = {
			firstName: signupState.values.firstName,
			lastName: signupState.values.lastName,
			email: signupState.values.email,
			password: signupState.values.password,
		};

		try {
			const response = await fetch(`${API_URL}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});

			if (response.status !== 201) {
				throw new Error();
			}

			const resData = await response.json();
			const token = resData.data.token;

			localStorage.setItem('userToken',token);
			authContextValue.setToken(token);
			
			navigate('/');
			
		} catch (err) {
			alert("Error");
		}
	};

	return (
		<main className="signUpPage">
			<Card className="signUpCard">
				<h3> Let's sign up </h3>
				<form className="signUpForm" onSubmit={handleSubmit}>
					<div className="formGroup">
						<FormInputCon
							id="first-name"
							labelText="First Name:"
							required={false}
							isValid={signupState.validities.firstName}
							errorMessage={signupState.errorMessages.firstName}
							handleInput={handleFirstNameInput}
						/>

						<FormInputCon
							id="last-name"
							labelText="Last Name:"
							required={false}
							isValid={signupState.validities.lastName}
							errorMessage={signupState.errorMessages.lastName}
							handleInput={handleLastNameInput}
						/>

						<FormInputCon
							id="email"
							labelText="Email:"
							required={false}
							type="email"
							isValid={signupState.validities.email}
							errorMessage={signupState.errorMessages.email}
							handleInput={handleEmailInput}
						/>

						<FormInputCon
							id="password"
							labelText="Password:"
							required={false}
							type="password"
							isValid={signupState.validities.password}
							errorMessage={signupState.errorMessages.password}
							handleInput={handlePasswordInput}
						/>

						<FormInputCon
							id="repeated-password"
							labelText="Repeat Password:"
							required={false}
							type="password"
							isValid={signupState.validities.repeatedPassword}
							errorMessage={signupState.errorMessages.repeatedPassword}
							handleInput={handleRepeatedPasswordInput}
						/>
					</div>

					<Link to="/login" className="loginLink">
					Have an account? Login
                    </Link>

					<button type="submit"> Sign-Up </button>

					{/* <a href="http://localhost:3000/">
						<button type="button"> Home</button>
					</a> */}
				</form>
			</Card>
		</main>
	);
};

export default SignUp;
