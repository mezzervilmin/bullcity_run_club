import Link from "next/link";
import Image from "next/image";
import { openSans, poppinsHeavy } from "./fonts";

export default function Home() {
  return (
    <div className="mx-4 flex flex-col items-center h-screen lg:w-1/2 lg:mx-auto">
      <div className="my-auto">
        <div
          className={`text-4xl text-center mx-auto w-fit mb-8 whitespace-pre-line ${poppinsHeavy.className}`}
        >
          {`Welcome to \nBull City Run Club`}
        </div>
        <Image src="/logo.png" width={500} height={500} alt="Run Club Logo" />
        <div className={`grid grid-cols-2 gap-4 mt-12 ${openSans.className}`}>
          <Link
            href="/sign-in"
            className="bg-blue-800 hover:bg-blue-950 text-white font-bold py-4 px-4 rounded flex text-center items-center justify-center"
          >
            Log in
          </Link>
          <Link
            href="/sign-up"
            className="bg-blue-800 hover:bg-blue-950 text-white font-bold py-4 px-4 rounded flex text-center items-center justify-center"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
