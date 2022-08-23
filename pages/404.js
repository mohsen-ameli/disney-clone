import Link from "next/link";

const NotFound = () => {
  return (
    <div className="w-full h-[40rem] flex flex-col justify-center">
      <div className="max-w-[800px] mx-auto text-center">
        <h1 className="text-5xl">The page you were looking for cannot be found.</h1>
        <h2 className="my-8">Please go to the Disney+ home page by clicking the button below.</h2>
        <Link href="/">
          <span className="cursor-pointer uppercase bg-blue-700 py-1 rounded-md hover:bg-blue-600 hover:ease-in-out duration-150">
            Disney+ Home
          </span>
        </Link>
      </div>
    </div>
  );
}
 
export default NotFound;