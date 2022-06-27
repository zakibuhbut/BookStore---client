import React from "react";
import "./form-input.style.css"

const FormInput = (props) => {
	return (
		<input
			className={props.className ? props.className : "form-input"}
			id={props.id}
			type={props.type ? props.type : 'text'}
			required={props.required}
			onInput={props.handleInput}
		/>
	);
};

export default FormInput;

