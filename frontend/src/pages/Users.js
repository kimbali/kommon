import React, { useState } from 'react';
import Button from '../components/button/Button';
import { faAdd, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import Space from '../components/space/Space';
import Modal from '../components/modal/Modal';
import NewUser from '../components/newUser/NewUser';
import {
  useDeleteUserMutation,
  useGetUsersQuery,
} from '../slices/usersApiSlices';
import toast from 'react-hot-toast';
import ConfirmModal from '../components/modal/ConfirmModal';

function Users() {
  const [showNewUserModal, setshowNewUserModal] = useState(false);
  const [showDeleteUserModal, setshowDeleteUserModal] = useState(false);

  const { data: usersData, refetch: refetchUsers } = useGetUsersQuery({});
  const [deleteUser] = useDeleteUserMutation();

  const handleCreate = async () => {
    setshowNewUserModal(false);

    await refetchUsers();
  };

  const handleDelete = async () => {
    try {
      await deleteUser(showDeleteUserModal._id);

      setshowDeleteUserModal(false);
      toast.success('Usuario eliminado');

      refetchUsers();
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className='data-table'>
      <Button
        onClick={() => setshowNewUserModal(true)}
        isPrimary
        iconLeft={faAdd}
      >
        new user
      </Button>

      {showNewUserModal && (
        <Modal onClose={setshowNewUserModal} isSecondary>
          <NewUser
            onCreate={handleCreate}
            onCancel={() => setshowNewUserModal(false)}
          />
        </Modal>
      )}

      <Space medium />

      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Admin</th>
            <th>Patologias</th>
            <th>Problemas</th>
            <th>Alergias</th>
            <th>Registrado</th>
            <th>Pagado</th>
            <th>Editar</th>
            <th>Eliminar</th>
          </tr>
        </thead>

        <tbody>
          {usersData?.length > 0 &&
            usersData.map(ele => (
              <tr key={ele._id}>
                <td>{ele.name}</td>
                <td>{ele.email}</td>
                <td>{ele.isAdmin ? 'admin' : ''}</td>
                <td>{ele.patologies.length > 0 ? 'yes' : ''}</td>
                <td>{ele.problems ? 'yes' : ''}</td>
                <td>{ele.allergies.length > 0 ? 'yes' : ''}</td>
                <td>{ele.isFullRegistered ? 'yes' : ''}</td>
                <td>{ele.hasPaid ? 'yes' : ''}</td>
                <td>
                  <Button onlyIcon iconLeft={faEdit} />
                </td>
                <td>
                  <Button
                    onClick={() => setshowDeleteUserModal(ele)}
                    onlyIcon
                    iconLeft={faTrash}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {showDeleteUserModal && (
        <ConfirmModal
          onConfirm={handleDelete}
          onClose={setshowDeleteUserModal}
          title='Delete marathon'
          text={`Are you sure you whant to delete: ${showDeleteUserModal.name}`}
        />
      )}
    </div>
  );
}

export default Users;
