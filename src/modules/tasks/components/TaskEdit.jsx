import { useState } from "react";
import { Card, Button, Checkbox, Tooltip } from "flowbite-react";
import { HiCheck, HiX } from "react-icons/hi";

export const TaskEdit = ({ task, onSave, onCancel }) => {
  const [title, setTitle] = useState(task.title);
  const [completed, setCompleted] = useState(task.completed || false);

  const handleSave = () => {
    if (!title.trim()) return;
    onSave({ ...task, title, completed });
  };

  return (
    <div className="relative w-full mx-auto">
      <Card
        className={`h-full rounded-xl shadow-md overflow-auto flex flex-col
          transition-all duration-300 ease-in-out min-h-[250px] max-h-[250px`}
        style={{ padding: "1.5rem" }}
      >
        <div className="flex flex-col gap-3 mt-4 pt-4">
          <textarea
            placeholder="Task title"
            className="p-2 rounded border border-gray-300 focus:outline-none focus:ring focus:ring-blue-400 dark:bg-gray-700 dark:text-white resize-none h-24"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
          />
          <div className="flex items-center gap-2">
            <Checkbox
              id={`completed-${task.id}`}
              checked={completed}
              onChange={(e) => setCompleted(e.target.checked)}
            />
            <label
              htmlFor={`completed-${task.id}`}
              className="text-gray-700 dark:text-white"
            >
              Completed
            </label>
          </div>

          <div className="absolute top-3 right-3 z-10 flex gap-2 bg-white/70 rounded-lg p-0">
            {/* Edit */}
            <Tooltip content="Confirm" placement="top">
              <Button
                onClick={handleSave}
                size="lg"
                className="!bg-transparent !hover:bg-transparent flex items-center justify-center p-2 bg-transparent"
              >
                <HiCheck className="w-6 h-6" color="green" />
              </Button>
            </Tooltip>

            {/* Delete */}
            <Tooltip content="Cancel" placement="top">
              <Button
                onClick={onCancel}
                size="lg"
                className="!bg-transparent !hover:bg-transparent !focus:ring-0 flex items-center justify-center p-2 bg-transparent"
              >
                <HiX className="w-6 h-6" color="red" />
              </Button>
            </Tooltip>
          </div>
        </div>
      </Card>
    </div>
  );
};
