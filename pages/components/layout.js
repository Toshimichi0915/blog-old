import Navbar from "./navbar";
import TagList from "./taglist";

export default function Layout({ posts, children }) {
  return (
    <div className="overflow-hidden">
      <Navbar name="home" />
      <div className="flex flex-col-reverse md:flex-row gap-10 m-5">
        <div className="w-full md:w-1/5">
          <TagList posts={posts} />
        </div>
        <div className="w-full md:w-3/5 lg:w-2/5">
          {children}
        </div>
      </div>
    </div>
  )
}
