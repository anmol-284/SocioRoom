const express = require('express');
const router = express.Router();
const auth = require("../middlewares/Auth");

const {usersignup, userlogin, sendOTP, logout, user, getprofile} = require('../controllers/user');
const {resetPasswordToken, resetPassword} = require("../controllers/ResetPassword");
const {updateProfile, deleteProfile, follow, unfollow} = require("../controllers/updateProfile");
const {Post, updatePost, deletePost, likePost, feed, getuserpost} = require("../controllers/posts");
// const {userprofile} = require("../controllers/user");
// const {Conversation , getConversation, message, messageId, getusers} = require("../controllers/Conversation");
const {sendMessage, getMessages} = require("../controllers/chat");
const {chatusers} = require("../controllers/chatusers");
const {getusernames} = require("../controllers/user");

router.post("/usersignup", usersignup);
router.post("/sendotp", sendOTP);
router.post("/userlogin", userlogin);
router.post("/logout", auth , logout);
router.post("/reset-password-token", resetPasswordToken);
router.post("/resetPassword", resetPassword);
router.put("/:id", updateProfile);
router.delete("/:id", deleteProfile);
router.put("/:id/follow", auth , follow);
router.put("/:id/unfollow", auth, unfollow);

router.post("/posts", Post);

router.put("/:id/posts", updatePost);
router.delete("/:id/posts", deletePost);
router.put("/:id/like", likePost);
// router.post("/conversation", Conversation);
// router.get("/conversation/:userId", getConversation);
// router.post("/message", message);
// router.get("/message/:conversationId", messageId);    // receive all msg of that conversation id

// Assuming auth middleware is correctly implemented and sets req.user
router.post('/send/:id' , auth, sendMessage);
router.get('/getmessages/:id', auth, getMessages);
router.get('/chatusers', auth , chatusers);
router.get('/getusernames', auth, getusernames);
router.get('/user', user);
// router.get('/getuserpost', auth ,getuserpost);
router.get('/user/:id', user);
router.get('/feed' , auth, feed);
router.get('/getuserpost', auth ,getuserpost);
router.get('/profile/:username', auth, getprofile);
// router.get('/userprofile/:username', auth, userprofile);


// changes start----
// to follow user
// router.put("/follow", requireLogin, (req, res) => {
//     USER.findByIdAndUpdate(req.body.followId, {
//         $push: { followers: req.user._id }
//     }, {
//         new: true
//     }, (err, result) => {
//         if (err) {
//             return res.status(422).json({ error: err })
//         }
//         USER.findByIdAndUpdate(req.user._id, {
//             $push: { following: req.body.followId }
//         }, {
//             new: true
//         }).then(result => {
//             res.json(result)

//         })
//             .catch(err => { return res.status(422).json({ error: err }) })
//     }
//     )
// })

// to unfollow user
// router.put("/unfollow", requireLogin, (req, res) => {
//     USER.findByIdAndUpdate(req.body.followId, {
//         $pull: { followers: req.user._id }
//     }, {
//         new: true
//     }, (err, result) => {
//         if (err) {
//             return res.status(422).json({ error: err })
//         }
//         USER.findByIdAndUpdate(req.user._id, {
//             $pull: { following: req.body.followId }
//         }, {
//             new: true
//         }).then(result => res.json(result))
//             .catch(err => { return res.status(422).json({ error: err }) })
//     }
//     )
// })

// changes over


module.exports = router;