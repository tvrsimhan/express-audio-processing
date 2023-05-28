import express from "express"
import { client } from "@gradio/client"

import { createRequire } from "module"
const require = createRequire(import.meta.url)
let fileupload = require("express-fileupload")

import { cors } from "./middleware.js"

const app = express()
const PORT = process.env.PORT || 3003
const SPACE_ENDPOINT = "https://tvrsimhan-yamnetapi.hf.space/"

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(fileupload())

app.get("/", cors, (_, res) => {
	res.status(200).send("API Online!")
})

app.post("/upload", cors, async (req, res) => {

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
