import { useState } from "react";
import { createHabit, db } from "./firebase";

function calculateDayOfYear(date) {
  return Math.floor(
    (date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24
  );
}

const createInitialHabitData = () => {
    let i = 0;
    let notStartedHabit = calculateDayOfYear(new Date());
    let habitData = [];
    while (i < notStartedHabit - 1) {
      habitData.push(0);
      i++;
    }
    while (i < 364) {
      habitData.push(1);
      i++;
    }

    return habitData;
}

function AddHabitPage() {
  const [habitName, setHabitName] = useState("");

  const updateHabitName = (e) => {
    setHabitName(e.target.value);
  }

  const validateAndCreateHabit = () => {
    if (habitName.length == 0) {
      console.log("habit name is an empty string");
    }

    const userEmail = "test_user@gmail.com";
    const dateCreated = new Date();
    const habitData = createInitialHabitData();
    // const habitData = Array(364).fill(0);
    const habit = {habitName, userEmail, dateCreated, habitData};

    createHabit(db, habit);
  }
  // INFO
  // NAME OF HABIT
  // WHAT DAY YOU'RE STARTING THE HABIT -> should be the current date?
  //
  return (
    <div className="h-full flex flex-col p-5 pt-12 items-center justify-center">
      <div className="bg-white mx-auto rounded-lg shadow-md p-5 w-96">
        <p className="font-bold text-lg pb-3 text-center">
          What habit do you want to track?
        </p>
        <input
          className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline text-sm"
          type="text"
          placeholder="e.g. Drink three liters of water"
          onChange={updateHabitName}
        />
        <div className="flex flex-row justify-center">
          <button
            onClick={validateAndCreateHabit}
            className="mt-5 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddHabitPage;
