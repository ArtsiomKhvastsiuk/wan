const express = require('express');
const router = express.Router();

router.get('/news', (req, res) => {
    res.header("Content-Type", "application/json");
    res.send({text: 'ok'});
});
module.exports = router;
