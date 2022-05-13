import React from "react";
import { Form, useField, Formik } from "formik";
import * as Yup from "yup";
import "./Form.css";
import { NavLink } from "react-router-dom";

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

const Login = () => {
  const initialState = {
    email: "",
    password: "",
  };

  return (
    <>
      <h2>Hey, Welcome back!!</h2>
      <Formik
        initialValues={initialState}
        validationSchema={Yup.object({
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
            alert(values);
            setSubmitting(false);
          }, 4000);
          resetForm({ values: "" });
          console.log("After updation/creation");
        }}
      >
        <Form className="form login-form">
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
              <NavLink className="blue" to="/forgot-password">
                Forget Password?
              </NavLink>
            </p>
            <p>
              Don't have an account.?
              <NavLink className="blue" to="/register">
                &nbsp;&nbsp;Sing Up
              </NavLink>
            </p>
          </div>
        </Form>
      </Formik>
    </>
  );
};

export default Login;
