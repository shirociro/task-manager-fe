import { useState } from "react";
import { TaskCard } from "@/modules/tasks/components/Card";
import { TaskEdit } from "@/modules/tasks/components/TaskEdit";
import { TaskAdd } from "@/modules/tasks/components/TaskAdd";

export const Grid = ({ tasks, onEdit, onDelete, onCompleted }) => {
  const [editingTaskId, setEditingTaskId] = useState(null);

  return (
      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4"> 
      {/* First card: TaskAdd */}
      <TaskAdd />

      {/* Task Cards */}
      {tasks.map((task, index) => (
        <div key={task.id || index}>
          {editingTaskId === task.id ? (
            <TaskEdit
              task={task}
              onSave={(updatedTask) => {
                onEdit(updatedTask);    
                setEditingTaskId(null); 
              }}
              onCancel={() => setEditingTaskId(null)}
            />
          ) : (
            <TaskCard
              task={task}
              onEdit={() => setEditingTaskId(task.id)}
              onDelete={() => onDelete(index)}
              onCompleted={() => onCompleted(index)}
            />
          )}
        </div>
      ))}
    </div>
  );
};
