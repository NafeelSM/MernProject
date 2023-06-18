import express from "express"; 
// Express is a server-side application framework
// Make HTTP req&res 
import cors from "cors";
//cors is a browser security feature in HTTP request
import connectToMongo from "./config/db.js";
import empRoutes from "./routes/emp.js"
const app = express();
const PORT = process.env.PORT || 7000;
connectToMongo();

//middleware
//Used to software containing function and access both req,res objects...
app.use(express.json());

//cors
app.use(cors());

app.get("/", (req,res) => {
    res.send("Api is running")
});

//routs
//URL path and handle the function
app.use("/api/v1", empRoutes)

app.listen(PORT , () => {
    console.log(`Api is running on http://localhost:${PORT}`);
});