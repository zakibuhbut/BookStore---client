
const loginActionType = {
    UPDATE_EMAIL: 'UPDATE_EMAIL',
    UPDATE_PASSWORD: 'UPDATE_PASSWORD',
};

export const updateEmailAction = (value, isValid, errorMessage) => {
    const action = {
        type: loginActionType.UPDATE_EMAIL,
        payload: {
            value: value,
            isValid: isValid,
            errorMessage: errorMessage,
        },
    };

    console.log(action)
    return action;
};

export const updatedPasswordAction = (value, isValid, errorMessage) => {
    const action = {
        type: loginActionType.UPDATE_PASSWORD,
        payload: {
            value: value,
            isValid: isValid,
            errorMessage: errorMessage,
        },
    };

    return action;
};

export default loginActionType;