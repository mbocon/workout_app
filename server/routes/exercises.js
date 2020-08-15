const express = require('express');
const router = express.Router();
const  { Exercise } = require("../models/Exercise");

//=================================
//             EXERCISES
//=================================

router.get('/getexercises', (req,res)=>{
    Exercise.find({}, function(err, exercises) {
        if(err) {
            res.send(err);
            return;
        }
        res.json(exercises);
    });
})

router.post("/create", (req, res) => {
    console.log(req.body, 'from create exer')
    const exercise = new Exercise(req.body);

    exercise.save((err, item) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true,
            exercise: exercise
        });
    });
});

router.delete('/:userId/:postId', (req,res) => {
    Exercise.findById(req.params.postId, function(err, post) {
        if(post.user.toString() === req.params.userId){
            post.remove()
            res.json('Delete success')
        } else{
            res.json('User unauthorized')
        }
    })
});


// router.put('/:id', (req, res) => {
//     Post.findByIdAndUpdate(req.params.id, req.body, (err, updatedPost) => {
//         res.json(updatedPost);
//     });
// });

module.exports = router;
