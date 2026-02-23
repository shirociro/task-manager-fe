import { useState } from "react";
import { Card, Button, Checkbox, Tooltip, Select } from "flowbite-react";
import { HiCheck, HiX } from "react-icons/hi";
import { useUsers } from "@/modules/users/hooks/useUsers";

export const TaskEdit = ({ task, onSave, onCancel }) => {
  const { users = [] } = useUsers();
  const [title, setTitle] = useState(task.title);
  const [isCompleted, setCompleted] = useState(task.completed || false);
  const [userId, setUserId] = useState(task.userId || "");

  // Validation state
  const [errors, setErrors] = useState({ title: false, userId: false });

  const handleSave = () => {
    const isTitleInvalid = !title.trim();
    const isUserInvalid = !userId;

    if (isTitleInvalid || isUserInvalid) {
      setErrors({ title: isTitleInvalid, userId: isUserInvalid });
      return;
    }

    onSave({
      ...task,
      title: title.trim(),
      completed: isCompleted,
      userId: userId,
    });
  };

  return (
    <div className="relative w-full mx-auto">
      <Card
        className="h-full rounded-xl shadow-md overflow-auto flex flex-col
          transition-all duration-300 ease-in-out min-h-[250px] max-h-[250px]"
        style={{ padding: "1.5rem" }}
      >
        <div className="flex flex-col gap-3 mt-4">
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
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.username}
                </option>
              ))}
            </Select>
          </div>

          {/* Completion Checkbox */}
          <div className="flex items-center gap-2">
            <Checkbox
              id={`completed-${task.id}`}
              checked={isCompleted}
              onChange={(e) => setCompleted(e.target.checked)}
            />
            <label
              htmlFor={`completed-${task.id}`}
              className="text-sm text-gray-700 dark:text-white cursor-pointer"
            >
              Mark as Completed
            </label>
          </div>

          {/* Action Buttons */}
          <div className="absolute top-3 right-3 z-10 flex gap-2 bg-white/70 dark:bg-gray-800/70 rounded-lg p-0">
            <Tooltip content="Confirm Changes" placement="top">
              <Button
                onClick={handleSave}
                size="lg"
                className="!bg-transparent !hover:bg-transparent !focus:ring-0 p-2"
              >
                <HiCheck className="w-6 h-6" color="green" />
              </Button>
            </Tooltip>

            <Tooltip content="Cancel" placement="top">
              <Button
                onClick={onCancel}
                size="lg"
                className="!bg-transparent !hover:bg-transparent !focus:ring-0 p-2"
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
