import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { z } from "zod"
import { compareSync } from "bcrypt"
import { cookies } from "next/headers";


const prisma = new PrismaClient();
const UserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

type User = z.infer<typeof UserSchema>

//authenticate user
export async function POST(req: NextRequest) {
  const body = await req.json();
  const cookiesStore = cookies();
  //zod
  const { success, data } = UserSchema.safeParse(body) as { success: boolean; data: User };
  if (!success) {
    return NextResponse.json({ error: "invalid input" }, { status: 400 })
  }

  const user = await prisma.user.findUnique({
    where: {
      email: data.email
    }
  })

  if (!user) {
    return NextResponse.json({ error: "there is no account found" }, { status: 404 })
  }
  const password = compareSync(data.password, user.password)

  if (!password) {
    return NextResponse.json({ error: "invalid password" }, { status: 401 })
  }

  // JWT token 
  const JWT_SECRET = process.env.JWT_SECRET;
  if (!JWT_SECRET) {
    return NextResponse.json({ error: "JWT_SECRET is undefined" })
  }
  const jwtToken = "Bearer " + jwt.sign({ userId: user.id }, JWT_SECRET);
  cookiesStore.set('Authentication', jwtToken);
  return NextResponse.json({ response: "account login" });
}
