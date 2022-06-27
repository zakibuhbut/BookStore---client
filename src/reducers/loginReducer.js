import loginActionType from '../actions/loginAction';

export const LOGIN_INITITAL_STATE = {
    values: {
        email: ' ',
        password: ' ',

    },
    validities: {
        email: true,
        password: true, 
    },

    errorMessages: {
        email: ' ',
        password: '',
 
    },
};


const loginReducer = (state, action) => {
    switch (action.type) {

        case loginActionType.UPDATE_EMAIL: {
            const updatedEmailValue = action.payload.value;
            const updatedIsEmailValid = action.payload.isValid;
            const updatedEmailErrorMessage = action.payload.errorMessage;

            const updatedValues = { ...state.values, email: updatedEmailValue };
            const updatedValidities = { ...state.validities, email: updatedIsEmailValid };
            const updatedErrorMessages = { ...state.errorMessages, email: updatedEmailErrorMessage };

            const updatedState = {
                values: updatedValues,
                validities: updatedValidities,
                errorMessages: updatedErrorMessages,
            };

            console.log(updatedState)

            return updatedState;
        }
        case loginActionType.UPDATE_PASSWORD: {
            const updatedPasswordValue = action.payload.value;
            const updatedIsPasswordValid = action.payload.isValid;
            const updatedPasswordErrorMessage = action.payload.errorMessage;

            const updatedValues = { ...state.values, password: updatedPasswordValue };
            const updatedValidities = { ...state.validities, password: updatedIsPasswordValid };
            const updatedErrorMessages = { ...state.errorMessages, password: updatedPasswordErrorMessage };

            const updatedState = {
                values: updatedValues,
                validities: updatedValidities,
                errorMessages: updatedErrorMessages,
            };

            return updatedState;
        }
        default: {
            return state;
        }
    }
};

export default loginReducer;
 