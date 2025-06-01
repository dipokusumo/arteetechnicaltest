const express = require("express");
const userController = require("../controllers/userController");
const taskController = require("../controllers/taskController");
const auth = require("../middlewares/auth");

const router = express.Router();

router.post("/user", userController.login);
router.post("/tasks", auth, taskController.add);
router.get("/tasks", auth, taskController.list);
router.patch("/tasks/:id", auth, taskController.toggle);
router.delete("/tasks/:id", auth, taskController.remove);

module.exports = router;