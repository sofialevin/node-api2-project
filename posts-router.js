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
        res.status(500).json({ message: "The posts information could not be retrieved." })
    })
})

router.get("/:id", (req, res) => {
    const id = req.params.id

    Posts.findById(id)
    .then(post => {
        if (post.length > 0) {
            res.status(200).json(post)
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ message: "The post information could not be retrieved." })
    })
})

router.get("/:id/comments", (req, res) => {
    const id = req.params.id

    Posts.findPostComments(id)
    .then(comments => {
        if (comments.length > 0) {
            res.status(200).json(comments)
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ message: "The comments information could not be retrieved." })
    })
})

router.post("/", (req, res) => {
    const body = req.body

    if (body.title && body.contents) {
        Posts.insert(body)
        .then(postId => {
            Posts.findById(postId.id)
            .then(post => res.status(201).json(post))
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: "There was an error while saving the post to the database." })
        })
    } else {
        res.status(400).json({ message: "Please provide title and contents for the post." })
    }

})

router.post("/:id/comments", (req, res) => {
    const id = req.params.id
    const body = {...req.body, post_id: id}

    Posts.findById(id)
    .then(post => {
        if (post.length > 0) {
            if (body.text) {
                Posts.insertComment(body)
                .then(comment => {
                    Posts.findCommentById(comment.id)
                    .then(comment => {
                        res.status(201).json(comment)
                    })
                })
                .catch(err => {
                    console.log(err)
                    res.status(500).json({ message: "There was an error while saving the comment to the database." })
                })
            } else {
                res.status(400).json({ message: "Please provide text for the comment." })
            }
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
    })
    // 
})

module.exports = router;