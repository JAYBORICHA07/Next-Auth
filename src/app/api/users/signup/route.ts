import { Connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";



Connect();

export async function POST(request : NextRequest) {
    try {
        const reqBody = await request.json();
        // console.log(reqBody);
        const {username, password, email} = reqBody;
        // console.log({username, password, email});

        //checking for already exesting user
        const user = await User.findOne({email});
        // console.log(user);
        if(user){
            return NextResponse.json(
                {error : "User already Exist"},
                {status : 500}
            )
        }

        //encrypt password
        const salt = await bcryptjs.genSalt(10);
        // console.log(salt);
        // console.log(password);
        const hashedPassword = await bcryptjs.hash(password, salt);
        // console.log(hashedPassword);

        const newUser = new User({
            username,
            email,
            password : hashedPassword,
        })

        // console.log(newUser);
        const savedUser  =await newUser.save();
        console.log(savedUser);

        return NextResponse.json({
            messege : "User created successfully",
            sucess : true,
            savedUser
        });
        
    } catch (error) {
        console.log(error);
    }
}

