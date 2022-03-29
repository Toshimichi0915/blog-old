export async function getPosts() {

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
