// JOB: small helper functions (dates and totals) used by many pages.
// Small helper functions used by many pages.

// Turn a Date object into text like "2026-11-16"
export function formatDate(d) {
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return d.getFullYear() + "-" + month + "-" + day;
}

export function getToday() {
  return formatDate(new Date());
}

// What a day looks like when nothing is logged yet
export function emptyDay() {
  return { water: 0, sleep: 0, meals: [], workouts: [] };
}

// Get one day from all the logs (or an empty day)
export function getDay(logs, date) {
  return logs[date] || emptyDay();
}

// Add up the calories of all meals in one day
export function totalCalories(day) {
  let total = 0;
  for (const meal of day.meals) {
    total = total + meal.calories;
  }
  return total;
}

// Add up the minutes of all workouts in one day
export function totalMinutes(day) {
  let total = 0;
  for (const workout of day.workouts) {
    total = total + workout.minutes;
  }
  return total;
}

// Make a list of the last n dates, oldest first
export function lastDays(n) {
  const days = [];
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push(formatDate(d));
  }
  return days;
}

// Move a date forward or back by some days (step = 1 or -1)
export function moveDate(date, step) {
  const d = new Date(date + "T00:00:00");
  d.setDate(d.getDate() + step);
  return formatDate(d);
}
