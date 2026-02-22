import { useState } from "react";
import { Card, Button, Checkbox, Tooltip } from "flowbite-react";
import { HiCheck, HiX } from "react-icons/hi";

export const TaskAdd = ({ onAdd }) => {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [completed, setCompleted] = useState(false);

  const handleAdd = () => {
    if (!title.trim()) return; // prevent empty task
    if (onAdd) {
      onAdd({ title, completed });
    }
    // Reset form
    setTitle("");
    setCompleted(false);
    setShowForm(false);
  };

  return (
    <div className="relative w-full mx-auto">
      <Card
        className="h-full max-h-[250px] rounded-xl shadow-md hover:shadow-xl overflow-auto flex flex-col
          transition-all duration-300 ease-in-out min-h-[250px] cursor-pointer "
        style={{ padding: "1.5rem" }}
        onClick={() => !showForm && setShowForm(true)} // open form on click
      >
        {!showForm ? (
          <p className="text-md font-semibold text-gray-800 dark:text-white text-center">
            + Add Task
          </p>
        ) : (
          <div className="flex flex-col gap-3 h-full mt-4 pt-4">
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
              <label
                htmlFor="completed"
                className="text-gray-700 dark:text-white"
              >
                Completed
              </label>
            </div>
            <div className="absolute top-3 right-3 z-10 flex gap-2 bg-white/70 rounded-lg p-0">
              {/* Edit */}
              <Tooltip content="Confirm" placement="top">
                <Button
                  onClick={handleAdd}
                  size="lg"
                  className="!bg-transparent !hover:bg-transparent flex items-center justify-center p-2 bg-transparent"
                >
                  <HiCheck className="w-6 h-6" color="green" />
                </Button>
              </Tooltip>

              {/* Delete */}
              <Tooltip content="Cancel" placement="top">
                <Button
                  onClick={() => setShowForm(false)}
                  size="lg"
                  className="!bg-transparent !hover:bg-transparent !focus:ring-0 flex items-center justify-center p-2 bg-transparent"
                >
                  <HiX className="w-6 h-6" color="red" />
                </Button>
              </Tooltip>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};
