const express = require("express");
const router = express.Router();
const verify = require("../../middleware/authjwt");

const createTodo = require("../../controllers/todo/createTodo.controller");
const getAll = require("../../controllers/todo/getAll.controller");
const deleteTodo = require("../../controllers/todo/deleteTodo.controller");
const updateTodo = require("../../controllers/todo/updateTodo.controller");

router.route("/").post(verify, createTodo).get(verify, getAll);

router.delete("/delete/:id", verify, deleteTodo);

router.put("/put/:id", verify, updateTodo);
   
module.exports = router;
