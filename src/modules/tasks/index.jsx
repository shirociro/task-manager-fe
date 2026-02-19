import { Grid } from "@/modules/tasks/components/Grid"
export const TasksPage = () => {
  const tasks = {
    data: [
      {
        id: 1,
        title: "This is a sample task title",
        completed: false,
      },
      {
        id: 2,
        title: "Sample Task",
        completed: true,
      },
    ],
  };

  // Toggle completed status
  const handleCompleted = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Handle edit 
  const handleEdit = (id) => {
    const task = tasks.find((t) => t.id === id);
    console.log("Edit task:", task);
  };

  // Delete task
  const handleDelete = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-20 lg:py-[120px] w-full">
      <div className="container-fluid mx-auto px-4">
        <div className="text-center max-w-4xl mb-16 flex items-start justify-start gap-3">
        </div>
          <Grid
            tasks={tasks.data}
            onCompleted={(index) => handleCompleted(index)}
            onEdit={(index) => handleEdit(index)}
            onDelete={(index) => handleDelete(index)}
          />

      </div>
    </section>
  );
};

