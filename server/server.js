import express from "express"

let app = express()

app.use("/", function (req, res) {
    res.send("Welcome to User application")
})

app.listen(3000);
console.log("Server running at http://localhost:3000/")

export default app