import { Card, Button } from "flowbite-react";

export const TaskDelete = ({ task, onConfirm, onCancel }) => {
  return (
    <div className="relative w-full mx-auto">
      <Card
        className="h-full rounded-xl shadow-md overflow-hidden flex flex-col
          justify-center items-center transition-all duration-300 ease-in-out min-h-[250px] max-h-[250px] text-center"
        style={{ padding: "1.5rem" }}
      >
        <p className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          Are you sure you want to delete this task?
        </p>
        <p className="text-md text-gray-600 dark:text-gray-300 mb-6">
          "{task.title}"
        </p>
        <div className="flex gap-4">
          <Button color="red" onClick={onConfirm} className="flex-1">
            Delete
          </Button>
          <Button color="gray" onClick={onCancel} className="flex-1">
            Cancel
          </Button>
        </div>
      </Card>
    </div>
  );
};
