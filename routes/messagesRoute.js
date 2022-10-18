const { Router } = require("express");
const { messagesCtrl: ctrl } = require("../controllers");
const router = Router();

router.post("/addmsg", ctrl.addMsg);
router.post("/getmsg", ctrl.getAllMsg);

module.exports = router;
