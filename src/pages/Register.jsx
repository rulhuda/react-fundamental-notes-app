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

function RegisterPage () {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const { local } = useContext(LocalContext);

  const formData = { 
    name: '', email: '', password: '', passwordConfirmation: '' 
  };

  const [formControl, setFormControl] = useState(formData);
  const { name, email, password, passwordConfirmation } = formControl;

  const onHandleChange = (event) => {
    const {id, value} = event.target;
    setFormControl({...formControl, [id]: value })
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    if (formControl.password.length === 0 || formControl.passwordConfirmation.length === 0) {
      return;
    }

    if (formControl.password.length < 8) {
      swal({
        icon: 'warning',
        title: `${local === 'id' ? 'Kata sandi harus lebih dari 7 karakter!' : 'Password must greater than 7 characters!'}`,
        text: `${local === 'id' ? 'Ketikkan kata sandi anda lagi dan harus lebih dari 7 karakter!' : 'Type your password again and must greater than 7 characters!'}`,
      });

      return;
    }

    if (formControl.password !== formControl.passwordConfirmation) {
      swal({
        icon: 'warning',
        title: `${local === 'id' ? 'Kata sandi tidak sama!' : 'Password doesn\'t match!'}`,
        text: 'Pastikan password sama dengan konfirmasi password!',
      });

      return;
    }

    const { name, email, password } = formControl;
    const dataForm = {
      name,
      email,
      password
    };

    const postDataForm = await DataSource.Register(dataForm);

    if (postDataForm.status !== 'success' || postDataForm === undefined) {
      swal({
        'icon': 'warning',
        'title': `${local === 'id' ? 'Registrasi gagal!': 'Registration failed!'}`,
        'text': `${local === 'id' ? 'Cek koneksi internet anda!': 'Check your connection!'}`,
      }).then(() => {
        navigate('/register');
      });
      return;
    }

    swal({
      'icon': 'success',
      'title': `${local === 'id' ? 'Registrasi berhasil!' : 'Registration succesfully!'}`,
      'text': `${local === 'id' ? 'Silahkan login dengan akun yang telah anda daftarkan!' : 'Please login with the account you have registered!!'}`,
    }).then(() => {
      navigate('/');
    });
  }

  const onReset = (event) => {
    event.preventDefault();
    setFormControl(formData);
  }
  
  return (
    <>
      <Card className={`${theme === 'light' ? 'bg-light' : 'bg-dark'}`} style={{margin: '0 auto'}}>
        <Card.Header className="bg-primary">
          <h2 className="text-center">{local === 'id' ? 'Form Registrasi' : 'Registration Form'}</h2>
        </Card.Header>
        <Card.Body className={`${theme === 'light' ? 'bg-light' : 'bg-dark'}`} style={{borderRadius: '0 0 5px 5px'}} >
          <form className="container" onSubmit={onSubmit} onReset={onReset}>
            <FormInput 
              label={`${local === 'id' ? 'Nama' : 'Name'}`}
              inputOptions= {{
                onChange: onHandleChange,
                type: 'text',
                id: 'name',
                placeholder: 'John Doe',
                value: name,
                required: true,
              }}
            />

            <FormInput 
              label="Email"
              inputOptions= {{
                onChange: onHandleChange,
                type: 'email',
                id: 'email',
                placeholder: 'johndoe@gmail.com',
                value: email,
                required: true,
              }}
            />

            <FormInput 
              label={`${local === 'id' ? 'Kata sandi' : 'Password'}`}
              inputOptions= {{
                onChange: onHandleChange,
                type: 'password',
                id: 'password',
                placeholder: `${local === 'id' ? 'Kata sandi anda' : 'Your password'}`,
                value: password,
                required: true,
              }}
            />

            <FormInput 
              label={`${local === 'id' ? 'Konfirmasi kata sandi' : 'Password Confirmation'}`}
              inputOptions= {{
                onChange: onHandleChange,
                type: 'password',
                id: 'passwordConfirmation',
                placeholder: `${local === 'id' ? 'Ketikkan kata sandi lagi' : 'Type your password again'}`,
                value: passwordConfirmation,
                required: true,
              }}
            />

            <div className="mt-3">
              <Button theme="blue" buttonOptions={{
                type: 'submit',
              }}>{local === 'id' ? 'Daftar' : 'Register'}</Button>
              <Button theme="red" buttonOptions={{
                type: 'reset',
              }}>{local === 'id' ? 'Bersihkan' : 'Clear'}</Button>             
            </div>

            <div className="mt-2">
              <p className="text-center">{local === 'id' ? 'Sudah punya akun? ' : 'Have an account? '} <Link className="text-primary" to="/" title="halaman login">{local === 'id' ? 'Login disini! ' : 'Login here! '}</Link></p>
            </div>
          </form>
        </Card.Body>
      </Card>
    </>
  );
}

export default RegisterPage;