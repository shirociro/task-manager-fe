import { useState } from "react";
import { Card, Button, Checkbox, Tooltip } from "flowbite-react";
import { HiCheck, HiX } from "react-icons/hi";

export const UserAdd = ({ onAdd }) => {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [completed, setCompleted] = useState(false);

  const handleAdd = () => {
    if (!name.trim()) return; // prevent empty user
    if (onAdd) {
      onAdd({ name, completed });
    }
    // Reset form
    setName("");
    setCompleted(false);
    setShowForm(false);
  };

  return (
    <div className="relative w-full mx-auto">
      <Card
        className="h-full max-h-[150px] rounded-xl shadow-md hover:shadow-xl overflow-auto flex flex-col
          transition-all duration-300 ease-in-out min-h-[150px] cursor-pointer "
        style={{ padding: "1.5rem" }}
        onClick={() => !showForm && setShowForm(true)} // open form on click
      >
        {!showForm ? (
          <p className="text-md font-semibold text-gray-800 dark:text-white text-center">
            + Add User
          </p>
        ) : (
          <div className="flex flex-col gap-3 h-full pt-2 mt-2">
            <textarea
              placeholder="User name"
              className="p-2 rounded border border-gray-300 focus:outline-none focus:ring focus:ring-blue-400 dark:bg-gray-700 dark:text-white resize-none h-24"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
            />
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
