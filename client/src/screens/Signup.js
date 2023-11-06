import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Signup as mySignup } from "../axios/index.js";
import "react-phone-number-input/style.css";
import toast from "react-hot-toast";
import "../css/Signup.css";
import { Container } from "react-bootstrap";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    passwordAgain: "",
  });
  const [disabled, setDisabled] = useState(true);
  useEffect(() => {
    console.log(formData);
    if (
      formData.password.length >= 6 &&
      formData.fullname.length >= 5 &&
      formData.phoneNumber.length >= 10 &&
      formData.email.length >= 3 &&
      formData.password === formData.passwordAgain
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [formData]);
  if (localStorage.getItem("user")) {
    return <Navigate to="/browse" />
  }
  else {
    return (
      <div className="signup-body">
        <Container className="signUp">
          <form className="signUp-form"
            onSubmit={(e) => {
              e.preventDefault();
              mySignup(formData)
                .then((res) => {
                  navigate("/login");
                })
                .catch((err) => {
                  toast.error(err.response.data.message);
                });
            }}
          >
            <h2 className="signIn-header">Sign Up</h2>
            <input
              onChange={(e) =>
                setFormData({ ...formData, fullname: e.target.value })
              }
              type="username"
              name="fullname"
              placeholder="İsim soyisim girin"
            />

            <input
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              type="email"
              name="email"
              placeholder="E-mail adresinizi girin"
            />

            <input
              onChange={(e) =>
                setFormData({ ...formData, phoneNumber: e.target.value })
              }
              type="number"
              name="phoneNumber"
              placeholder="Telefon numaranızı giriniz"
            />
            <input
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              type="password"
              name="password"
              placeholder="Şifrenizi girin"
            />
            <input
              onChange={(e) =>
                setFormData({ ...formData, passwordAgain: e.target.value })
              }
              type="password"
              name="passwordAgain"
              placeholder="Şifrenizi tekrar girin"
            />

            <button
              disabled={disabled}
              type="submit"
            >
              Kaydol
            </button>
            <h4>
              <a href="#2" onClick={() => navigate("/login")}>Back to login</a>
            </h4>
          </form>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
              marginTop: "10px",
            }}
          >
            <p
              style={{
                color: "red",
                display: formData.password.length >= 6 && "none",
              }}
            >
              * Şifre en az 6 karakter olmalı.
            </p>
            <p
              style={{
                color: "red",
                display: formData.password === formData.passwordAgain && "none",
              }}
            >
              * Şifre ve tekrar girilen şifre aynı olmalı.
            </p>
            <p
              style={{
                color: "red",
                display: formData.email.length >= 3 && "none",
              }}
            >
              * E-mail adresi en az 3 karakter olmalı.
            </p>
          </div>
        </Container>
      </div>
    );
  };
}

export default Signup;
