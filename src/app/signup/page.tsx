"use client"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { toast } from "react-hot-toast"


export default function SugnupPage() {

    const router =  useRouter();

    const [buttonDisable, setButtonDisable] = useState(false);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({
        email: "",
        password: "",
        username: "",
    });

    const onSignup = async () => {
        try {
            setLoading(true);
            console.log(user)
            const response = await axios.post("/api/users/signup", user);
            console.log("signup sucess", response.data);
            router.push("/login");
            
        } catch (error : any) {
            console.log("Signup failed " + error) 
            toast.error(error.message);
        } finally{
            setLoading(false);
        }
    };

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0){
            setButtonDisable(false);
        }else {
            setButtonDisable(true);
        }
    },[user])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{loading ? "Loading" : "Signup"}</h1>
            <hr />
            <label htmlFor="username">username</label>
            <input 
                className="p-2 text-black"
                type="text" 
                id="username" 
                value={user.username} 
                onChange={(e) => {
                    setUser({ ...user, username: e.target.value })
                }}
                placeholder="User Name"
                />
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
                onClick={onSignup}>
                    {buttonDisable ? "No signup" : "sign Up"}
                </button>
            <Link href="/login">Visit login Page</Link>
        </div>
    )
}