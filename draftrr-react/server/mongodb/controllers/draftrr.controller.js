const db = require("../models");
const Draftrr = db.draftrr;

// Create and Save a new Project
exports.create = (req, res) => {
    // Validate request
    // if (!req.body.text) {
    //     res.status(400).send({ message: "Content can not be empty!" });
    //     return;
    // }

    // Create a Project
    const project = new Draftrr({
        text: req.body.text,
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


// Find a single Project with an id
exports.findOne = (req, res) => {
    const id = req.params.id

    Draftrr.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found Tutorial with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving Tutorial with id=" + id });
        });
};
// Update a Project by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    Draftrr.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Project with id=${id}. Maybe Project was not found!`
                });
            } else res.send({ message: "Project was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Project with id=" + id
            });
        });
};

// Delete a Project with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Draftrr.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Project with id=${id}. Maybe Project was not found!`
                });
            } else {
                res.send({
                    message: "Project was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Project with id=" + id
            });
        });
};

// Delete all Projects from the database.
exports.deleteAll = (req, res) => {
    Draftrr.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} Projects were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Projects."
            });
        });
};