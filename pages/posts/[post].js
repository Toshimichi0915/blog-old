import ReactMarkdown from 'react-markdown'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import Layout from "../../components/layout"
import { getPost, getPosts } from "../../core/posts"
import style from "../../styles/post.module.scss"

export default function Post({ posts, post, contents }) {

  return (
    <Layout posts={posts}>
      <div className={style.post}>
        <ReactMarkdown remarkPlugins={[
          remarkGfm,
          remarkParse,
          remarkRehype
        ]}>
          {contents}
        </ReactMarkdown>
      </div>
    </Layout>
  )
}

export async function getStaticProps({ params }) {

  let contents

  try {
    contents = await getPost(params.post)
  } catch {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      posts: await getPosts(),
      post: params.post,
      contents,
    },
    revalidate: 300,
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
