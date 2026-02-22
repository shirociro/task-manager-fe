import { Grid } from "@/modules/tasks/components/Grid";
import { useTasks } from "@/modules/tasks/hooks/useTasks";
export const TasksPage = () => {
  const { tasks, isLoading, isError, addTask, updateTask, deleteTask } =
    useTasks();

  if (isLoading) return <p className="text-center">Loading tasks...</p>;
  if (isError)
    return <p className="text-center text-red-500">Error loading tasks</p>;
  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-20 lg:py-[120px] w-full">
      <div className="container-fluid mx-auto px-4">
        <div className="text-center max-w-4xl mb-16 flex items-start justify-start gap-3"></div>
        <Grid
          tasks={tasks}
          onCompleted={(task) =>
            updateTask({ ...task, completed: !task.completed })
          }
          onEdit={(task) => updateTask(task)}
          onDelete={(id) => deleteTask(id)}
          onAdd={(newTask) => {
            addTask(newTask); 
          }}
        />
      </div>
    </section>
  );
};


