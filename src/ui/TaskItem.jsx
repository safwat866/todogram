import {useState} from "react";
import { MdDelete } from "react-icons/md";

const TaskItem = ({ value, id, onDeleteTask, timestamp }) => {
  const [showDeleteIcon, setShowDeleteIcon] = useState(false);

  const dateFormat = {
      hour: "2-digit",
      minute: "2-digit"
  };
  let taskDate = "";
  if (timestamp) {
      taskDate = timestamp?.toDate().toLocaleString("en-US",dateFormat );
  } else {
      taskDate = new Date().toLocaleString("en-US", dateFormat)
  }

  return (
    <div
      onClick={() => {
        setShowDeleteIcon((prev) => !prev);
      }}
      className="select-none rounded-lg bg-[#2563eb] px-3 py-1 min-w-40 flex flex-col relative whitespace-pre-line"
    >
      {value}
      <span className="text-mist-200 text-[12px] text-right">{taskDate}</span>
      {showDeleteIcon && (
        <MdDelete onClick={() => {onDeleteTask(id)}} className="box-content p-1 rounded-full bg-slate-600 absolute -left-10 top-1/2 text-red-400 -translate-y-1/2 text-xl" />
      )}
    </div>
  );
};

export default TaskItem;
