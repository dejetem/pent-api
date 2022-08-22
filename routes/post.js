const express = require('express');
const router = express.Router();
const postCtrl = require('../controller/post');
const auth  = require('../middleware/auth')

router.post('/createpost',auth, postCtrl.createPost);
router.get('/getallpost',auth, postCtrl.getAllPost);
router.get('/mypost',auth, postCtrl.getMyPost);
router.put('/vote/:postId',auth, postCtrl.votePost);
router.put('/unvote/:postId',auth, postCtrl.unVotePost);
router.put('/createcomment/:postId',auth, postCtrl.createComment);
router.put('/updatepost/:postId',auth, postCtrl.updatePost);
router.delete('/deletepost/:postId',auth, postCtrl.deletePost);
router.get('/postbyvotecount',auth, postCtrl.getPostWithHighVote);



module.exports = router;