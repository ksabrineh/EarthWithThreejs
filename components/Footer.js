import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <div className="w-full bg-black h-10 text-white flex gap-1 justify-center items-center text-xs">
      Made with <span className="text-red-500 !text-base">&hearts;</span>By
      <Link href="https://github.com/ksabrineh">Sabrineh</Link>
    </div>
  );
}

export default Footer;
