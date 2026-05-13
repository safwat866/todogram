import React, { useState, useEffect } from "react";
import Header from "./ui/Header";
import TaskInput from "./ui/TaskInput";
import TasksWrapper from "./ui/TasksWrapper";
import AsideMenu from "./ui/AsideMenu";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "./firebase";
import { useNavigate, useParams } from "react-router";

const auth = getAuth();

const Task = () => {
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState();
  const [menuHidden, setMenuHidden] = useState(true);
  const navigate = useNavigate();
  const auth = getAuth();
  const { id } = useParams();

  const onFetchTasks = (taskValue) => {
    setTasks(taskValue);
  };

  const onAddTask = (taskValue) => {
    setTasks((prev) => [...prev, taskValue]);
  };

  const onDeleteTask = async (taskId) => {
    // remove from ui
    setTasks(tasks.filter((task) => task.id != taskId));
    // delete from db
    const taskDoc = doc(
      db,
      "users",
      user.uid,
      "categories",
      id,
      "tasks",
      taskId,
    );
    await deleteDoc(taskDoc);
  };

  const toggleMenu = () => {
    setMenuHidden((prev) => !prev);
  };

  const singUserOut = async () => {
    await signOut(auth);
    console.log("logged out");
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) navigate("/login");
      setUser(user);
      console.log("Current User", user);
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    await signOut(auth);
    navigate('/login')
  }

  return (
    <div className="bg-slate-800 text-white h-dvh">
      <Header toggleMenu={toggleMenu} />
      <AsideMenu
        isMenuHidden={menuHidden}
        setIsMenuHidden={toggleMenu}
        user={user}
      />
      <button onClick={logout} className="p-2 bg-slate-900 cursor-pointer">logout test</button>
      <TasksWrapper
        user={user}
        tasks={tasks}
        onFetchTasks={(value) => onFetchTasks(value)}
        onDeleteTask={onDeleteTask}
      />
      <TaskInput
        user={user}
        tasks={tasks}
        onAddTask={(value) => onAddTask(value)}
      />
    </div>
  );
};

export default Task;
