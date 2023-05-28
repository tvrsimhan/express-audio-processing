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

