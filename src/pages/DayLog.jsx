import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getDay, totalCalories, totalMinutes, moveDate } from "../utils.js";

// JOB: the dynamic page. It shows and edits ONE day (water, sleep, meals, workouts).
// The date comes from the link, for example /log/2026-11-16
function DayLog({ logs, updateDay }) {
  const { date } = useParams();
  const day = getDay(logs, date);

  const [mealName, setMealName] = useState("");
  const [mealCalories, setMealCalories] = useState("");
  const [workoutName, setWorkoutName] = useState("");
  const [workoutMinutes, setWorkoutMinutes] = useState("");

  // Save the whole day with the new values
  function saveDay(water, sleep, meals, workouts) {
    updateDay(date, { water: water, sleep: sleep, meals: meals, workouts: workouts });
  }

  function addWater(amount) {
    let newWater = day.water + amount;
    if (newWater < 0) {
      newWater = 0; // never go below 0
    }
    saveDay(newWater, day.sleep, day.meals, day.workouts);
  }

  function changeSleep(event) {
    saveDay(day.water, Number(event.target.value), day.meals, day.workouts);
  }

  function addMeal(event) {
    event.preventDefault(); // stop the page from reloading
    const newMeal = { name: mealName, calories: Number(mealCalories) };
    const newMeals = day.meals.concat([newMeal]); // old meals + the new one
    saveDay(day.water, day.sleep, newMeals, day.workouts);
    setMealName("");
    setMealCalories("");
  }

  function addWorkout(event) {
    event.preventDefault();
    const newWorkout = { name: workoutName, minutes: Number(workoutMinutes) };
    const newWorkouts = day.workouts.concat([newWorkout]);
    saveDay(day.water, day.sleep, day.meals, newWorkouts);
    setWorkoutName("");
    setWorkoutMinutes("");
  }

  // Delete: build a new list that skips the chosen item
  function removeMeal(index) {
    const newMeals = [];
    for (let i = 0; i < day.meals.length; i++) {
      if (i !== index) {
        newMeals.push(day.meals[i]);
      }
    }
    saveDay(day.water, day.sleep, newMeals, day.workouts);
  }

  function removeWorkout(index) {
    const newWorkouts = [];
    for (let i = 0; i < day.workouts.length; i++) {
      if (i !== index) {
        newWorkouts.push(day.workouts[i]);
      }
    }
    saveDay(day.water, day.sleep, day.meals, newWorkouts);
  }

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <Link className="btn btn-outline-dark btn-sm" to={"/log/" + moveDate(date, -1)}>Previous day</Link>
        <h1 className="h4 m-0">{date}</h1>
        <Link className="btn btn-outline-dark btn-sm" to={"/log/" + moveDate(date, 1)}>Next day</Link>
      </div>

      <div className="row g-3">
        {/* WATER */}
        <div className="col-12 col-md-6">
          <div className="card stat-card p-3 h-100">
            <h2 className="h5">Water</h2>
            <div className="number">{day.water} glasses</div>
            <div className="mt-2">
              <button className="btn btn-brand me-2" onClick={() => addWater(1)}>Add a glass</button>
              <button className="btn btn-outline-dark" onClick={() => addWater(-1)}>Remove one</button>
            </div>
          </div>
        </div>

        {/* SLEEP */}
        <div className="col-12 col-md-6">
          <div className="card stat-card p-3 h-100">
            <h2 className="h5">Sleep</h2>
            <label className="form-label">Hours slept</label>
            <input className="form-control" type="number" min="0" max="24"
              value={day.sleep} onChange={changeSleep} />
          </div>
        </div>

        {/* MEALS */}
        <div className="col-12 col-md-6">
          <div className="card p-3 h-100">
            <h2 className="h5">Meals – {totalCalories(day)} calories</h2>
            <form onSubmit={addMeal} className="row g-2 mb-2">
              <div className="col-7">
                <input className="form-control" placeholder="Meal" required
                  value={mealName} onChange={(e) => setMealName(e.target.value)} />
              </div>
              <div className="col-5">
                <input className="form-control" type="number" min="0" placeholder="Calories" required
                  value={mealCalories} onChange={(e) => setMealCalories(e.target.value)} />
              </div>
              <div className="col-12"><button className="btn btn-brand">Add meal</button></div>
            </form>
            {day.meals.length === 0 && <p className="mb-0">No meals yet. Add your first one above.</p>}
            <ul className="list-group">
              {day.meals.map((meal, index) => (
                <li className="list-group-item d-flex justify-content-between" key={index}>
                  {meal.name} – {meal.calories}
                  <button className="btn btn-sm btn-outline-danger" onClick={() => removeMeal(index)}>Delete</button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* WORKOUTS */}
        <div className="col-12 col-md-6">
          <div className="card p-3 h-100">
            <h2 className="h5">Workouts – {totalMinutes(day)} minutes</h2>
            <form onSubmit={addWorkout} className="row g-2 mb-2">
              <div className="col-7">
                <input className="form-control" placeholder="Exercise" required
                  value={workoutName} onChange={(e) => setWorkoutName(e.target.value)} />
              </div>
              <div className="col-5">
                <input className="form-control" type="number" min="0" placeholder="Minutes" required
                  value={workoutMinutes} onChange={(e) => setWorkoutMinutes(e.target.value)} />
              </div>
              <div className="col-12"><button className="btn btn-brand">Add workout</button></div>
            </form>
            {day.workouts.length === 0 && <p className="mb-0">No workouts yet. Add your first one above.</p>}
            <ul className="list-group">
              {day.workouts.map((workout, index) => (
                <li className="list-group-item d-flex justify-content-between" key={index}>
                  {workout.name} – {workout.minutes} min
                  <button className="btn btn-sm btn-outline-danger" onClick={() => removeWorkout(index)}>Delete</button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default DayLog;
