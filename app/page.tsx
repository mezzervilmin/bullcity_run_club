import Link from "next/link";

export const Home = () => {
  return (
    <div>
      <div className="text-4xl mx-auto w-fit">Welcome to Run Club</div>
      <div className="flex mx-4 lg:mx-auto lg:w-1/2 gap-4">
        <Link
          href="/sign-in"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-1/2 text-center"
        >
          <button>Returning Member</button>
        </Link>
        <Link
          href="/sign-up"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-1/2 text-center"
        >
          <button>New Member</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
