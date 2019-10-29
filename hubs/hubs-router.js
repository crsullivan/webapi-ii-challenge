const router = require('express').Router();
const Hubs = require('../data/db');

router.get('/posts', (req, res) => {
    const query = req.query;

    Hubs.find(query)
        .then(hubs => {
            res.status(200).json(hubs);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: 'Error retrieving data',
            });
        });
});

router.get(`/posts/:id`, (req, res) => {
    Hubs.findById(req.params.id) 
        .then(hub => {
            if (hub) {
                res.status(200).json(hub);
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist."})
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: "The post information could not be retrieved."})
        });
});

router.get(`/posts/:id/comments`, (req, res) => {
    Hubs.findPostComments(req.params.id) 
        .then(hub => {
            if (hub) {
                res.status(200).json(hub);
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist."})
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: "The comments information could not be retrieved."})
        });
});

router.post(`/posts`, (req, res) => {
    if (!Object.keys(req.body).includes("title") || !Object.keys(req.body).includes("contents")){
        return res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    }
    Hubs.insert(req.body)
        .then(hub => {
            res.status(201).json(hub);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: "There was an error while saving the post to the database"})
        });
});

router.post(`/posts/:id/comments`, (req, res) => {
    if (!Object.keys(req.body).includes("text")){
        return res.status(400).json({ errorMessage: "Please provide text for the comment." })
    } 
    console.log(req.params.id)
    console.log(req.body)
    Hubs.insertComment(req.body)
        .then(hub => {
            if (hub) {
            res.status(201).json(hub);
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist."})
        }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: "There was an error while saving the post to the database"})
        });
});

module.exports = router;



