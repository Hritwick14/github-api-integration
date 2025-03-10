const express = require("express")
const app = express()

const port = process.env.port || 3000; //no env declared yet

app.use(express.json())

app.get("/", (req,res)=>{
    res.send("Hello from Server")
})

const githubRoute = require('./routes/githubRoutes');
app.use("/github",githubRoute);

app.listen(port, () => {
    console.log("Server is running on " + port);
});