export default function Home() {
  return (
    <div className="h-screen px-24">
      {/* <LoginCard /> */}
      {/* <Calendar /> */}
      <nav className="h-16 items-center flex justify-between">
        <span>Fake</span>
        <span>Nav Home About Logout</span>
      </nav>
      <div className="h-[500px] flex ">
        <main className="bg-slate-50000 w-1/2 flex flex-col justify-center">
          <h1 className="text-8xl font-bold mb-4 leading-[.8]">
            <span>UNI</span> <span className="text-6xl">IS</span>
            <div className="-mt-7 -mb-2">{"-------"}</div>
            <span className="text-red-500">HARD</span>
          </h1>
          <p>Never forget your quizes</p>
          <p>Never forget your deadlines</p>
        </main>
        <section className="w-1/2 bg-gray-600"></section>
      </div>
    </div>
  );
}
