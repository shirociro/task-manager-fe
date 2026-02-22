import { useState } from "react";
import { TaskCard } from "@/modules/tasks/components/Card";
import { TaskEdit } from "@/modules/tasks/components/TaskEdit";
import { TaskAdd } from "@/modules/tasks/components/TaskAdd";
import { TaskDelete } from "@/modules/tasks/components/TaskDelete";

export const Grid = ({ tasks, onEdit, onDelete, onCompleted }) => {
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [deletingTaskId, setDeletingTaskId] = useState(null);

  return (
    <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      {/* First card: TaskAdd */}
      <TaskAdd />

      {/* Task Cards */}
      {tasks.map((task) => (
        <div key={task.id}>
          {editingTaskId === task.id ? (
            <TaskEdit
              task={task}
              onSave={(updatedTask) => {
                onEdit(updatedTask);
                setEditingTaskId(null);
              }}
              onCancel={() => setEditingTaskId(null)}
            />
          ) : deletingTaskId === task.id ? (
            <TaskDelete
              task={task}
              onConfirm={() => {
                onDelete(task.id);
                setDeletingTaskId(null);
              }}
              onCancel={() => setDeletingTaskId(null)}
            />
          ) : (
            <TaskCard
              task={task}
              onEdit={() => setEditingTaskId(task.id)}
              onDelete={() => setDeletingTaskId(task.id)} // trigger delete mode
              onCompleted={() => onCompleted(task.id)}
            />
          )}
        </div>
      ))}
    </div>
  );
};
