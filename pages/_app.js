import Head from "next/head"
import "../styles/global.scss"

export default function Blog({ Component, pageProps }) {

  let post
  if (typeof pageProps["posts"] === "object" && typeof pageProps["post"] === "string") {
    post = pageProps["posts"][pageProps["post"]].name
  }

  return (
    <>
      <Head>
        <title>Toshimichi blog {post}</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}
