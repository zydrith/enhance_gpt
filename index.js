// 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
const express = require('express')
const { Configuration, OpenAIApi } = require("openai");
const bodyParser = require('body-parser')
const cors = require('cors')
const configuration = new Configuration({
    organization: "org-xhh4EHbUFktvnQepzd0Z7RHe",
    apiKey: "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"
});
const openai = new OpenAIApi(configuration);


const app = express()
app.use(bodyParser.json())
app.use(cors())

const port = 3080

app.post('/', async (req, res) => {
    const { message, currentModel } = req.body;
    console.log(message, "message")
    console.log(currentModel, "currentModel")
    const response = await openai.createCompletion({
        model: `${currentModel}`,
        prompt: `${message}`,
        max_tokens: 100,
        temperature: 0.5,
      });
    res.json({
        // data: response.data
        message: response.data.choices[0].text,
    })
});

app.get('/models', async (req, res) => {
    const response = await openai.listEngines();
    console.log(response)
    res.json({
    
        models: response.data.data
    })
    
    
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})