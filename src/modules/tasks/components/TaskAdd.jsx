import { useState } from "react";
import { Card, Button, Checkbox, Tooltip, Select } from "flowbite-react";
import { HiCheck, HiX } from "react-icons/hi";
import { useUsers } from "@/modules/users/hooks/useUsers";

export const TaskAdd = ({ onAdd }) => {
  const { users = [] } = useUsers();
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [isCompleted, setCompleted] = useState(false);
  const [userId, setUserId] = useState("");

  const handleAdd = () => {
    if (!title.trim()) return; // prevent empty task
    if (onAdd) {
      onAdd({ title, isCompleted, userId });
    }
    // Reset form
    setTitle("");
    setUserId("");
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
            <div>
            <div className="mb-1 block">
              </div>
              <Select 
                id="users" 
                sizing="sm"
                required 
                value={userId} 
                onChange={(e) => setUserId(e.target.value)}
                >
                
              <option value="">Select a user</option>
                {users.map((user) => (
                    <option key={user.id} value={user.id}>
                    {user.username}
                    </option>
                ))}
              </Select>
            </div>
            <div className="flex items-center gap-2">
                
            <Checkbox
                id="isCompleted"
                checked={isCompleted}
                // This is the simplest "toggle" logic
                onClick={() => setCompleted(!isCompleted)} 
                readOnly></Checkbox>
              <label
                htmlFor="isCompleted"
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
