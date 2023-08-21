import { Connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"

Connect();

export async function POST(request : NextRequest){
    try {

        const reqBody = await request.json()
        const {email, password} = reqBody
        console.log(reqBody);

        //check if user exist
        const user = await User.findOne({email});
        if(!user){
            return NextResponse.json({error: "user not found"}, {status : 400});
        }
        
        //check password
        const validPassword = await bcryptjs.compare(password, user.password);
        if(!validPassword){
            return NextResponse.json({error: "Wrong Password"}, {status : 400});
        }

        const tokenData = {
            id : user._id,
            username : user.username,
            email : user.email,
        }

        //create token
        const token = await jwt.sign(tokenData, process.env.TOKEN!, {expiresIn: "1h"});

        const response = NextResponse.json({
            message : "Login Sucesfull",
            sucess : true
        });

        response.cookies.set("token", token, {
            httpOnly: true,
        });

        return response;

    } catch (error: any) {
        return NextResponse.json(
            {error : error.massage},
            {status : 500}
        )
    }
}

