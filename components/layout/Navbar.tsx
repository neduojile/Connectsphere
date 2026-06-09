export default function Navbar() {
  return (
    <nav className="fixed top-0 z-50 w-full border-b border-zinc-800 bg-black/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <h1 className="text-xl font-bold text-white">
          ConnectSphere
        </h1>

        <div className="hidden items-center gap-8 text-sm text-zinc-400 md:flex">
          <a href="#" className="transition hover:text-white">
            Features
          </a>

          <a href="#" className="transition hover:text-white">
            Communities
          </a>

          <a href="#" className="transition hover:text-white">
            Mentors
          </a>

          <a href="#" className="transition hover:text-white">
            Projects
          </a>
        </div>

        <button className="rounded-lg bg-orange-500 px-4 py-2 font-medium text-black transition hover:bg-orange-400">
          Sign In
        </button>
      </div>
    </nav>
  );
}