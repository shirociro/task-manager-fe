import { Grid } from "@/modules/tasks/components/Grid";
import { useTasks } from "@/modules/tasks/hooks/useTasks";
import { Alert } from "@/shared/components/Alert";
import { useIsOnline } from "@/shared/hooks/useIsOnline"; // Optional: a small hook to check navigator.onLine

export const TasksPage = () => {
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

  const isOnline = useIsOnline();

  if (isLoading) return <p className="text-center py-10">Loading tasks...</p>;
  if (isError)
    return (
      <p className="text-center py-10 text-red-500">Error loading tasks</p>
    );

  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-20 lg:py-[120px] w-full min-h-screen relative">
      {/* Alert Notification */}
      {alert.show && (
        <div className="fixed top-5 right-5 z-[10000] w-full max-w-xs transition-all">
          <Alert
            message={alert.message}
            variant={alert.type}
            onClose={() => setAlert((prev) => ({ ...prev, show: false }))}
          />
        </div>
      )}

      {/* Offline Status Banner */}
      {!isOnline && (
        <div className="fixed top-2 left-1/2 -translate-x-1/2 bg-red-800/100 text-white  pb-0 pt-2 rounded-full shadow-lg z-50 animate-pulse px-4 ">
          <p>Changes will sync when back online</p>
        </div>
      )}

      <div className="container-fluid mx-auto px-4">
        <div className="text-center max-w-4xl mb-16 flex items-start justify-start gap-3"></div>
        <Grid
          tasks={tasks}
          onCompleted={(task) =>
            updateTask({ ...task, completed: !task.completed })
          }
          onEdit={(task) => updateTask(task)}
          onDelete={(id) => deleteTask(id)}
          onAdd={(task) => addTask(task)}
        />
      </div>
    </section>
  );
};
