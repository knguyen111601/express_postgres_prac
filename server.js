// Import dependencies
const express = require("express")
const cors = require("cors")
// Create app
const app = express()

// MiddleWare
app.use(cors()) // prevent cors errors, opens up access for frontend
app.use(express.json()) // access to request.body (parse json bodies)

// Setup App Listener
app.listen(3000, ()=> {
    console.log("Server is listening on PORT 3000")
})