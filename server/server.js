import express from "express";
import * as dotenv from 'dotenv';
import cors from 'cors';
import { Configuration, OpenAIApi } from "openai";

dotenv.config();

const configuration = new Configuration({
    apiKey: process.env.OPENAPI_KEY,
})

const openai = new OpenAIApi(configuration);

const app = express()
//connect with fn
app.use((cors()))
//send json from fn to bn
app.use(express.json())

app.get('/',async(req,res)=>{
    res.status(200).send({
        message: "Hi fron Arth",
    })
})

app.post('/',async(req,res)=>{
    try {
        const prompt = req.body.prompt;

        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `${prompt}`,
            temperature: 0,
            max_tokens: 64,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0,
          });
          console.log("OUTPUT:", response.data);
          res.status(200).send({
            bot: response.data.choices[0].text
          })
    } catch (err) {
        console.log(err);
        res.status(500).send({err});        
    }
})
//make it always running

app.listen(5000, ()=> console.log('Server is running on port 5000'))