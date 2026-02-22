import { Grid } from "@/modules/users/components/Grid";
import { useUsers } from "@/modules/users/hooks/useUsers";
export const UsersPage = () => {
  const { users, isLoading, isError, addUser, updateUser, deleteUser } =
    useUsers();

  if (isLoading) return <p className="text-center">Loading users...</p>;
  if (isError)
    return <p className="text-center text-red-500">Error loading users</p>;
  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-20 lg:py-[120px] w-full">
      <div className="container-fluid mx-auto px-4">
        <div className="text-center max-w-4xl mb-16 flex items-start justify-start gap-3"></div>
        <Grid
          users={users}
          onCompleted={(user) =>
            updateUser({ ...user, completed: !user.completed })
          }
          onEdit={(user) => updateUser(user)}
          onDelete={(id) => deleteUser(id)}
          onAdd={(newUser) => addUser(newUser)}
        />
      </div>
    </section>
  );
};
