import { Grid } from "@/modules/tasks/components/Grid";
import { useTasks } from "@/modules/tasks/hooks/useTasks";
import { Alert } from "@/shared/components/Alert";

export const TasksPage = () => {
  // 1. ADD 'alert' HERE 🚩
  const {
    tasks,
    isLoading,
    isError,
    addTask,
    updateTask,
    deleteTask,
    alert,
    setAlert,
  } = useTasks();

  if (isLoading) return <p className="text-center">Loading tasks...</p>;
  if (isError)
    return <p className="text-center text-red-500">Error loading tasks</p>;

  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-20 lg:py-[120px] w-full min-h-screen relative">
      {/* 2. Simplified Alert Container 🚩 */}
      {alert.show && (
        <div className="fixed top-5 right-5 z-[10000] w-full max-w-xs transition-all">
          <Alert
            message={alert.message}
            variant={alert.type}
            onClose={() => setAlert((prev) => ({ ...prev, show: false }))}
          />
        </div>
      )}

      <div className="container-fluid mx-auto px-4">
        <div className="text-center max-w-4xl mb-16 flex items-start justify-start gap-3"></div>

        <Grid
          tasks={tasks}
          onCompleted={(task) => updateTask(task)}
          onEdit={(task) => updateTask(task)}
          onDelete={(id) => deleteTask(id)}
          onAdd={(newTask) => addTask(newTask)}
        />
      </div>
    </section>
  );
};
