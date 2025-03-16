"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { signIn } from "next-auth/react";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { Alert, AlertDescription } from "@/shared/ui/alert";

type result = {
  success: boolean;
  message: string;
};

export default function SignInForm() {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const result = await signIn("credentials", {
      redirect: true,
      email: formData.get("email"),
      password: formData.get("password"),
    });
  }

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <Card className="w-full sm:w-96">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-gray-800">
            Sign In
          </CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6 pt-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                placeholder="Enter your email"
                className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                placeholder="Enter your password"
                className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {error && (
              <Alert variant="destructive" className="text-center">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button
              type="submit"
              className="w-full hover:bg-blue-700 text-white"
            >
              Sign In
            </Button>
            <p className="text-sm text-center text-gray-600">
              Don't have an account?{" "}
              <Link href="/signup" className="text-blue-600 hover:underline">
                Sign up
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
