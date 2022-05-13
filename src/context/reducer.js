const reducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return {...state };
        case "ADD_USER":
            return {...state, user: action.payload };
        case "REGISTER_ERROR":
            const registerStatus = {
                ...state.register,
                isError: false,
                errorMsg: action.payload,
            };
            return {...state, register: registerStatus };
        case "FORGOT_PASSWORD_ERROR":
            const forgotPasswordStatus = {
                ...state.passwordForgot,
                isError: false,
                errorMsg: action.payload,
            };
            return {...state, register: forgotPasswordStatus };
        case "EMAIL_SENT":
            return {...state, activationMsg: action.payload };
        case "PASSWORD_RESET":
            const resetStatus = {
                ...state.passwordReset,
                isLoading: action.payload,
            };
            return {...state, passwordReset: resetStatus };
        case "USER_EMAIL_VALIDATE":
            const emailStatus = {
                ...state.passwordReset,
                isError: action.payload.isError,
                isLoading: action.payload.isLoading,
                errorMsg: action.payload.errorMsg,
                isSuccess: action.payload.isSuccess,
            };
            return {...state, passwordReset: emailStatus };
        default:
            throw new Error("No Matching Action types");
    }
};

export default reducer;
