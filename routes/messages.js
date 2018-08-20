const express = require("express");
const router = express.Router({ mergeParams: true });

const {
    getMessage,
    deleteMessage,
    createMessage
} = require("../handlers/messages");

router.route("/").post(createMessage);

router
    .route("/:message_id")
    .get(getMessage)
    .delete(deleteMessage);

module.exports = router;
