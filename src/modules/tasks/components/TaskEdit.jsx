import { useState } from "react";
import { Card, Button, Checkbox } from "flowbite-react";

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
        className="h-full rounded-xl shadow-md overflow-auto flex flex-col
          transition-all duration-300 ease-in-out min-h-[250px] max-h-[250px]"
        style={{ padding: "1.5rem" }}
      >
        <div className="flex flex-col gap-3">
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
            <label htmlFor={`completed-${task.id}`} className="text-gray-700 dark:text-white">
              Completed
            </label>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleSave} className="flex-1">
              Save
            </Button>
            <Button color="gray" onClick={onCancel} className="flex-1">
              Cancel
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
