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
import { useTranslation } from 'react-i18next';

function Users() {
  const { t } = useTranslation();
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
      toast.success(t('deleted'));

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
        {t('newUser')}
      </Button>

      <Space medium />

      <table>
        <thead>
          <tr>
            <th>{t('name')}</th>
            <th>{t('mail')}</th>
            <th>{t('admin')}</th>
            <th>{t('patologies')}</th>
            <th>{t('problem')}</th>
            <th>{t('allergies')}</th>
            <th>{t('registered')}</th>
            <th>{t('paid')}</th>
            <th>{t('edit')}</th>
            <th>{t('delete')}</th>
          </tr>
        </thead>

        <tbody>
          {usersData?.length > 0 &&
            usersData.map(ele => (
              <tr key={ele._id}>
                <td>{ele.name}</td>
                <td>{ele.email}</td>
                <td>{ele.isAdmin ? t('admin') : ''}</td>
                <td>{ele.patologies.length > 0 ? t('yes') : ''}</td>
                <td>{ele.problems ? t('yes') : ''}</td>
                <td>{ele.allergies.length > 0 ? t('yes') : ''}</td>
                <td>{ele.isFullRegistered ? t('yes') : ''}</td>
                <td>{ele.hasPaid ? t('yes') : ''}</td>
                <td>
                  <Button
                    onlyIcon
                    iconLeft={faEdit}
                    onClick={() => setshowNewUserModal(ele)}
                  />
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

      {showNewUserModal && (
        <Modal onClose={setshowNewUserModal} isSecondary>
          <NewUser
            onCreate={handleCreate}
            onCancel={() => setshowNewUserModal(false)}
            user={showNewUserModal}
          />
        </Modal>
      )}

      {showDeleteUserModal && (
        <ConfirmModal
          onConfirm={handleDelete}
          onClose={setshowDeleteUserModal}
          title={t('deleteMarathon')}
          text={`${t('confirmDelete')} ${showDeleteUserModal.name}`}
        />
      )}
    </div>
  );
}

export default Users;
