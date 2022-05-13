import React, { useContext, useReducer } from "react";
import reducer from "./reducer";
import axios from "axios";

//Creating Context
const AuthContext = React.createContext();

const initialState = {
  user: {},
  register: { isLoading: false, isError: false, errorMsg: "" },
  passwordForgot: { isLoading: false, isError: false, errorMsg: "" },
  passwordReset: {
    isLoading: false,
    isError: false,
    errorMsg: "",
    isSuccess: false,
  },
  activationMsg: "",
};

const URL = "https://password-reset-gmkumaran87.herokuapp.com/api/v1/register";

const Context = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const registerUser = async (userObj) => {
    try {
      // Sending Post request to save the User details in the DB
      const result = await axios.post(URL, userObj);
      if (result.status === 200) {
        dispatch({ type: "ADD_USER", payload: result.data });
      }
      console.log(result);
    } catch (error) {
      dispatch({ type: "ERROR", payload: error.response.data.msg });
    }
  };

  const forgotPassword = async (email) => {
    try {
      const result = await axios.post(`${URL}/forgot-password/`, email);

      if (result.status === 200) {
        dispatch({ type: "EMAIL_SENT", payload: result.data.msg });
      }
    } catch (error) {
      dispatch({ type: "ERROR", payload: error.response.data.msg });
    }
  };

  const updatePassword = async (userObj) => {
    try {
      const result = await axios.post(`${URL}/update-password/`, userObj);

      if (result.status === 200) {
        return;
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  const emailValidation = async (userId, randomStr) => {
    try {
      const res = await axios.post(
        `${URL}/email-validation/${userId}/${randomStr}`,
        {},
        {
          timeout: 5000,
        }
      );

      if (res.status === 200) {
        dispatch({
          type: "USER_EMAIL_VALIDATE",
          payload: { isLoading: false, isError: false, isSuccess: true },
        });
      }
    } catch (error) {
      dispatch({
        type: "USER_EMAIL_VALIDATE",
        payload: {
          isLoading: false,
          isError: true,
          errorMsg: error.response.data.msg,
          isSuccess: false,
        },
      });
      console.log(error.response);
    }
  };

  // Setting the Password reset form page
  /*useEffect(() => {
    console.log("Restting the Page load");
    dispatch({ type: "PASSWORD_RESET", payload: true });
  }, []);*/

  const setResetLoading = () => {
    dispatch({ type: "PASSWORD_RESET", payload: true });
  };
  return (
    <AuthContext.Provider
      value={{
        ...state,
        registerUser,
        forgotPassword,
        updatePassword,
        emailValidation,
        setResetLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AuthContext);
};

export { Context, AuthContext };
