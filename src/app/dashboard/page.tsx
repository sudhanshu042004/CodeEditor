import { cookies } from 'next/headers'
import { redirect } from 'next/navigation';
import React from 'react'
import jwt, { JwtPayload } from "jsonwebtoken";
import { prisma } from "../client";
import EmptyProjects from '../components/EmptyProjects';

const dashboard = async () => {
  const cookiesStore = cookies();
  const cookie = cookiesStore.get('Authorization');
  if (!cookie) {
    return redirect("/login");
  }
  const token = cookie.value.split(" ")[1];
  const jwtSecret = process.env.JWT_SECRET;
  if (jwtSecret === undefined) {
    return console.log("jwt secret is undefined")
  }
  //check token
  let tokenVerified;
  try {
    tokenVerified = jwt.verify(token, jwtSecret) as JwtPayload;
  } catch (e) {
    console.log(e);
    return redirect("/login");
  }

  const getUser = await prisma.user.findUnique({
    where: {
      id: tokenVerified.userId,
    },
    select: {
      name: true,
      email: true,
      projects: true
    },
  })
  return (
    <div className='bg-black h-screen p-4'>
      <div className='flex justify-between text-white font-semibold p-4 bg-zinc-900'>
        <div>Code Hub</div>
        <div>{getUser?.name}</div>
      </div>
      <EmptyProjects />
    </div>
  )
}

export default dashboard
