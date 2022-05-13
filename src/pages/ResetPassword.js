import React, { useEffect } from "react";

import "./Form.css";
import { useGlobalContext } from "../context/Context";
import { useParams } from "react-router-dom";
import ResetForm from "../component/ResetForm";

const ResetPassword = () => {
  // Loading State
  // const [isLoading, setLoading] = useState(true);
  const params = useParams();

  const { userId, randomStr } = params;
  const { passwordReset, emailValidation, setResetLoading } =
    useGlobalContext();

  useEffect(() => {
    setResetLoading();
    emailValidation(userId, randomStr);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {passwordReset.isLoading && (
        <p className="page-load">Please wait while Page is loading...!</p>
      )}
      {passwordReset.isError && (
        <p className="page-load error">{passwordReset.errorMsg}</p>
      )}
      {passwordReset.isSuccess && <ResetForm />}
    </>
  );
};

export default ResetPassword;
