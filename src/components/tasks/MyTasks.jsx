import {
  CheckIcon,
  DocumentMagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { updateStatus, userTasks } from "../../redux/features/tasks/tasksSlice";
import TaskDetailsModal from "./taskDetailsModal";
import { useEffect, useState } from "react";

const MyTasks = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTask, setSeletedTask] = useState([]);
  const dispatch = useDispatch();

  const { tasks, userSpecificTasks } = useSelector((state) => state.tasksSlice);
  const { name: userName } = useSelector((state) => state.userSlice);

  useEffect(() => {
    dispatch(userTasks(userName));
  }, [userName, dispatch, tasks]);

  const handleClick = (id) => {
    setIsOpen(true);
    const task = tasks.find((task) => task.id == id);
    setSeletedTask(task);
  };

  return (
    <div>
      <TaskDetailsModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        task={selectedTask}
      />
      <h1 className="text-center text-xl my-3">
        My Total Tasks: {userSpecificTasks.length}
      </h1>
      <div className=" h-[750px] overflow-auto space-y-3">
        {userSpecificTasks.map((task) => (
          <div
            key={task.id}
            className="bg-secondary/10 rounded-md p-3 flex justify-between"
          >
            <h1>{task.title}</h1>
            <div className="flex gap-3">
              <button
                onClick={() => handleClick(task.id)}
                className="grid place-content-center"
                title="Details"
              >
                <DocumentMagnifyingGlassIcon className="w-5 h-5 text-primary" />
              </button>

              <button
                onClick={() =>
                  dispatch(updateStatus({ id: task.id, status: "done" }))
                }
                className="grid place-content-center"
                title="Done"
              >
                <CheckIcon className="w-5 h-5 text-primary" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyTasks;
