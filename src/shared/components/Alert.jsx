import { Toast } from "flowbite-react";
import {
  HiCheckCircle,
  HiExclamationCircle,
  HiTrash,
  HiInformationCircle,
  HiX,
} from "react-icons/hi";

const variants = {
  success: {
    icon: <HiCheckCircle className="h-5 w-5" />,
    color: "bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200",
    bar: "bg-green-500",
  },
  destructive: {
    icon: <HiTrash className="h-5 w-5" />,
    color: "bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200",
    bar: "bg-red-500",
  },
  warning: {
    icon: <HiExclamationCircle className="h-5 w-5" />,
    color:
      "bg-orange-100 text-orange-500 dark:bg-orange-700 dark:text-orange-200",
    bar: "bg-orange-500",
  },
  info: {
    icon: <HiInformationCircle className="h-5 w-5" />,
    color: "bg-blue-100 text-blue-500 dark:bg-blue-800 dark:text-blue-200",
    bar: "bg-blue-500",
  },
};

export const Alert = ({ message, variant = "success", onClose }) => {
  const style = variants[variant] || variants.success;

  return (
    <div className="relative overflow-hidden rounded-lg shadow-xl w-full max-w-sm">
      <Toast>
        {/* Icon */}
        <div
          className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${style.color}`}
        >
          {style.icon}
        </div>

        {/* Message */}
        <div className="ml-3 text-sm font-normal flex-1">{message}</div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
        >
          <HiX className="h-5 w-5" />
        </button>
      </Toast>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 h-1 w-full bg-gray-200 dark:bg-gray-700">
        <div className={`h-full animate-progress ${style.bar}`} />
      </div>
    </div>
  );
};
