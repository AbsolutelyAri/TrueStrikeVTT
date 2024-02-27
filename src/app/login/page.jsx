import LoginForm from "@/components/loginForm/LoginForm"
import { useState } from 'react';

const LoginPage = ()=> {
    return (
        <div>
            <LoginForm isOpen={true}></LoginForm>
        </div>
    )
}

export default LoginPage;
