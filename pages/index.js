import Navbar from "./components/navbar";
import Link from "next/link"
import Image from "next/image";

export default function Index({ posts }) {
  return (
    <>
      <Navbar name="home" />
      {Object.keys(posts).map(post => {
        return (
          <article key={post} id={post} className="w-4/5 md:w-3/5 lg:w-2/5 mx-auto my-5 bg-gray-800 rounded-md text-white">
            <Link href={`https://raw.githubusercontent.com/Toshimichi0915/blog-markdown/master/pages/${post}/contents.md`}>
              <a>
                <div className="rounded-md overflow-hidden">
                  <Image
                    src={`https://raw.githubusercontent.com/Toshimichi0915/blog-markdown/master/pages/${post}/thumbnail.png`}
                    width="1280px"
                    height="720px"
                    alt="thumbnail" />
                </div>

                <h1 className="pt-5 px-10 font-bold">{posts[post].name}</h1>
                <p className="text-right pr-5 pb-5">タグ: {posts[post].tags.join(", ")}</p>
              </a>
            </Link>
          </article>
        )
      })}
    </>
  )
}

export async function getStaticProps() {

  const url = "https://raw.githubusercontent.com/Toshimichi0915/blog-markdown/master/index.json"
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Could not fetch posts. Status: ${response.status} ${response.statusText}`)
  }

  const posts = await response.json()
  return {
    props: { posts }
  }
}