import {
  CheckIcon,
  DocumentMagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import { useDispatch, useSelector } from 'react-redux';
import { updateStatus } from '../../redux/features/tasks/tasksSlice';
import TaskDetailsModal from './taskDetailsModal';
import { useState } from 'react';

const MyTasks = ({myTasks}) => {
const {tasks} = useSelector((state) => state.tasksSlice);
const dispatch = useDispatch();
const [isOpen, setIsOpen] = useState(false);
 
const updatedStatus = 'done';
const [selectedTask, setSeletedTask] = useState({});
console.log(selectedTask);
const handleClick = (id) => {
  setIsOpen(true);
  const task = tasks.find((task) => task.id == id);
  setSeletedTask(task);
}

  return (
    <div>
      <h1 className="text-xl my-3">My Tasks {tasks.length}</h1>
      <div className=" h-[750px] overflow-auto space-y-3">
        {
          myTasks.map((task) => 
          <div
          key={task.id}
          className="bg-secondary/10 rounded-md p-3 flex justify-between"
        >
          <h1>{task.title}</h1>
          <div className="flex gap-3">
            <button onClick={() => handleClick(task.id)} className="grid place-content-center" title="Details">
              <DocumentMagnifyingGlassIcon className="w-5 h-5 text-primary" />
            </button>
            <TaskDetailsModal isOpen={isOpen} setIsOpen={setIsOpen} task={selectedTask}/>
            <button  onClick={() => dispatch(updateStatus({id:task.id, status: updatedStatus}))} className="grid place-content-center" title="Done">
              <CheckIcon className="w-5 h-5 text-primary" />
            </button>
          </div>
        </div>
          )
        }
      </div>
    </div>
  );
};

export default MyTasks;
