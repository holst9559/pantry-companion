"use client";

import Image from "next/image";
import googleLogo from "../../public/google.png";
import { signOut } from "next-auth/react";

export function SignOutButton() {
  const handleClick = () => {
    signOut("google");
  };

  return (
    <button
      onClick={handleClick}
      className="w-full flex items-center font-semibold justify-center h-14 px-6 mt-4 text-xl  transition-colors duration-300 bg-white border-2 border-black text-black rounded-lg focus:shadow-outline hover:bg-slate-200">
      <Image src={googleLogo} alt="Google Logo" width={20} height={20} />
      <span className="ml-4">Logout</span>
    </button>
  );
}
