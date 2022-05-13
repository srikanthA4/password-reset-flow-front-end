import React from "react";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import "../pages/Form.css";
import { useGlobalContext } from "../context/Context";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const MyTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="text-input" {...props} {...field}></input>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

const ResetForm = () => {
  const params = useParams();
  const navigate = useNavigate();

  const { userId, randomStr } = params;
  const { updatePassword } = useGlobalContext();

  const state = {
    newPassword: "",
    confirmPassword: "",
  };

  return (
    <>
      <h2>Reset Password</h2>
      <Formik
        initialValues={state}
        validationSchema={Yup.object({
          newPassword: Yup.string()
            .min(6, "Must be atleast 6 characters")
            .max(12, "Must be lesser than or equal to 12 characters")
            .required("Required"),
          confirmPassword: Yup.string()
            .min(6, "Must be atleast 6 characters")
            .max(12, "Must be lesser than or equal to 12 characters")
            .required("Required"),
        })}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setTimeout(() => {
            const userObj = {
              newPassword: values.newPassword,
              confirmPassword: values.confirmPassword,
              userId,
              randomStr,
            };
            // Sending the User values to store in DB
            updatePassword(userObj);
            setSubmitting(false);
            navigate("/");
          }, 400);
          resetForm("");
        }}
      >
        <Form className="form login-form">
          <MyTextInput
            label="New Password"
            name="newPassword"
            type="password"
            placeholder="Please enter the new Password"
          />
          <MyTextInput
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            placeholder="Please confirm password"
          />
          <button type="submit" className="btn">
            Submit
          </button>
        </Form>
      </Formik>
    </>
  );
};

export default ResetForm;
