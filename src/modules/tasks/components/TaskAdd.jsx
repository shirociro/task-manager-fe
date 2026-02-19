import { useState } from "react";
import { Card, Button, Checkbox } from "flowbite-react";

export const TaskAdd = ({ onAdd }) => {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [completed, setCompleted] = useState(false);

  const handleAdd = () => {
    if (!title.trim()) return; 
    if (onAdd) {
      onAdd({ title, completed });
    }
    setTitle("");
    setCompleted(false);
    setShowForm(false);
  };

  return (
    <div className="relative w-full mx-auto">
      <Card
        className="h-full rounded-xl shadow-md hover:shadow-xl overflow-hidden flex flex-col
        transition-all duration-300 ease-in-out min-h-[250px] cursor-pointer max-h-[250px]"
        style={{ padding: "1.5rem" }}
        onClick={() => !showForm && setShowForm(true)} 
      >
        {!showForm ? (
          <p className="text-md font-semibold text-gray-800 dark:text-white text-center">
            + Add Task
          </p>
        ) : (
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
                id="completed"
                checked={completed}
                onChange={(e) => setCompleted(e.target.checked)}
              />
              <label htmlFor="completed" className="text-gray-700 dark:text-white">
                Completed
              </label>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleAdd} className="flex-1">
                Add
              </Button>
              <Button
                color="gray"
                onClick={() => setShowForm(false)}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};
