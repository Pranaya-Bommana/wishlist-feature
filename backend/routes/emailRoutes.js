const express = require('express');
const { addEmail } = require('../controllers/emailController');
const router = express.Router();

router.post('/', addEmail);

module.exports = router;
