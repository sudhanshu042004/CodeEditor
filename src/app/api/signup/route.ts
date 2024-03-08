import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

const UserSchema = z.object({
  email: z.string().email(),
  name: z.string().optional(),
  password: z.string().min(8),
})
type User = z.infer<typeof UserSchema>
const prisma = new PrismaClient();

//signup
export async function POST(req: NextRequest) {
  const body = await req.json();

  //zod validation
  const { success, data } = UserSchema.safeParse(body) as { success: boolean, data: User };
  if (!success) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 })
  }

  //password hashing
  const password = bcrypt.hashSync(data.password, 10);

  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: password
    }
  })
  //jwt Token
  const JWT_SECRET = process.env.JWT_SECRET;
  if (!JWT_SECRET) {
    return NextResponse.json({ error: "jWT_SECRET is undefined" });
  }
  const jwtToken = jwt.sign({ userId: user.id }, JWT_SECRET);

  return NextResponse.json({ response: "account successfully created", token: jwtToken });
}
