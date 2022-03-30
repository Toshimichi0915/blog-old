import Link from "next/link"
import Image from "next/image";
import Layout from "./components/layout";
import { getPosts } from "../core/posts";

export default function Index({ posts }) {
  return (
    <Layout posts={posts}>
      {Object.keys(posts).map(post => {
        return (
          <article key={post} id={post} className="bg-gray-800 rounded-md text-white hover:bg-slate-700 ease-linear duration-150">
            <Link href={`/posts/${post}`}>
              <a>
                <div className="flex items-stretch justify-between">
                  <h1 className="py-5 px-10 font-bold">{posts[post].name}</h1>
                  <div className="flex justify-center flex-col">
                    <p className="text-right pr-5">{new Date(parseInt(posts[post].date) * 1000).toDateString()}</p>
                    <p className="text-right pr-5">{posts[post].tags.join(", ")}</p>
                  </div>
                </div>
              </a>
            </Link>
          </article>
        )
      })}
    </Layout>
  )
}

export async function getStaticProps() {
  return {
    props: { posts: await getPosts() },
    revalidate: 300,
  }
}
