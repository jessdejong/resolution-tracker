import { useEffect, useState } from "react";
import { db, getHabits } from "./firebase";
import HabitCalendar from "./HabitCalendar";

function Dashboard() {
  const [habits, setHabits] = useState([]);

  const getHabitsAsync = async () => {
    const userEmail = "test_user@gmail.com";
    const result = await getHabits(db, userEmail);
    setHabits(result);
  }

  useEffect(() => {
    getHabitsAsync();
  }, []);

  console.log(habits);

  return (
    <div id="habit-container" className="flex flex-col p-5 pt-12 items-center">
      {habits.map((habit, idx) => {
        return <HabitCalendar habit={habit} index={idx + 1} />
      })}
    </div>
  );
}

export default Dashboard;
