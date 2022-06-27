import React from 'react'
import './form-input-container.style.css'
import FormInput from '../form-input/FormInput.component';
import FormLabel from '../form-label/FormLabel.component';

const FormInputCon = (props) => {
    return (
        <div className='form-input-con'>

            <FormLabel htmlFor={props.id} text={props.labelText}/>

            <FormInput id={props.id} required={props.required} type={props.type} handleInput={props.handleInput}/>
            
            {!props.isValid && <div className="error-message">{props.errorMessage}</div>}

        </div>

    );
};

export default FormInputCon;