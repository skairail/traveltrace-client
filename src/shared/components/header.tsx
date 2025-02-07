import React from "react";
import { cn } from "../lib/utils";
import { Container } from "./container";
import Image from "next/image";
import { Button } from "../ui/button";
import { User } from "lucide-react";

interface Props {
  className?: string;
}

export const Header: React.FC<Props> = ({ className }) => {
  return (
    <header className={cn("border border-b", className)}>
      <Container className="flex items-center justify-between py-8">
        {/* Logo */}
        <div className="flex items-center  gap-4">
          <Image src="/logo.png" alt="logo" width={40} height={40} />
          <div>
            <h1 className="text-2xl uppercase font-black">TravelTrace</h1>
          </div>
        </div>
        {/* Navigation */}
        {/* Login */}
        <div className="flex items-center gap-4">
          <Button variant="outline">
            <User size={16} />
            Login
          </Button>
        </div>
      </Container>
    </header>
  );
};
