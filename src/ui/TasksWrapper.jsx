import React, { useState, useEffect, useRef } from "react";
import TaskItem from "./TaskItem";
import { getDocs, collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { useParams } from "react-router";

const TasksWrapper = ({ user, tasks, onFetchTasks, onDeleteTask }) => {
  const wrapper = useRef(null);
  const { id } = useParams();

  useEffect(() => {
    const el = wrapper.current;
    el.scrollTo(0, el.scrollHeight);
  }, [tasks]);

  useEffect(() => {
    if (!user || !id) return;
    const tasksRef = collection(db, `users/${user.uid}/categories/${id}/tasks`);
    const unsub = onSnapshot(tasksRef, (snapshot) => {
      let tasksArr = [];
      snapshot.forEach((task) => {
        tasksArr.push({
          id: task.id,
          ...task.data(),
        });
      });
      onFetchTasks(tasksArr);
    });

    return () => {
      unsub();
    };
  }, [user, id]);

  return (
    <div
      ref={wrapper}
      className="flex flex-col items-end px-4 py-6 h-[calc(100dvh-130px)] overflow-y-auto"
    >
      <div className="flex flex-col items-end max-w-70 gap-3 mt-auto">
        {tasks &&
          tasks.map((task) => (
            <TaskItem
              key={task.id}
              id={task.id}
              value={task.value}
              onDeleteTask={onDeleteTask}
            />
          ))}
      </div>
    </div>
  );
};

export default TasksWrapper;
