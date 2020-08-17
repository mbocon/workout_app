const express = require('express');
const router = express.Router();
const  { Workout } = require("../models/Workout");

//=================================
//             WORKOUTS
//=================================

router.get('/getworkouts', (req,res)=>{
    Workout.find({}, function(err, workouts) {
        if(err) {
            res.send(err);
            return;
        }
        res.json(workouts);
    });
})

router.post("/create", (req, res) => {
    console.log(req.body, 'from create workout')
    const workout = new Workout(req.body);

    workout.save((err, workout) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true,
            workout: workout
        });
    });
});

router.delete('/:userId/:id', (req,res) => {
    Workout.findById(req.params.id, function(err, post) {
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
