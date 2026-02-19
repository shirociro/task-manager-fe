import { useState } from "react";
import { Card, Button, Tooltip, Checkbox  } from "flowbite-react";

import { HiPencil, HiTrash } from "react-icons/hi";

export const TaskCard = ({ task, onEdit, onDelete, onCompleted }) => {

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
        <p className="text-lg font-semibold text-gray-800 dark:text-white">{task.title}</p>

        <div className="absolute top-0 right-3 z-10 flex gap-2 bg-white/70 rounded-lg p-1">
          {/* Edit */}
          <Tooltip content="Edit blog" placement="top">
            <Button
              onClick={onEdit}
              size="lg"
              className="
               !bg-transparent 
                !hover:bg-transparent 
              flex items-center justify-center p-2 bg-transparent"
            >
              <HiPencil className="w-6 h-6" color="blue" />
            </Button>
          </Tooltip>

          {/* Delete */}
          <Tooltip content="Delete blog" placement="top">
            <Button
              onClick={() => onDelete(true)}
              size="lg"
              className="   !bg-transparent 
                !hover:bg-transparent 
                !focus:ring-0  flex items-center justify-center p-2 bg-transparent"
            >
              <HiTrash className="w-6 h-6" color="red" />
            </Button>
          </Tooltip>
          <Tooltip content="Mark as completed" placement="top">
            <Button
              onClick={() => onDelete(true)}
              size="lg"
              className="   !bg-transparent 
                !hover:bg-transparent 
                !focus:ring-0  flex items-center justify-center p-2 bg-transparent"
            >
               <Checkbox
                onChange={(e) => onDelete(e.target.checked)}
                className="w-5 h-5 cursor-pointer"
              />
            </Button>
          </Tooltip>
        </div>
      </Card>
    </div>
  );
};

