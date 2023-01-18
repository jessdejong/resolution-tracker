import { Link, Route, Routes } from "react-router-dom";
import Sidebar from "./Sidebar";

import Dashboard from "./Dashboard";
import AddHabitPage from "./AddHabitPage";

function AppHeader() {
  // Eventually, maybe, split into sections like Long Term Goals, Short Term Goals, Completed/Archived Goals
  return (
    <div className="w-full bg-white h-10 shadow-md flex flex-row items-center justify-between fixed z-10">
      <Link to="/">
        <p className="text-lg font-bold pl-5">Resolution Tracker 2023</p>
      </Link>
      <div className="flex flex-row items-center justify-center text-blue-500 font-bold">
        <Link to="/" className="text-lg">Let's track a new resolution!</Link>
      </div>
      <div className="flex flex-row items-center justify-end">
        <Link
          to="add-habit"
          className="flex flex-row items-center  hover:bg-slate-100 h-10 px-3"
        >
          <p className="font-bold">Add Habit</p>
        </Link>
        <Link
          to="remove-habit"
          className="flex flex-row items-center  hover:bg-slate-100 h-10 px-3"
        >
          <p className="font-bold">Remove Habit</p>
        </Link>
        <Link
          to="login"
          className="flex flex-row items-center  hover:bg-slate-100 h-10 px-5"
        >
          <p className="font-bold text-blue-500">Login</p>
        </Link>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="h-full">
      <AppHeader />
      <div className="h-full">
        <Routes className="h-full">
          <Route path="/" element={<Dashboard />} />
          <Route path="add-habit" element={<AddHabitPage/>}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
