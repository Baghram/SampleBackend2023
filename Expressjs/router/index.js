const router = require("express").Router();
const UserController = require("../controller/userController");
const verify = require("../middleware/verify");

router
  .get("", (req, res) => {
    return res.status(200).json({
      message: "Hello World",
    });
  })
  .get("/find/name/:name", UserController.checkUser)
  .get("/find/username/:username", UserController.checkUser)
  .post("/create", UserController.addUser)
  .post("/login", UserController.login)
  .delete("/delete", verify, UserController.deleteUser);

module.exports = router;
