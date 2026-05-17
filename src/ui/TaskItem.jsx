import {useState} from "react";
import { MdDelete } from "react-icons/md";

const TaskItem = ({ value, id, onDeleteTask }) => {
  const [showDeleteIcon, setShowDeleteIcon] = useState(false);
  return (
    <div
      onClick={() => {
        setShowDeleteIcon((prev) => !prev);
      }}
      className="select-none rounded-lg bg-[#2563eb] px-3 py-1 min-w-40 flex flex-col relative whitespace-pre-wrap"
    >
      {value}
      <span className="text-mist-200 text-[12px] text-right">3:56 pm</span>
      {showDeleteIcon && (
        <MdDelete onClick={() => {onDeleteTask(id)}} className="box-content p-1 rounded-full bg-slate-600 absolute -left-10 top-1/2 text-red-400 -translate-y-1/2 text-xl" />
      )}
    </div>
  );
};

export default TaskItem;
