import { useState } from "react";
import { Card, Button, Tooltip } from "flowbite-react";
import { HiCheck, HiX } from "react-icons/hi";

export const UserEdit = ({ user, onSave, onCancel }) => {
  const [name, setName] = useState(user.username);

  const handleSave = () => {
    if (!name.trim()) return;
    onSave({ ...user, username: name });
  };

  return (
    <div className="relative w-full mx-auto">
      <Card
        className="h-full rounded-xl shadow-md overflow-auto flex flex-col
          transition-all duration-300 ease-in-out min-h-[150px] max-h-[150px]"
        style={{ padding: "1.5rem" }}
      >
        <div className="flex flex-col gap-3 mt-2 pt-2">
          <textarea
            placeholder="User name"
            className="p-2 rounded border border-gray-300 focus:outline-none focus:ring focus:ring-blue-400 dark:bg-gray-700 dark:text-white resize-none h-24"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
          />
          <div className="flex gap-2">
            {/* Confirm & Cancel buttons */}
            <div className="absolute top-3 right-3 z-10 flex gap-2 bg-white/70 rounded-lg p-0">
              {/* Edit */}
              <Tooltip content="Confirm" placement="top">
                <Button
                  onClick={handleSave}
                  size="lg"
                  className="!bg-transparent !hover:bg-transparent flex items-center justify-center p-2 bg-transparent"
                >
                  <HiCheck className="w-6 h-6" color="green" />
                </Button>
              </Tooltip>

              {/* Delete */}
              <Tooltip content="Cancel" placement="top">
                <Button
                  onClick={onCancel}
                  size="lg"
                  className="!bg-transparent !hover:bg-transparent !focus:ring-0 flex items-center justify-center p-2 bg-transparent"
                >
                  <HiX className="w-6 h-6" color="red" />
                </Button>
              </Tooltip>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
