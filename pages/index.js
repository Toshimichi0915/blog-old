import Navbar from "./components/navbar";
import Link from "next/link"
import Image from "next/image";
import Layout from "./components/layout";
import { getPosts } from "../core/posts";

export default function Index({ posts }) {
  return (
    <Layout posts={posts}>
      {Object.keys(posts).map(post => {
        return (
          <article key={post} id={post} className="bg-gray-800 rounded-md text-white">
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
                <p className="text-right pr-5">{new Date(parseInt(posts[post].date) * 1000).toDateString()}</p>
                <p className="text-right pr-5 pb-5">{posts[post].tags.join(", ")}</p>
              </a>
            </Link>
          </article>
        )
      })}
    </Layout>
  )
}

export const getStaticProps = getPosts
