import { cookies } from 'next/headers'
import { redirect } from 'next/navigation';
import React from 'react'
import jwt from "jsonwebtoken";

const dashboard = () => {
  const cookiesStore = cookies();
  const cookie = cookiesStore.get('Authorization');
  if (!cookie) {
    return redirect("/login");
  }
  const token = cookie.value.split(" ")[1];
  const jwtSecret = process.env.JWT_SECRET;
  console.log(jwtSecret);
  if (jwtSecret === undefined) {
    return console.log("jwt secret is undefined")
  }
  const tokenVerified = jwt.verify(token, jwtSecret);
  if (!tokenVerified) {
    return redirect("/login");
  }
  return (
    <div>dashboard</div>
  )
}

export default dashboard
