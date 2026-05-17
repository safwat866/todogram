import React, { useRef, useState } from "react";
import { IoSend } from "react-icons/io5";
import { collection, addDoc } from "firebase/firestore";
import { useParams } from "react-router";
import { db } from "../firebase";

const TaskInput = ({ user, tasks, onAddTask }) => {
  const taskInput = useRef("");
  const [task, setTask] = useState("");
  const { id } = useParams();

  const handleTaskInput = (e) => {
    setTask(e.target.value);
    const input = taskInput.current;
    input.style.height = "auto"; // reset
    input.style.height = input.scrollHeight + "px"; // grow
  };

  const handleKeyDown = (e) => {
    if (isMobileDevice()) return;
    if (e.key == "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const isMobileDevice = () => {
    if (typeof window === "undefined") return false;
    return "ontouchstart" in window || navigator.maxTouchPoints > 0;
  };

  const handleSubmit = async () => {
    if (!task || !id || !user) return;
    taskInput.current.style.height = "auto";

    const taskObj = {
      value: task,
      sendDate: new Date(),
    };

    setTask("");
    // update ui immediatly
    // onAddTask(taskObj);

    const tasksRef = collection(db, `users/${user.uid}/categories/${id}/tasks`);
    try {
      await addDoc(tasksRef, taskObj);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="fixed bottom-0 mb-4 w-full px-4 bg-slate-800 pt-1">
      <div className="flex items-end gap-3">
        {/* Textarea */}
        <textarea
          ref={taskInput}
          rows={1}
          placeholder="Type a message..."
          className="flex-1 bg-gray-900 text-white placeholder-gray-400 resize-none outline-none max-h-40 rounded-lg py-3 px-5"
          value={task}
          onChange={(e) => handleTaskInput(e)}
          onKeyDown={(e) => handleKeyDown(e)}
        />

        {/* Send Button */}
        <button
          onClick={handleSubmit}
          className="w-12 h-12 flex items-center justify-center bg-[#2563eb] active:scale-95 text-white rounded-full transition mb-0.5 text-xl"
        >
          <IoSend />
        </button>
      </div>
    </div>
  );
};

export default TaskInput;
