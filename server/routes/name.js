const express = require("express");
const router = express.Router();

const {
    GetNames,
    AddName,
    DeleteName,
} = require("../controllers/name");

/**
 * @route GET api/name
 * @description get all names
 * @access public
 */
router.get("/GetNames", GetNames);

/**
 * @route POST api/name
 * @description add a new name
 * @access public
 */
router.post("/AddName", AddName);

/**
 * @route DELETE api/name/:id
 * @description delete name
 * @access public
 */
router.delete("/DeleteName/:id", DeleteName);

module.exports = router;