const express = require('express');
const router = express.Router();
const auth = require('../../../middleware/auth');
const User = require('../../../models/User');
const jwt = require('jsonwebtoken');
const { check, validationResult} = require('express-validator');
const config= require('config');
const bcrypt = require('bcryptjs');

//@router  GET api/auth
//@desc     Test route
//@acess    Public
router.get('/',auth, async(req,res) => {
    try{

        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    }catch(err){
        console.error(err.message);
        res.status(500).json({msg: 'Server Error'});
    }
});


//@router  POST api/auth
//@desc     Authenticate user & get token
//@access    Public
router.post('/', [
    check('email',"Please include a valid email").isEmail(),
    check('password', 'Password is required').exists()
],
async (req,res) => {

    //make sure to initialize middleware in server.js to console.log req.body
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password} = req.body;

    try {
        //See if user exists
        let user = await User.findOne({ email });

        if(!user){
            return res.status(400).json({errors: [{ msg: 'Invalid Credentials'}] });
        }
    
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) {
        return res.status(400).json({errors: [{ msg: 'Invalid Credentials'}] });
    }


    //Return json web token : to get loggen right way from frontend
    
    const payload = {
        user: {
            id: user.id
        }
    }

    jwt.sign(
        payload, 
        config.get('jwtSecret'),
        { expiresIn: 360000},
        (err, token) => {
            if(err) throw err;
            res.json({token}); //returns a token when the user is loggend for first time
        });

    } catch(err){
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;