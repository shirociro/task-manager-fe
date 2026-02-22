import { useState } from "react";
import { UserCard } from "@/modules/users/components/Card";
import { UserEdit } from "@/modules/users/components/UserEdit";
import { UserAdd } from "@/modules/users/components/UserAdd";
import { UserDelete } from "@/modules/users/components/UserDelete";

export const Grid = ({ users, onAdd, onEdit, onDelete, onCompleted }) => {
  const [editingUserId, setEditingUserId] = useState(null);
  const [deletingUserId, setDeletingUserId] = useState(null);

  return (
    <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      {/* First card: UserAdd */}
      <UserAdd onAdd={onAdd} />

      {/* User Cards */}
      {users.map((user) => (
        <div key={user.id}>
          {editingUserId === user.id ? (
            <UserEdit
              user={user}
              onSave={(updatedUser) => {
                onEdit(updatedUser);
                setEditingUserId(null);
              }}
              onCancel={() => setEditingUserId(null)}
            />
          ) : deletingUserId === user.id ? (
            <UserDelete
              user={user}
              onConfirm={() => {
                onDelete(user.id);
                setDeletingUserId(null);
              }}
              onCancel={() => setDeletingUserId(null)}
            />
          ) : (
            <UserCard
              user={user}
              onEdit={() => setEditingUserId(user.id)}
              onDelete={() => setDeletingUserId(user.id)} // trigger delete mode
              onCompleted={() => onCompleted(user.id)}
            />
          )}
        </div>
      ))}
    </div>
  );
};
