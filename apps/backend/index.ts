import Express  from "express";
import {UserModel} from "db/client";
import { SignUpSchema } from "common/types";
import mongoose, { mongo } from "mongoose";


mongoose.connect(process.env.MONGO_URI!);

const app = Express();

app.post("/signup", (req, res) => {
    UserModel.create({
        
    })
})

app.post("/signin", (req, res) => {})

app.post("/workflow", (req, res) => {})

app.put("/workflow", (req, res) => {})

app.get("/workflow/:workflowId", (req, res) => {})

// to get all the executions of a workflow in a day
app.get("//workflow/executions/:workflowId", (req, res) => {})

app.post("/credentials", (req, res) => {})

app.get("/credentials", (req, res) => {})

app.get("/nodes", (req,res)=>{})

app.listen(process.env.PORT || 3000)
