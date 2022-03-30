const baseUrl = 'https://raw.githubusercontent.com/Toshimichi0915/blog-markdown/master'

export async function getPosts() {

  const url = `${baseUrl}/index.json`
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Could not fetch posts. Status: ${response.status} ${response.statusText}`)
  }

  return await response.json()
}

export async function getPost(name) {
  const url = `${baseUrl}/pages/${name}/contents.md`
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Could not fetch post ${name}. Status: ${response.status} ${response.statusText}`)
  }

  return await response.text()
}
