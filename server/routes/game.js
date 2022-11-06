const router = require("express").Router();
const game = require("../controllers/gameController");
const { pool } = require('../db');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
require('dotenv').config();


router.post("/joinRoom", game.joinRoom);

module.exports = { router };