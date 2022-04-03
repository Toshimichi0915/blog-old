import Navbar from "./navbar";
import TagList from "./taglist";

export default function Layout({ posts, name, children }) {
  return (
    <div className="overflow-hidden">
      <Navbar name={name} />
      <div className="flex flex-col-reverse md:flex-row gap-10 m-5">
        <nav className="w-full md:w-1/5">
          <TagList posts={posts} />
        </nav>
        <main className="w-full md:w-4/5 lg:w-3/5">
          {children}
        </main>
      </div>
    </div>
  )
}
