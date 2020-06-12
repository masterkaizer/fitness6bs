const router = require("express").Router();
const Workout = require("../models/workout.js");


/* Api for creating workouts */
router.post("/api/workouts", (req, res) => {
    Workout.create(req.body)
        .then(dbWorkout => {
            res.json(dbWorkout)
        })
        .catch(err => {
            res.json(err)
        })
})


/* Api for get workouts */
router.get("/api/workouts", (req, res) => {
    Workout.find({})
        .then(dbWorkout => {
            res.json(dbWorkout)
        })
        .catch(err => {
            res.json(err)
        })
})

/* Api for get workouts according to range*/
router.get("/api/workouts/range", ({ query }, res) => {
    Workout.find({ day: { $gte: query.start, $lte: query.end } }) //query made of less than & greater than
      .then(dbWorkouts => {
        res.json(dbWorkouts);
      })
      .catch(err => {
        res.json(err);
      });
  });
  
/* Api for delete workouts */
  router.delete("/api/workouts", ({ body }, res) => {
    Workout.findByIdAndDelete(body.id)
      .then(() => {
        res.json(true);
      })
      .catch(err => {
        res.json(err);
      });
  });


/* Api for edit workout */
  router.put("/api/workouts/:id", ({ body, params }, res) => {
    Workout.findByIdAndUpdate(
      params.id,
      { $push: { exercises: body } },
      
      { new: true, runValidators: true }
    )
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.json(err);
      });
  });


module.exports = router;
