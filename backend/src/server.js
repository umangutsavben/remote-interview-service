import express from "express";
import { ENV } from "./lib/env.js";



const app = express();

app.get("/",(req,res)=>{
    res.status(200).json({
        msg:"its done bro fjjjrom api"
    })
})

app.listen(ENV.PORT,()=>{
    console.log("server is running o-n port 3000");
})