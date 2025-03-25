import React from "react";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import './Register.scss';

function Register(){
return(
    <div className='register-container'>
        <h1>Register User</h1>
        <RegisterForm />
    </div>  
);
}
export default Register;