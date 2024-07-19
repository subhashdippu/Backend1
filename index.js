const express = require('express')
const app = express()
const cors = require('cors');
const port = process.env.PORT || 3000

require('dotenv').config()

// middleware
app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
    res.send("Hello world")
})

app.listen(port, () => {
    console.log(`App started at ${port}`)
})

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.abawfgw.mongodb.net/?appName=Cluster0`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        await client.connect();
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        await client.close();
    }
}
run().catch(console.dir);
