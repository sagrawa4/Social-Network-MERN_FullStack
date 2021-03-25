const express = require('express');
const router = express.Router();
const { check, validationResult} = require('express-validator')

//@router  POST api/users
//@desc     Register user
//@acess    Public
router.post('/', (req,res) => {

    //make sure to initialize middleware in server.js to console.log req.body
    console.log(req.body);
    res.send("User Route")
});

module.exports = router;