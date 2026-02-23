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

  // Validation state
  const [errors, setErrors] = useState({ title: false, userId: false });

  const handleAdd = (e) => {
    // Prevent event bubbling if necessary
    e?.stopPropagation();

    // 1. Validate fields
    const isTitleInvalid = !title.trim();
    const isUserInvalid = !userId;

    if (isTitleInvalid || isUserInvalid) {
      setErrors({ title: isTitleInvalid, userId: isUserInvalid });
      return;
    }

    if (onAdd) {
      onAdd({
        title: title.trim(),
        isCompleted: isCompleted,
        userId: userId,
      });
    }

    // 3. Reset everything
    resetForm();
  };

  const resetForm = () => {
    setTitle("");
    setUserId("");
    setCompleted(false);
    setErrors({ title: false, userId: false });
    setShowForm(false);
  };

  return (
    <div className="relative w-full mx-auto">
      <Card
        className={`h-full max-h-[250px] rounded-xl shadow-md hover:shadow-xl overflow-auto flex flex-col
          transition-all duration-300 ease-in-out min-h-[250px] ${!showForm ? "cursor-pointer" : ""}`}
        style={{ padding: "1.5rem" }}
        onClick={() => !showForm && setShowForm(true)}
      >
        {!showForm ? (
          <p className="text-md font-semibold text-gray-800 dark:text-white text-center">
            + Add Task
          </p>
        ) : (
          <div
            className="flex flex-col gap-3 h-full mt-4 "
            onClick={(e) => e.stopPropagation()}
          >
            {/* Title Input */}
            <textarea
              placeholder="Task title"
              className={`p-2 rounded border text-sm focus:outline-none focus:ring-1 resize-none h-24 dark:bg-gray-700 dark:text-white ${
                errors.title
                  ? "border-red-500 focus:ring-red-500 ring-1 ring-red-500"
                  : "border-gray-300 focus:ring-blue-400"
              }`}
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (errors.title)
                  setErrors((prev) => ({ ...prev, title: false }));
              }}
              autoFocus
            />

            {/* User Select */}
            <div>
              <Select
                id="users"
                sizing="sm"
                color={errors.userId ? "failure" : "gray"}
                value={userId}
                onChange={(e) => {
                  setUserId(e.target.value);
                  if (errors.userId)
                    setErrors((prev) => ({ ...prev, userId: false }));
                }}
              >
                <option value="">Select a user</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.username}
                  </option>
                ))}
              </Select>
            </div>

            {/* Checkbox (Excluded from requirement check) */}
            <div className="flex items-center gap-2">
              <Checkbox
                id="isCompleted"
                checked={isCompleted}
                onChange={() => setCompleted(!isCompleted)}
              />
              <label
                htmlFor="isCompleted"
                className="text-sm text-gray-700 dark:text-white cursor-pointer"
              >
                Mark as Completed
              </label>
            </div>

            {/* Action Buttons */}
            <div className="absolute top-3 right-3 z-10 flex gap-2 bg-white/70 dark:bg-gray-800/70 rounded-lg p-0">
              <Tooltip content="Confirm" placement="top">
                <Button
                  onClick={handleAdd}
                  size="lg"
                  className="!bg-transparent !hover:bg-transparent !focus:ring-0 p-2"
                >
                  <HiCheck className="w-6 h-6" color="green" />
                </Button>
              </Tooltip>

              <Tooltip content="Cancel" placement="top">
                <Button
                  onClick={resetForm}
                  size="lg"
                  className="!bg-transparent !hover:bg-transparent !focus:ring-0 p-2"
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
