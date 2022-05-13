import React from "react";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import "./Form.css";
import { useGlobalContext } from "../context/Context";

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

const ForgotPassword = () => {
  const { forgotPassword, passwordForgot, activationMsg } = useGlobalContext();

  const initialState = {
    email: "",
  };
  return (
    <>
      {passwordForgot.isError && (
        <p className="error-msg">{passwordForgot.errorMsg}</p>
      )}
      {activationMsg && <p className="success-msg">{activationMsg}</p>}
      <h2>Forgot Password</h2>
      <Formik
        initialValues={initialState}
        validationSchema={Yup.object({
          email: Yup.string().email("Invalid email").required("Required"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            forgotPassword(values);
            setSubmitting(false);
          }, 400);
        }}
      >
        <Form className="form">
          <MyTextInput
            label="Email Address"
            name="email"
            type="email"
            placeholder="jane@formik.com"
          />
          <button type="submit" className="btn forgot-btn">
            Submit
          </button>
        </Form>
      </Formik>
    </>
  );
};

export default ForgotPassword;
