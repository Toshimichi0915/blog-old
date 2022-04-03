export let data = {}

export default async function handler(req, res) {
  Object.keys(data).forEach(it => {
    if (data[it].expiredAt < new Date()) {
      delete data[it]
    }
  })

  const { id } = req.query
  if (req.method === "POST") {
    data[id] = {
      src: req.body,
      expiredAt: new Date(new Date().getTime() + 30 * 60000),
    }

    res.status(204).end()
  } else {
    const { id } = req.query
    if (typeof data[id] === 'object') {
      res.status(200).json(data[id])
    } else {
      res.status(404).json({ error: "data was not found" })
    }
  }
}
