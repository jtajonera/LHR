const Name = require("../models/name");

exports.GetNames = (req, res) => {
    Name.find()
        .then((name) => res.status(200).json(name))
        .catch((err) =>
            res
                .status(400)
                .json({error: err.message })
        );
};

exports.AddName = (req, res) => {
    Name.create(req.body)
        .then((data) => res.status(200).json({ message: "Successfully added " + data.name + " to database" }))
        .catch((err) =>
            res
                .status(400)
                .json({error: err.message })
        );
};

exports.DeleteName = (req, res) => {
    Name.findByIdAndRemove(req.params.id, req.body)
        .then((data) =>
            res.status(200).json({ message: "Name deleted successfully", data })
        )
        .catch((err) =>
            res
                .status(404)
                .json({ message: "Name not found", error: err.message })
        );
};