const baseUrl = 'https://raw.githubusercontent.com/Toshimichi0915/blog-markdown/master'

export async function getPosts() {

  const url = `${baseUrl}/index.json`
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Could not fetch posts. Status: ${response.status} ${response.statusText}`)
  }

  return await response.json()
}

export function sortPosts(posts) {
  return Object.entries(posts)
    .map(array => ({
      id: array[0],
      ...array[1],
    }))
    .sort((a, b) => b.date - a.date)
}

export async function getPost(name) {
  const url = `${baseUrl}/pages/${name}/contents.md`
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Could not fetch post ${name}. Status: ${response.status} ${response.statusText}`)
  }

  return await response.text()
}
