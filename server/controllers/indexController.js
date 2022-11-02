const { pool } = require('../db');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.signIn = async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        await pool.query('INSERT INTO players (username, hashed_password) values($1, $2)', [username, hashedPassword], (err, result) => {
            if (err) {
                console.log(err);
            }
            res.status(201).redirect("/login");
        })
    } catch {
        console.log("s")
    }
};

exports.logIn = async (req, res, next) => {
    const { username, password } = req.body;

    const user = await pool.query("SELECT * FROM players WHERE username = $1", [username]);

    if (user.rows.length == 0) {
        return res.status(400).send("Ne postoji korisnik s tim korisnickim imenom!");
    }

    if (await bcrypt.compare(password, user.rows[0].hashed_password)) {

        req.userInfo = user.rows[0];
        const tokenInfo = {
            t_email: req.userInfo.username,
        };

        const token = jwt.sign(tokenInfo, process.env.JWT_SECRET, { expiresIn: "24h" });
        return res.json({
            token, tokenInfo
        })

    } else {
        return res.status(400).send("Neispravna lozinka.");
    }
};

exports.logOut = (req, res, next) => {
    res.clearCookie("token");
    res.redirect("/");
  };