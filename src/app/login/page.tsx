"use client"
import Link from "next/link"
import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import axios, { Axios } from "axios"
import { toast } from "react-hot-toast"


export default function LoginPage() {

    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [buttonDisable, setButtonDisable] = useState(false);
    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const onLogin = async () => {
        try {
            setLoading(true)
            const response = await axios.post("/api/users/login", user);
            console.log(response.data);
            toast.success("login sucess");
            router.push("/profile");

        } catch (error : any) {
            console.log("login failed", error.message);
            toast.error(error.message);
        } finally{
            setLoading(false);
        }

    };

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0){
            setButtonDisable(false);
        }else {
            setButtonDisable(true);
        }
    },[user])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{loading ? "Loading" : "login"}</h1>
            <hr />
            <label htmlFor="email">email</label>
            <input 
                className="p-2 text-black"
                type="text" 
                id="email" 
                value={user.email} 
                onChange={(e) => {
                    setUser({ ...user, email: e.target.value })
                }}
                placeholder="email"
                />
            <label htmlFor="password">password</label>
            <input 
                className="p-2 text-black"
                type="password" 
                id="password" 
                value={user.password} 
                onChange={(e) => {
                    setUser({ ...user, password: e.target.value })
                }}
                placeholder="password"
                />
            <button 
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                onClick={onLogin}>
               {buttonDisable ? "No Login" : "Login"}
            </button>
            <Link href="/signup">Visit Signup Page</Link>
        </div>
    )
}