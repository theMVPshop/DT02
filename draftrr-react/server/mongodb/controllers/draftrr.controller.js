const db = require("../models");
const Draftrr = db.draftrr;

// Create and Save a new Project
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a Project
    const project = new Draftrr({
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
    });

    // Save Project in the database
    project
        .save(project)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Project."
            });
        });
};

// Retrieve all Projects from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

    Draftrr.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });
};

// Find a single Project with an id
exports.findOne = (req, res) => {

};

// Update a Project by the id in the request
exports.update = (req, res) => {

};

// Delete a Project with the specified id in the request
exports.delete = (req, res) => {

};

// Delete all Projects from the database.
exports.deleteAll = (req, res) => {

};

// Find all published Projects
exports.findAllPublished = (req, res) => {

};