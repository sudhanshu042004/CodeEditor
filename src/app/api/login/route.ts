import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { z } from "zod"
import { compareSync } from "bcrypt"


const prisma = new PrismaClient();
const UserSchema = z.object({
    email: z.string().email(),
    name: z.string().optional(),
    password: z.string().min(8),
})

//authenticate user
export async function POST(req: NextRequest) {
    const body = await req.json();

    //zod
    const { success } = UserSchema.safeParse(body);
    if (!success) {
        return NextResponse.json({ error: "invalid input" }, { status: 400 })
    }

    const user = await prisma.user.findUnique({
        where: {
            email: body.email
        }
    })

    const password = compareSync(body.password, user.password)
    if (!password) {
        return NextResponse.json({ error: "invalid password" }, { status: 401 })
    }

    return NextResponse.json({ response: "account login" });
}