import type { Metadata } from "next";
import {
  ClerkProvider,
  SignInButton,
  SignUp,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          {/* <header className="flex justify-end items-center p-4 gap-4 h-16"> */}
          {/* conditional rendering if signed out then show sighinbutton similar shown below */}
          <section className="min-h-screen w-screen flex  justify-center items-center">
            <SignedOut>
              {/* <SignInButton />
            <SignUpButton /> */}
              <SignUp />
            </SignedOut>
          <SignedIn>
            {/* <UserButton /> */}
            {children}
            {/* <span>
              You are signed in
            </span> */}
          </SignedIn>
          </section>
          {/* </header> */}
        </body>
      </html>
    </ClerkProvider>
  );
}
