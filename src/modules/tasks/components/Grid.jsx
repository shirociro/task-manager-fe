import { TaskCard } from "@/modules/tasks/components/Card";
import { TaskAdd } from "@/modules/tasks/components/TaskAdd";


export const Grid = ({ tasks, onEdit, onDelete, onCompleted }) => {
  return (
    <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      <TaskAdd />
      {tasks.map((task, index) => (
        <TaskCard
          key={index}
          task={task}
          onEdit={() => onEdit(index)}
          onDelete={() => onDelete(index)}
          onCompleted={() => onCompleted(index)}
        />
      ))}
    </div>
  );
};
