const express = require("express");
const notesHandler = require("../controllers/noteshandler");
const usersHandler = require("../controllers/userhandler");
const router = express.Router();

router.post("/addnote", notesHandler.addNote);
router.get("/getnotes/:un", notesHandler.getNotes);
router.put("/updatenote/:id", notesHandler.updateNote);
router.delete("/deletenote/:id", notesHandler.deleteNote);

router.post("/adduser", usersHandler.addUser);
router.get("/getusers", usersHandler.getUsers);

module.exports = router;
