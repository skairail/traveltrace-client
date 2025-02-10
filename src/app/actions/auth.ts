"use client";

import { signIn as nextAuthSignIn } from "next-auth/react";

export async function signIn(
  p0: string,
  p1: { redirect: boolean; email: string; password: string },
  formData: FormData
) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { success: false, message: "Email and password are required" };
  }

  const result = await nextAuthSignIn("credentials", {
    redirect: false,
    email,
    password,
  });

  if (result?.error) {
    return { success: false, message: result.error };
  }

  return { success: true };
}

export async function signUp(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const name = formData.get("name") as string;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, name }),
  });

  if (!res.ok) {
    return { success: false, message: "Registration failed" };
  }

  const data = await res.json();
  return { success: true, accessToken: data.accessToken };
}
