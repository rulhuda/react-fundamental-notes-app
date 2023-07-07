import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import Button from "../components/Button";
import FormInput from "../components/FormInput";
import LocalContext from "../contexts/LocalContext";
import ThemeContext from "../contexts/ThemeContext";
import DataSource from "../data/data-source";
import { setCookie } from "../utils/cookies";

function LoginPage() {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const { local } = useContext(LocalContext);

  const formData = {
    email: "",
    password: "",
  };

  const [formControl, setFormControl] = useState(formData);
  const { email, password } = formControl;

  const onHandleChange = (event) => {
    const { id, value } = event.target;
    setFormControl({ ...formControl, [id]: value });
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    if (formControl.password.length < 8) {
      swal({
        icon: "warning",
        title: `${
          local === "id"
            ? "Kata sandi harus lebih dari 7 karakter!"
            : "Password must greater than 7 characters!"
        }`,
        text: `${
          local === "id"
            ? "Ketikkan kata sandi anda lagi dan harus lebih dari 7 karakter!"
            : "Type your password again and must greater than 7 characters!"
        }`,
      });

      return;
    }

    const dataForm = formControl;
    const postDataForm = await DataSource.Login(dataForm);

    if (postDataForm.status !== "success" || postDataForm === undefined) {
      swal({
        icon: "warning",
        title: `${local === "id" ? "Login gagal!" : "Login failed!"}`,
        text: `${
          local === "id"
            ? "Cek kembali email dan kata sandi anda!"
            : "Check your email and password again!"
        }`,
      }).then(() => {
        navigate("/");
      });
      return;
    }

    const { accessToken } = postDataForm.data;
    setCookie("token", accessToken, 1);
    swal({
      icon: "success",
      title: `${local === "id" ? "Login berhasil!" : "Login successfully!"}`,
    }).then(() => {
      navigate("/");
      window.location.reload();
    });
  };

  const onReset = (event) => {
    event.preventDefault();
    setFormControl(formData);
  };

  return (
    <>
      <Card
        className={`${theme === "light" ? "bg-dark" : "bg-light"}`}
        style={{ margin: "0 auto", border: "none" }}
      >
        <Card.Header className='bg-primary'>
          <h2
            className={`text-center ${
              theme === "light" ? "text-dark" : "text-white"
            }`}
          >
            {local === "id" ? "Form Login" : "Login Form"}
          </h2>
        </Card.Header>
        <Card.Body
          className={`${theme === "light" ? "bg-light" : "bg-dark"}`}
          style={{ borderRadius: "0 0 5px 5px" }}
        >
          <form className='container' onSubmit={onSubmit} onReset={onReset}>
            <FormInput
              label='Email'
              inputOptions={{
                onChange: onHandleChange,
                type: "email",
                id: "email",
                placeholder: "johndoe@gmail.com",
                value: email,
                required: true,
              }}
            />

            <FormInput
              label={local === "id" ? "Kata sandi" : "Password"}
              inputOptions={{
                onChange: onHandleChange,
                type: "password",
                id: "password",
                placeholder: `${
                  local === "id" ? "Kata sandi anda" : "Your password"
                }`,
                value: password,
                required: true,
              }}
            />

            <div className='mt-3'>
              <Button
                theme='blue'
                buttonOptions={{
                  type: "submit",
                }}
              >
                {local === "id" ? "Masuk" : "Login"}
              </Button>
              <Button
                theme='red'
                buttonOptions={{
                  type: "reset",
                }}
              >
                {local === "id" ? "Bersihkan" : "Reset"}
              </Button>
            </div>
            <div className='mt-2'>
              <p
                className={`text-center ${
                  theme === "light" ? "text-dark" : "text-white"
                }`}
              >
                {local === "id"
                  ? "Belum punya akun? "
                  : "Doesn't Have an account? "}
                <Link
                  className='text-primary'
                  to='/register'
                  title='halaman registrasi'
                >
                  {local === "id" ? "Registrasi disini! " : "Register here!"}
                </Link>
              </p>
            </div>
          </form>
        </Card.Body>
      </Card>
    </>
  );
}

export default LoginPage;
