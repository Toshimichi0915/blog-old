import ReactMarkdown from 'react-markdown'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import Layout from "../components/layout"
import { getPost, getPosts } from "../../core/posts"
import style from "../../styles/post.module.scss"

export default function Post({ posts, post }) {

  return (
    <Layout posts={posts}>
      <div className={style.post}>
        <ReactMarkdown remarkPlugins={[
          remarkGfm,
          remarkParse,
          remarkRehype
        ]}>
          {post}
        </ReactMarkdown>
      </div>
    </Layout>
  )
}

export async function getStaticProps({ params }) {

  let post

  try {
    post = await getPost(params.post)
  } catch {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      posts: await getPosts(),
      post: post,
    }
  }
}

export async function getStaticPaths() {

  const posts = await getPosts()
  const paths = Object.keys(posts).map(post => ({
    params: { post }
  }))

  return {
    paths,
    fallback: "blocking"
  };
}