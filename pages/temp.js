import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"
import Layout from "../components/layout"
import { getPosts } from "../core/posts"

function newId() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < 5; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  return result
}

export default function Temp({ posts }) {
  const [url, setUrl] = useState()
  const [body, setBody] = useState()
  const [src, setSrc] = useState()

  const router = useRouter()
  const { q } = router.query

  if (typeof src === "string") {
    return (
      <iframe
        style={{ width: "100vw", height: "100vh", overflowY: "scroll", border: "0" }}
        src={`data:text/html;charset=UTF-8,${encodeURIComponent(src)}`}
      />
    )
  }

  if (typeof q === "string") {
    fetch(`/api/temp/${q}`, {})
      .then(it => {
        if (it.ok) {
          return it.json()
        } else {
          throw new Error(it.statusText)
        }
      })
      .then(it => setSrc(it.src))
      .catch(() => { /* Show default page */ })
  }

  return (
    <Layout posts={posts} name="temp">
      <h1 className="text-2xl">単一のHTMLを表示するリンクを作成する</h1>
      <p>30分でURLの期限が切れます。また大量にリクエスト等を送りつけられた場合、制限が厳しくなる場合があるのでご了承ください。</p>
      <textarea className="border-gray-400 border-2 w-full h-52 rounded-sm" value={body} onInput={it => setBody(it.target.value)} />
      <button
        className="w-32 h-10 block text-white bg-slate-900 hover:bg-slate-700 duration-300 rounded-md"
        onClick={e => {
          e.preventDefault()
          const id = newId()

          // default expiration duration: 30 minutes
          fetch(`/api/temp/${id}`, {
            method: "POST",
            body,
          })

          setUrl(`/temp?q=${id}`)
        }}>Generate</button>
      {typeof url === 'string' ? (
        <Link href={url} prefetch={false}><a>{url}</a></Link>
      ) : <></>}
    </Layout>
  )
}

export async function getStaticProps() {
  return {
    props: { posts: await getPosts() },
    revalidate: 300,
  }
}
