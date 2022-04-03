import Link from "next/link"
import Layout from "../components/layout";
import { getPosts, sortPosts } from "../core/posts";

export default function Index({ posts }) {
  return (
    <Layout posts={posts} name="home">
      {sortPosts(posts).map(post => {
        return (
          <article key={post} className="bg-gray-800 rounded-md text-white mb-3 hover:bg-slate-700 ease-linear duration-150">
            <Link href={`/posts/${post.id}`}>
              <a>
                <div className="flex items-stretch justify-between">
                  <h1 className="py-5 px-10 font-bold">{post.name}</h1>
                  <div className="flex justify-center flex-col">
                    <p className="text-right pr-5">{new Date(post.date * 1000).toLocaleDateString("ja-JP")}</p>
                    <p className="text-right pr-5">{post.tags.join(", ")}</p>
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
