import express from "express"
import { client } from "@gradio/client"

import { createRequire } from "module"
const require = createRequire(import.meta.url)
let fileupload = require("express-fileupload")

import { cors } from "./middleware.js"

