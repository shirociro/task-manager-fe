import { Card, Button, Tooltip } from "flowbite-react";
import { HiCheck, HiX } from "react-icons/hi";

export const TaskDelete = ({ task, onConfirm, onCancel }) => {
  return (
    <div className="relative w-full mx-auto">
      <Card
        className="h-full rounded-xl shadow-md overflow-hidden flex flex-col
          justify-center items-center transition-all duration-300 ease-in-out min-h-[250px] max-h-[250px] text-center bg-red-100/70"
        style={{ padding: "1.5rem" }}
      >
        <div className="absolute top-3 right-3 z-10 flex gap-2 bg-white/70 rounded-lg p-0">
          {/* Edit */}
          <Tooltip content="Edit blog" placement="top">
            <Button
              size="lg"
              className="!bg-transparent !hover:bg-transparent flex items-center justify-center p-2 bg-transparent"
              onClick={onConfirm}
            >
              <HiCheck className="w-6 h-6" color="blue" />
            </Button>
          </Tooltip>

          {/* Delete */}
          <Tooltip content="Delete blog" placement="top">
            <Button
              size="lg"
              className="!bg-transparent !hover:bg-transparent !focus:ring-0 flex items-center justify-center p-2 bg-transparent"
              onClick={onCancel}
            >
              <HiX className="w-6 h-6" color="red" />
            </Button>
          </Tooltip>
        </div>
        <div className="justify-center items-center">
          <p className="text-lg font-semibold text-gray-800 dark:text-white mb-4 mt-6 ">
            Are you sure you want to delete this task?
          </p>
          <p className="text-md text-gray-600 dark:text-gray-300 mb-6">
            "{task.title}"
          </p>
        </div>
      </Card>
    </div>
  );
};
