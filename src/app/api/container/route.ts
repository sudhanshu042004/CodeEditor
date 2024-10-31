import { NextRequest, NextResponse } from "next/server";
import Docker from "dockerode";
import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";
import { prisma } from "@/app/client";


const containerOptions = {
  Image: 'node:latest',
  Cmd: ['/bin/bash'],
  AttachStdin: true,
  AttachStdout: true,
  AttachStderr: true,
  Tty: true, // Allocate a pseudo-TTY
  OpenStdin: true,
  HostConfig: {
    PortBindings: {
      '3000/tcp': [{ HostPort: '3000' }]
    }
  }
};

export async function POST(req: NextRequest) {
  const docker = new Docker();
  const Cookie = cookies().get("Authorization");
  const JWT_SECRET = process.env.JWT_SECRET;
  let containerId;

  const token = Cookie?.value.split(" ")[1];
  if (token == undefined || JWT_SECRET == undefined) {
    return console.log("token or secret is undefined");
  }

  const VerifiedToken = jwt.verify(token, JWT_SECRET) as JwtPayload;
  console.log(VerifiedToken.userId);
  const userId = VerifiedToken.userId

  try {
    const container = await docker.createContainer(containerOptions);
    containerId = container.id;
  } catch (e) {
    console.log(`Error while creating container : ${e}`);
  }

  const project = await prisma.projects.create({
    data: {
      filename: "javascript",
      content: containerId as string,
      authorId: userId,
    }
  })
  console.log(project);

  return NextResponse.json({
    project
  })

}
