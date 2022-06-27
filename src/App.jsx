import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./shared/header/Header.component";

import HomePage from "./pages/home-page/HomePage.component";
import Login from "./pages/login-page/Login.component";
import SignUp from "./pages/singup-page/SingupPage.component";
import AuthContextProvider from "./contexts/Auth.contexxt";

const App = () => {
	return (
		<BrowserRouter>

			<AuthContextProvider>
        
				<Header />

				<Routes>

					<Route path="" element={<HomePage />} />

					<Route path="Login" element={<Login />} />

					<Route path="SignUp" element={<SignUp />} />

				</Routes>


			</AuthContextProvider>

		</BrowserRouter>
	);
};

export default App;
