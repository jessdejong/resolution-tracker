// Habit Data
// kind = "habit"
//    properties
//      name = "Competitive Programming"
//      user = ""?
//      order = 1,2,3...
//      habitData = list of len(364) as described below
//      archived = false

import { useState } from "react";

function HabitHeader({ name, streakNumDays, completed, index }) {
  return (
    <div className="flex flex-row pl-2 mb-2 mt-3 items-center space-x-4 w-fit">
      <p className="text-sm font-bold">
        {index}. {name}
      </p>
      {completed ? <p className="text-md">&#9989; Completed</p> : null}
      <p className="text-md">&#128293; {streakNumDays} day streak</p>
      {/* <p className="text-md">&#129351; First place</p> */}
      <div className="flex flex-row space-x-1">
        <input type="checkbox" />
        <p className="text-md">Show statistics</p>
      </div>
    </div>
  );
}

// habitData -> integer list of len 364
// 0=habit not yet started
// 1=not completed
// 2=completed
// 3+=completed+
function HabitCalendarDisplay({ habitData, setHabitData, dayOfYear }) {
  return (
    <div className="graph">
      <ul className="months">
        <li>Jan</li>
        <li>Feb</li>
        <li>Mar</li>
        <li>Apr</li>
        <li>May</li>
        <li>Jun</li>
        <li>Jul</li>
        <li>Aug</li>
        <li>Sep</li>
        <li>Oct</li>
        <li>Nov</li>
        <li>Dec</li>
      </ul>
      <ul className="days">
        <li>Sun</li>
        <li>Mon</li>
        <li>Tue</li>
        <li>Wed</li>
        <li>Thu</li>
        <li>Fri</li>
        <li>Sat</li>
      </ul>
      <ul className="squares">
        {habitData.map((habitStatus, idx) => {
          // const colors = ["ebedf0", "#c6e48b", "#7bc96f", "#196127"];
          console.log("here2");
          const style =
            idx == dayOfYear - 1 ? { border: "2px solid #7dd3fc" } : {};
          return (
            <button
              type="button"
              data-level={habitStatus}
              style={style}
              className="tooltip"
              onClick={() => {
                if (habitStatus == 0) return;
                const newHabitData = habitData.map((habitLevel, index) => {
                  if (index == idx) {
                    let newHabitLevel = (habitLevel + 1) % 3;
                    if (newHabitLevel == 0) newHabitLevel++;
                    return newHabitLevel;
                  } else return habitLevel;
                });
                setHabitData(newHabitData);
              }}
            >
              {/* Maybe make the tooltip slightly transparent! */}
              <span className="tooltiptext">{getFormattedDate(dateFromDay(idx + 1))}</span>
            </button>
          );
        })}
      </ul>
    </div>
  );
}

function generateRandomHabitData() {
  let i = 0;
  let notStartedHabit = Math.floor(Math.random() * 15);
  let habitData = [];
  while (i < notStartedHabit) {
    habitData.push(0);
    i++;
  }
  while (i < 364) {
    habitData.push(Math.floor(Math.random() * 2) + 1);
    i++;
  }
  return habitData;
}

function calculateDayOfYear(date) {
  return Math.floor(
    (date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24
  );
}

function getFormattedDate(date) {
  return date.toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"});

  // dateFromDay(1).getMonth().toString();
  // dateFromDay(1).toLocaleString();

//   const date = new Date(2009, 10, 10);  // 2009-11-10
// const month = date.toLocaleString('default', { month: 'long' });
// console.log(month);
}

function dateFromDay(day){
  var date = new Date(new Date().getFullYear(), 0); // initialize a date in `year-01-01`
  return new Date(date.setDate(day)); // add the number of days
}

function HabitCalendar({ habit, index }) {
  // IDEA: combine habits with timers, so that I have to complete the timer in order to mark the habit from today!
  // Side Bar, where you can start timers or mark habits as completed.

  const [habitData, setHabitData] = useState(habit.habitData);// generateRandomHabitData());
  const streakNumDays = 4; // getStreakNumDays(data);
  const completed = true; // isCompleted(data); // Just check the last date.
  const dayOfYear = calculateDayOfYear(new Date());
  // const habitData = generateRandomHabitData();

  return (
    <div>
      <HabitHeader
        name={habit.habitName}
        streakNumDays={streakNumDays}
        completed={completed}
        index={index}
      />
      <div
        className="flex flex-row bg-white rounded-md p-5 w-fit shadow-md"
        style={{ border: "1px #e1e4e8 solid" }}
      >
        <HabitCalendarDisplay
          habitData={habitData}
          setHabitData={setHabitData}
          dayOfYear={dayOfYear}
        />
      </div>
    </div>
  );
}

export default HabitCalendar;
