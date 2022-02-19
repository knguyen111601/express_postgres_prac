// Import dependencies
const express = require("express")
const cors = require("cors")

// Database
const pool = require("./db")

// Create app
const app = express()

// MiddleWare
app.use(cors()) // prevent cors errors, opens up access for frontend
app.use(express.json()) // access to request.body (parse json bodies)


// Routes

// CREATE A TODO
app.post("/todos", async (req,res) => {
    try {

        const {description} = req.body // destructures description from the req.body
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *", [description]) // second arg replaces $1 (a dynamic variable from pool library)

        res.json(newTodo.rows[0])

    } catch (err) {
        console.error(err.message)
    }
})

// GET ALL TODOS
app.get("/todos", async (req, res)=> {
    try {
        const allTodos = await pool.query("SELECT * FROM todo")
        res.json(allTodos.rows)
    } catch (err) {
        console.error(err.message)
    }
})

// GET A TODO
app.get("/todos/:id", async (req, res)=> {
    try {
        const { id } = req.params // grab request parameter
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id=$1", [id])
        res.json(todo.rows[0])
    } catch (err) {
        console.error(err.message)
    }
})

// UPDATE A TODO
app.put("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params
        const { description } = req.body

        const updateTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2", [description, id]) // two dynamic variables

        res.json("Todo was updated.")

    } catch (err) {
        console.err(err.message)
    }
})

// DELETE A TODO

app.delete("/todos/:id", async(req, res) => {
    try {
        const { id } = req.params
        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id=$1", [id])
        res.json("Todo was deleted")

    } catch (err) {
        console.error(err.message)
    }
})











// Setup App Listener
app.listen(3000, ()=> {
    console.log("Server is listening on PORT 3000")
})