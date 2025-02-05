import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import logo from "/logo.svg";

export default function Home() {
  return (
    <div className="h-screen px-24 w-full">
      <nav className="h-16 items-center flex justify-between"></nav>
      <div className="h-[500px] flex flex-col md:flex-row">
        <main className="md:w-1/2 flex flex-col justify-center space-y-4">
          <h1 className="text-8xl font-bold mb-4 leading-[.8]">
            <img src={logo} alt="Logo" className="w-48 md:w-96" />
          </h1>
          <section className="md:hidden block w-full md:w-1/2 h-48 md:h-96 bg-gray-600"></section>
          {/* <p>Never forget your quizes</p>
          <p>Never forget your deadlines</p> */}
          <div>
            <p className="text-base md:text-lg">Stay Organized, Stress Less</p>
            <p className="text-base md:text-lg">Your Worries, Sorted</p>
          </div>
          <div className="py-4 flex flex-col-reverse gap-4">
            <Button variant={"outline"} className="w-48">
              <Link to={"/login"}>Already have an account</Link>
            </Button>
            <Button variant={"default"} className="w-48">
              {" "}
              <Link to={"/signup"}>Start Organizing Today</Link>
            </Button>
          </div>
        </main>
        <section className="hidden md:block w-full ml-8 lg:ml-0 md:w-1/2 h-96 bg-gray-600"></section>
      </div>
    </div>
  );
}
