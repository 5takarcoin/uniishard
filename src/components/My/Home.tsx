import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import logo from "/logo.svg";

export default function Home() {
  return (
    <div className="h-screen px-24 w-full">
      <nav className="h-16 items-center flex justify-between"></nav>
      <div className="h-[500px] flex flex-col md:flex-row">
        <main className="bg-slate-50000 w-1/2 flex flex-col justify-center">
          <h1 className="text-8xl font-bold mb-4 leading-[.8]">
            <img src={logo} alt="Logo" className="w-96" />
          </h1>
          <p>Never forget your quizes</p>
          <p>Never forget your deadlines</p>
          <div className="py-4 flex gap-4">
            <Button variant={"default"}>
              <Link to={"/login"}>Login</Link>
            </Button>
            <Button variant={"outline"}>
              {" "}
              <Link to={"/signup"}>Signup</Link>
            </Button>
          </div>
        </main>
        <section className="w-full md:w-1/2 h-96 bg-gray-600"></section>
      </div>
    </div>
  );
}
