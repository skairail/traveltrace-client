"use client";
import React from "react";
import { cn } from "../lib/utils";
import { Container } from "./Container";
import Image from "next/image";
import { Button } from "../ui/button";
import { User } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Search from "./Search";

interface Props {
  className?: string;
}

export const Header: React.FC<Props> = ({ className }) => {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  return (
    <header className={cn("border border-b", className)}>
      <Container className="flex items-center justify-between py-8  ">
        <Link href="/" className="flex items-center gap-4 cursor-pointer">
          <Image src="/logo.png" alt="logo" width={40} height={40} />

          <div>
            <h1 className="text-2xl uppercase font-black">TravelTrace</h1>
            <p className="text-sm text-black leading-3">go touch some grass</p>
          </div>
        </Link>
        <Search></Search>

        <div className="flex items-center gap-4">
          {userId ? (
            <Link href="/profile" passHref>
              <Button variant="outline">
                <User size={16} />
                Profile
              </Button>
            </Link>
          ) : (
            <Link href="/login" passHref>
              <Button variant="outline">
                <User size={16} />
                Login
              </Button>
            </Link>
          )}
        </div>
      </Container>
    </header>
  );
};
