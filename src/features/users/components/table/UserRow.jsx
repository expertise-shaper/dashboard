import { useState } from "react";
import { MoreVertical, CheckCircle, XOctagon, UserCheck, User } from "react-feather";
import useStore from "@users/store";
import { toast } from "react-toastify";

const UserRow = ({ user }) => {
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [isEditModalOpen, setEditModalOpen] = useState(false);

    const removeUser = useStore((state) => state.removeUser);

    const ban = useStore((state) => state.banUser);
    const unban = useStore((state) => state.unbanUser);

    const banUser = (user) => {
        ban(user).then(() => {
            toast.success("User banned");
        });
    };

    const unbanUser = (user) => {
        unban(user).then(() => {
            toast.success("User unbanned");
        });
    };

    const deleteUser = (user) => {
        removeUser(user.id);
    };

    const editUser = (user) => {
        console.log("edit user", user.name);
    };

    return (
        <tr>
            <th>
                <label>
                    <input
                        type="checkbox"
                        className="checkbox checkbox-select"
                        onChange={(e) => handleChange(e)}
                    />
                </label>
            </th>
            <td>
                <div className="flex items-center space-x-3">
                    <div className="avatar cursor-pointer">
                        <User size={16}></User>
                    </div>
                    <div>
                        <div className="font-bold">{user.name}</div>
                        <div className="text-sm opacity-50 lowercase">{user.email}</div>
                    </div>
                </div>
            </td>
            <td>
                <div className="badge bg-accent/50 badge-sm p-3 mb-2">
                    <span className="text-primary-t">{user.role}</span>
                </div>
                {user.verified && (
                    <>
                        <div className="flex gap-1 items-center text-emerald-300">
                            <CheckCircle size={20} />
                            <span className="text-xs">Verified</span>
                        </div>
                    </>
                )}
            </td>
            <td>
                <div className="flex gap-2 items-center">
                    <div className="text-xs text-gray-500">
                        {/* format createdAt */}
                        {user.createdAt.slice(0, 10)}
                    </div>
                </div>
            </td>
            <td>
                {user.banned ? (
                    <div
                        className="text-emerald-400 cursor-pointer hover:text-emerald-500"
                        onClick={() => {
                            unbanUser(user);
                        }}
                    >
                        <UserCheck size={20} />
                    </div>
                ) : (
                    <div
                        className="text-red-400 cursor-pointer hover:text-red-500"
                        onClick={() => {
                            banUser(user);
                        }}
                    >
                        <XOctagon size={20} />
                    </div>
                )}
            </td>

            {/* <th>
                <RowDropdown
                    element={
                        <div className="btn btn-ghost btn-xs cursor-pointer">
                            <span className="text-xs font-bold">
                                <MoreVertical size={20} />
                            </span>
                        </div>
                    }
                    onEditClick={() => setEditModalOpen(true)}
                    onDeleteClick={() => setDeleteModalOpen(true)}
                />
                <UserDeleteModal
                    user={user}
                    openNow={isDeleteModalOpen}
                    onClose={() => setDeleteModalOpen(false)}
                    onDelete={(u) => deleteUser(u)}
                ></UserDeleteModal>
                <UserEditModal
                    user={user}
                    openNow={isEditModalOpen}
                    onClose={() => setEditModalOpen(false)}
                    onEdit={(u) => editUser(u)}
                ></UserEditModal>
            </th> */}
        </tr>
    );
};

export default UserRow;
