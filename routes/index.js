const express = require('express')
const router = express.Router()
const jwt = require("jsonwebtoken")
const {checkAuth} = require('../middleware/check-auth');

router.use('/auth', require('./auth'))
router.use("/", checkAuth, require('./user'))

module.exports = router