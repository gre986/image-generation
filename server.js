const PORT = 8000
const express = require('express')
const cors = require('cors')


const app = express()

app.use(cors())
//using the method of json on it, we can actually working with json where we are sending jason from the front of our project to the back end of our project.
app.use(express.json())
// allow us to create .env files to store our variables secretly, we are going to store our openai api key
require('dotenv').config()


const{ Configuration, OpenAIApi} = require("openai")

const configuration = new Configuration({
    apiKey: process.env.API_KEY,
})
const openai= new OpenAIApi(configuration)

app.post('/images',async (req,res)=>{
    try {
        // await allow us to wait until the promise has completed before moving on to the next line.
        const response = await openai.createImage({
            prompt: req.body.message,
            n: 1,
            size: "256x256",
        })
        console.log(response.data.data)
        res.send(response.data.data)
    } catch (error) {
        console.error(error)
    }

    

})
// nodemon listen out for constant changes on our back end.
app.listen(PORT,() => console.log('Your server is running on port '+ PORT))