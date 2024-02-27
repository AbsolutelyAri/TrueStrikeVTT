'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const LoginForm = ({isOpen, setIsOpen}) => {
    const router = useRouter()

    const [username, setUsername] = useState(''); // username state variable and setUsername function to update it
    const [password, setPassword] = useState(''); // password state variable and setPassword function to update it
  
    // Function to handle login button click
    const handleLogin = () => {
      // Here you can perform your login validation logic
      console.log("Username:", username); // Log the username to the console
      console.log("Password:", password); // Log the password to the console
    };

    const handleClose = () => {
        setIsOpen(false)
        if(router.pathname !== '/'){
            router.push('/')
        }
    }

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
            <div className="bg-white p-5 rounded-lg">
                <h2 className="text-lg font-bold">Login</h2>
                <form>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                        <input type="text" id="username" name="username" className="mt-1 p-2 w-full border rounded-md" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input type="password" id="password" name="password" className="mt-1 p-2 w-full border rounded-md" />
                    </div>
                    <div className="justify-center rounded-border">
                        <button type="button" onClick={()=> router.push("/register")}>Register</button>
                    </div>
                    <div className="flex justify-end">
                        <button type="button" onClick={handleClose} className="py-2 px-4 bg-red-500 text-white rounded hover:bg-red-700">Close</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginForm