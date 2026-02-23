import { Grid } from "@/modules/users/components/Grid";
import { useUsers } from "@/modules/users/hooks/useUsers";
import { Alert } from "@/shared/components/Alert";
import { useIsOnline } from "@/shared/hooks/useIsOnline";

export const UsersPage = () => {
  const {
    users,
    isLoading,
    isError,
    addUser,
    updateUser,
    deleteUser,
    alert,
    setAlert,
  } = useUsers();
  const isOnline = useIsOnline();

  if (isLoading) return <p className="text-center">Loading users...</p>;
  if (isError)
    return <p className="text-center text-red-500">Error loading users</p>;
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
          users={users}
          onCompleted={(user) => updateUser({ ...user })}
          onEdit={(user) => updateUser(user)}
          onDelete={(id) => deleteUser(id)}
          onAdd={(newUser) => addUser(newUser)}
        />
      </div>
    </section>
  );
};
