const express = require('express')
const app = express()
const cors = require('cors');
const PORT = process.env.PORT || 3000

require('dotenv').config()

// middleware
app.use(cors())
app.use(express.json())


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.abawfgw.mongodb.net/?appName=Cluster0`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
tCollection = client.db("foodappdb").collection("cartItems")


async function run() {
    try {
        await client.connect();

        const menuCollections = client.db("foodappdb").collection("menus")
        const cartCollections = client.db("foodappdb").collection("cartItems")

        app.get("/menu", async (req, res) => {
            const result = await menuCollections.find().toArray();
            res.send(result)
        });

        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // await client.close();
    }
}
run().catch(console.dir);


app.get("/", (req, res) => {
    res.send("Hello world")
})

// console.log("register log", app._router.stack)
app.listen(PORT, () => {
    console.log(`App started at ${PORT}`)
})
