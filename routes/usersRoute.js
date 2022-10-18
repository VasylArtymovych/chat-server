const { Router } = require("express");
const { usersCtrl: ctrl } = require("../controllers");
const router = Router();

router.post("/register", ctrl.register);
router.post("/login", ctrl.login);
router.post("/setAvatar/:id", ctrl.setAvatar);
router.get("/allusers/:id", ctrl.getAllUsers);

module.exports = router;
