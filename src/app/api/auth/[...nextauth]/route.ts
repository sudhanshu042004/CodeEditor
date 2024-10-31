import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github"
import  CredentialsProvider  from "next-auth/providers/credentials";


export const authOptions:NextAuthOptions = {

    providers : [
        CredentialsProvider({
            id : "id",
            name : "name",
            credentials: {
                username: { label: "Username", type: "text ", placeholder: "jsmith" },
                "2fa-key": { label: "2FA Key" },
              },
              async authorize(credentials :any):Promise<any> {
                

              }

        }),

        GithubProvider({
            clientId : process.env.GITHUB_ID as string,
            clientSecret : process.env.GITHUB_SECRET as string,
        })
    ]

}