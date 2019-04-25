const express = require("express");
const mongodb = require("mongodb");
const router = express.Router();


router.get("/", async (req, res) => {
    const posts = await loadPostsCollection();
    res.send(await posts.find().toArray());
});
router.post("/", async (req, res) => {
    let text = req.body.text;
    let user = req.body.user;
    if (text == null || user == null) {
        res.status(400).send();
        return;
    }
    const posts = await loadPostsCollection();
    posts.insertOne({
        text: text,
        user: user,
        createdAt: new Date()
    })
    res.status(201).send();
});

router.delete("/:id", async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
    res.status(200).send();
});

async function loadPostsCollection() {
    const client = await mongodb.MongoClient.connect('mongodb+srv://student:student@webtech2-yqsds.mongodb.net/test', {useNewUrlParser: true});
    return client.db("webtech2").collection("posts");
}

module.exports = router;