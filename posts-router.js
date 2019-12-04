const express = require("express");

const Posts = require("./data/db.js");

const router = express.Router();

router.use(express.json());

router.get("/", (req, res) => {
    Posts.find()
    .then(posts => {
        res.status(200).json(posts);
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ message: "Error retrieving posts"})
    })
})

router.get("/:id", (req, res) => {
    const id = req.params.id

    Posts.findById(id)
    .then(post => {
        if (post.length > 0) {
            res.status(200).json(post)
        } else {
            res.status(404).json({ message: "Post not found" })
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ message: "Error retrieving post" })
    })
})

router.get("/:id/comments", (req, res) => {
    const id = req.params.id

    Posts.findPostComments(id)
    .then(comments => {
        if (comments.length > 0) {
            res.status(200).json(comments)
        } else {
            res.status(404).json({ message: "Comments not found" })
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ message: "Error retrieving comments" })
    })
})

module.exports = router;