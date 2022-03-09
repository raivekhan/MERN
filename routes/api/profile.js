const express=require('express');
const router=express.Router();

const Profile = require('../../models/Profile');
const authMiddleware= require('../../middleware/auth');
const { check } = require('express-validator');

// @route GET /profile
// @desc test route
// @access public
router.get('/', authMiddleware, (req, res)=>{
res.send('Profile route');
})

// @route GET /profile/me
// @desc Get current user profile
// @access private
router.get('/me', authMiddleware, async (req, res)=>{
    try {
        const profile = await Profile.findOne({user: req.user.id}).populate('user', ['name', 'avatar']);

        if(!profile) {
            res.status(400).json({msg: 'There is no profile for this user'});
        }
        res.json(profile);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error')
    }
    })

// @route POST /profile
// @desc Create or Update profile
// @access private
router.post('.', [authMiddleware, [
    check('status', 'Status is required').not().isEmpty(),
    check('skills', 'Skills is required').not().isEmpty(),
]], (req, res) => {

})

module.exports=router;