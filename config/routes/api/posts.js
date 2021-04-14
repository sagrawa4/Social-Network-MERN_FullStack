const express = require('express');
const router = express.Router();
const { check, validationResult} = require('express-validator');
const auth = require('../../../middleware/auth');

const Post = require('../../../models/Post');
const Profile = require('../../../models/Profile');
const User = require('../../../models/User');


//@router  POST api/posts
//@desc     Create a post
//@access    Private
router.post('/', [auth, [ 
    check('text', 'Text is required').not().isEmpty()
]], 
    async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json( { errors: errors.array() });
    }

    try {
        const user = await User.findById(req.user.id).select('-password');
        
        const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
    })
        const post = await newPost.save();

        res.json(post);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


//@router  Get api/posts
//@desc     Get all posts
//@access    private // profiles will be public but posts are private

router.get('/', auth, 
    async (req,res) => {
    
    try {
        const posts = await Post.find().sort({ date: -1 });
        res.json(posts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//@router  Get api/posts/:id
//@desc     Get post by ID for particular user
//@access    private // profiles will be public but posts are private

router.get('/:id', async(req, res)=> {
    try {
        const post = await Post.findById(req.params.id);
       
        if(!post)
        {
            return res.status(400).json({msg: 'Post not found'});
        }
        res.json(post);

    } catch (err) {
        console.error(err.message);
        if(err.kind === 'ObjectId'){
            return res.status(400).json({msg: 'Post not found'});
        }
        res.status(500).send('Server Error');
    }
});

//@router  Delete api/posts/:id
//@desc     Delete post by ID for particular user
//@access    private // profiles will be public but posts are private

router.delete('/:id', async(req, res)=> {
    try {
        const post = await Post.findById(req.params.id);
        
        if(!post)
        {
            return res.status(400).json({msg: 'Post not found'});
        }
        //Check the user who is deleting the post is the acutal author of the post
        if(post.id.toString() !== req.params.id){
            return res.status(401).json({msg: 'User not authorized'});
        }
        await post.remove();
        res.json({msg: 'Post Deleted'});

    } catch (err) {
        console.error(err.message);
        if(err.kind === 'ObjectId'){
            return res.status(400).json({msg: 'Post not found'});
        }
        res.status(500).send('Server Error');
    }
});

//@router  PUT api/posts/like/:id
//@desc    Like a post
//@access    private 
router.put('/like/:id', auth, async(req, res)=> {
    try {
        const post= await Post.findById(req.params.id);

        //Check if the post has been alreday liked
        if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0){
            return res.status(400).json({ msg: 'Post already liked '});
        }

        post.likes.unshift({ user: req.user.id});

        await post.save();

        res.json(post.likes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//@router  PUT api/posts/unlike/:id
//@desc    Like a post
//@access    private 
router.put('/unlike/:id', auth, async(req, res)=> {
    try {
        const post= await Post.findById(req.params.id);

        //Check if the post has been alreday liked
        if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0){
            return res.status(400).json({ msg: 'Post has not been liked yet'});
        }

        //Get remove index
        const removeIndex = post.likes.map(like=>like.user.toString()).indexOf(req.user.id);

        post.likes.splice(removeIndex, 1);
        await post.save();

        res.json(post.likes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;