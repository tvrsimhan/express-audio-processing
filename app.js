import express from "express"
import { client } from "@gradio/client"

import { createRequire } from "module"
const require = createRequire(import.meta.url)
let fileupload = require("express-fileupload")

const app = express()
const PORT = process.env.PORT || 3003
const SPACE_ENDPOINT = "https://tvrsimhan-yamnetapi.hf.space/"

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(fileupload())

app.get("/", (_, res) => {
	let origin = req.headers.origin
	if (origin !== undefined) {
		res.setHeader("Access-Control-Allow-Origin", origin)
	}
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, PUT, DELETE",
		"OPTIONS"
	)
	res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization")
	res.setHeader("Access-Control-Allow-Credentials", true)
	res.setHeader("Vary", "Origin")
	res.status(200).send("API Online!")
})

app.post("/upload", async (req, res) => {

	let origin = req.headers.origin
	if (origin !== undefined) {
		res.setHeader("Access-Control-Allow-Origin", origin)
	}
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, PUT, DELETE",
		"OPTIONS"
	)
	res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization")
	res.setHeader("Access-Control-Allow-Credentials", true)
	res.setHeader("Vary", "Origin")

	if (req.files === null) {
		return res.status(400).json({ msg: "No file uploaded" })
	}

	const file = req.files.audio
	let blob = file.data
	let data = await predict(blob)

	res.status(200).json({ data })
})

async function predict(blob) {
	const audio = new Blob([blob], { type: "audio/wav" })

	const app = await client(SPACE_ENDPOINT)
	const result = await app.predict("/predict", [audio])

	return result?.data
}

app.get("*", cors, (_, res) => {
	res.sendStatus(404)
})
