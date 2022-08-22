const Post = require('../models/post');


exports.createPost = (req, res, next) => {
    const {title,body,photo,video} = req.body 
    if(!title || !body){
      return  res.status(422).json({error:"Please Title and Body fields are required"})
    }
    req.user.password = undefined
    const post = new Post({
        title,
        body,
        photo,
        video,
        postedBy:req.user
    })
    post.save().then(result=>{
        console.log(result);
        res.status(201).json({post:result, message:"saved successfully"})
    })
    .catch(err=>{
        console.log(err);
        res.status(400).json({ 'message': err.message });
    })
};

exports.getAllPost = (req, res, next) => {
    Post.find()
    .populate("postedBy","_id name")
    .populate("comments.postedBy","_id name")
    .populate("likes.postedBy","_id name")
    .sort('-createdAt')
    .then((posts)=>{
        console.log(posts);
        res.status(200).json({posts, message:"successfully"})
    }).catch(err=>{
        console.log(err);
        res.status(400).json({ 'message': err.message });
    })
};

exports.getMyPost = (req, res, next) => {
    Post.find({postedBy:req.user._id})
    .populate("postedBy","_id name")
    .populate("comments.postedBy","_id name")
    .populate("likes.postedBy","_id name")
    .sort('-createdAt')
    .then(mypost=>{
        console.log(mypost);
        res.status(200).json({mypost, message:"successfully"})
    })
    .catch(err=>{
        console.log(err)
        res.status(400).json({ 'message': err.message });
    })
};

exports.createComment = (req, res, next) => {
    const comment = {
        text:req.body.text,
        postedBy:req.user._id
    }
    Post.findByIdAndUpdate({_id:req.params.postId},{
        $push:{comments:comment}
    },{
        new:true
    })
    .populate("comments.postedBy","_id name")
    .populate("postedBy","_id name")
    .exec((err,result)=>{
        if(err){
            console.log(err)
            return res.status(400).json({error:err})
        }else{
            console.log(result)
            res.status(201).json({result, message:"successfully"})
        }
    })
};

exports.votePost = (req, res, next) => {
     Post.findByIdAndUpdate({_id:req.params.postId},{
        $push:{likes:req.user._id}
    },{
        new:true
    }).exec((err,result)=>{
        if(err){
            console.log(err)
            return res.status(400).json({error:err})
        }else{
            console.log(result)
            res.status(201).json({result, message:"successfully"})
        }
    })
};

exports.unVotePost = (req, res, next) => {
    Post.findByIdAndUpdate({_id:req.params.postId},{
        $pull:{likes:req.user._id}
    },{
        new:true
    }).exec((err,result)=>{
        if(err){
            console.log(err)
            return res.status(400).json({error:err})
        }else{
            console.log(result)
            res.status(201).json({result, message:"successfully"})
        }
    })
};

exports.getPostWithHighVote = (req, res, next) => {
    Post.find()
    .populate("postedBy","_id name")
    .populate("comments.postedBy","_id name")
    .populate("likes.postedBy","_id name")
    .sort("-likes")
    .then((posts)=>{
        console.log(posts);
        res.status(200).json({posts, message:"successfully"})
    }).catch(err=>{
        console.log(err);
        res.status(400).json({ 'message': err.message });
    })
};

exports.deletePost = (req, res, next) => {
    Post.findOne({_id:req.params.postId})
    .populate("postedBy","_id")
    .exec((err,post)=>{
        if(err || !post){
            return res.status(400).json({error:err})
        }
        if(post.postedBy._id.toString() === req.user._id.toString()){
              post.remove()
              .then(result=>{
                  console.log(result)
                  res.status(200).json({result, message:"successfully"})
              }).catch(err=>{
                  console.log(err)
                  return res.status(400).json({error:err})
              })
        }
    })
};

exports.updatePost = (req, res, next) => {
    const {title,body,photo,video} = req.body 
    if(!title||!body){
      return  res.status(422).json({error:"Please Title and Body fields are required"})
    }
    req.user.password = undefined
    const post = new Post({
         _id: req.params.postId,
        title,
        body,
        photo,
        video,
        postedBy:req.user
    })
    Post.findByIdAndUpdate({_id:req.params.postId}, post).then(
    () => {
      res.status(201).json({
        message: 'Post updated successfully!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};