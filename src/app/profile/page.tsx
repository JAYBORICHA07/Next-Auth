"use client"
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

export default function ProfilePage(){

    const router = useRouter()

    const logOut = async () => {

        try{
            await axios.get("/api/users/logout")
            toast.success("logged out")
            router.push('/login')
        }catch(error : any){
            console.log("error logging out user", error.message)
        }
    }

    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>
                Profile
            </h1>
            <hr />
            <p>Profile page</p>
            <hr />
            <button className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={logOut}>Logout</button>
        </div>
    )
}