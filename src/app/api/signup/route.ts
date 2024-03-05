import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcrypt"

const UserSchema = z.object({
    email : z.string().email(),
    name  : z.string().optional(),
    password : z.string().min(8),
})

const prisma = new PrismaClient();

//signup
export async function POST (req : NextRequest) {
    const body = await req.json();

    //zod validation
    const { success } = UserSchema.safeParse(body);
    if (!success){
        return NextResponse.json({ error: 'Invalid input' }, { status: 400 })
    }

    //password hashing
    const password = bcrypt.hashSync(body.password,10);

    const user = await prisma.user.create({
        data : {
            name : body.name,
            email : body.email,
            password : password
        }
    })
    return NextResponse.json({response : "account successfully created"});
}