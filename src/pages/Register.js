import React from "react";
import { Form, useField, Formik } from "formik";
import * as Yup from "yup";
import "./Form.css";
import { NavLink } from "react-router-dom";
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

const Register = () => {
  const { registerUser, register } = useGlobalContext();

  const initialState = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  };

  return (
    <>
      {register.isError && <p className="error-msg">{register.errorMsg}</p>}
      <h2>Create an Account</h2>
      <Formik
        initialValues={initialState}
        validationSchema={Yup.object({
          firstname: Yup.string()
            .max(15, "Must be 15 characters or less")
            .required("Required"),
          email: Yup.string()
            .email("Invalid Email address")
            .required("Required"),
          password: Yup.string()
            .min(6, "Must be atleast 6 characters")
            .max(12, "Must be lesser than or equal to 12 characters")
            .required("Required"),
        })}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setTimeout(() => {
            // Sending the User values to store in DB
            registerUser(values);

            setSubmitting(false);
          }, 400);
          resetForm({ values: "" });
        }}
      >
        <Form className="form login-form">
          <MyTextInput
            label="Firstname"
            name="firstname"
            type="text"
            placeholder="Please enter the Firstname"
          />
          <MyTextInput
            label="Lastname"
            name="lastname"
            type="text"
            placeholder="Please enter the Lastname"
          />
          <MyTextInput
            label="Email address"
            name="email"
            type="email"
            placeholder="Please enter the Email"
          />
          <MyTextInput
            label="Password"
            name="password"
            type="password"
            placeholder="Please enter the Password"
          />
          <button type="submit" className="btn login-btn">
            Submit
          </button>
          <div className="login-action">
            <p className="blue">
              <NavLink className="blue" to="/">
                Back to Login
              </NavLink>
            </p>
          </div>
        </Form>
      </Formik>
    </>
  );
};

export default Register;
