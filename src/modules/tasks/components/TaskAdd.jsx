import { useState } from "react";
import { Card, Button, Tooltip, Checkbox  } from "flowbite-react";

import { HiPencil, HiTrash } from "react-icons/hi";

export const TaskAdd = ({ task, onEdit, onDelete, onCompleted }) => {

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  return (
    <div className="relative w-full mx-auto">
      <Card
        className={`
            h-full rounded-xl shadow-md hover:shadow-xl overflow-hidden flex flex-col
    transition-all duration-300 ease-in-out min-h-[150px]  
        `}
        style={{ padding: '1.5rem' }} 
      >
        <p className="text-md font-semibold text-gray-800 dark:text-white">Add Task</p>
            
      </Card>
    </div>
  );
};

