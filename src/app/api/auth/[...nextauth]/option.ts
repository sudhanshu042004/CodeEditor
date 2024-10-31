import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/app/client";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {

    providers: [
        CredentialsProvider({
            id: "id",
            name: "name",
            credentials: {
                username: { label: "Username", type: "text ", placeholder: "jsmith" },
                "2fa-key": { label: "2FA Key" },
            },
            async authorize(credentials: any): Promise<any> {
                try {
                    const user = await prisma.user.findUnique({
                        where: {
                            email: credentials.identifier,
                        }
                    })
                    if (!user) {
                        throw new Error("No user Found with this email")
                    }
                    const isPasswordCorrect = await bcrypt.compare(credentials.passowrd, user.password)
                    if(!isPasswordCorrect){
                        throw new Error ("Invalid Password");
                    } else {
                        return user
                    }

                } catch (error) {
                    throw new Error
                }
            }

        }),

        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        })
    ],
    pages : {
        
    }

}