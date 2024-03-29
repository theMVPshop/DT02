module.exports = app => {
    const projects = require("../controllers/draftrr.controller.js");

    var router = require("express").Router();

    // Create a new Tutorial
    router.post("/create", projects.create);

    // Retrieve a single Tutorial with id
    router.get("/:id", projects.findOne);

    // Update a Tutorial with id
    router.put("/:id", projects.update);

    // Delete a Tutorial with id
    router.delete("/:id", projects.delete);

    // Create a new Tutorial
    router.delete("/", projects.deleteAll);

    app.use('/text', router);
};