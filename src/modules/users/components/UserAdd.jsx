import { useState } from "react";
import { Card, Button, Checkbox } from "flowbite-react";

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
        className="h-full max-h-[250px] rounded-xl shadow-md hover:shadow-xl overflow-auto flex flex-col
          transition-all duration-300 ease-in-out min-h-[250px] cursor-pointer "
        style={{ padding: "1.5rem" }}
        onClick={() => !showForm && setShowForm(true)} // open form on click
      >
        {!showForm ? (
          <p className="text-md font-semibold text-gray-800 dark:text-white text-center">
            + Add User
          </p>
        ) : (
          <div className="flex flex-col gap-3 h-full">
            <textarea
              placeholder="User name"
              className="p-2 rounded border border-gray-300 focus:outline-none focus:ring focus:ring-blue-400 dark:bg-gray-700 dark:text-white resize-none h-24"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
            />
            <div className="flex gap-2 mt-auto">
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
