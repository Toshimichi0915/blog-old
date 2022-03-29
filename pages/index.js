import Navbar from "./components/navbar";

export default function Index({ posts }) {
  return (
    <>
      <Navbar name="home" />
      <h1>Hello, world!</h1>
      {Object.keys(posts).map(it => {
        return (
          <p key={it}>{posts[it].name + " " + posts[it].contents}</p>
        )
      })}
    </>
  )
}

export async function getStaticProps() {

  const baseUrl = "https://raw.githubusercontent.com/Toshimichi0915/blog-markdown/master/"
  const response = await fetch(baseUrl + "index.json")

  if (!response.ok) {
    throw new Error(`Could not fetch posts. Status: ${response.status} ${response.statusText}`)
  }

  const json = await response.json()
  const posts = {}
  await Promise.all(Object.keys(json).map(async it => {
    const response = await fetch(baseUrl + it + ".md")
    const text = await response.text()

    if (!response.ok) {
      throw new Error(`Could not fetch post ${it}. Status: ${response.status} ${response.statusText}`)
    }

    posts[it] = {
      contents: text,
      name: json[it].name,
      tags: json[it].tags
    }
  }))

  return {
    props: {
      posts: posts,
    }
  }
}