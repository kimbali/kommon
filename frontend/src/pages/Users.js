import React, { useState } from 'react';
import Button from '../components/button/Button';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import Space from '../components/space/Space';
import Modal from '../components/modal/Modal';
import NewUser from '../components/newUser/NewUser';

function Users() {
  const [showNewUserModal, setshowNewUserModal] = useState(false);

  return (
    <div>
      <Button
        onClick={() => setshowNewUserModal(true)}
        isPrimary
        iconLeft={faAdd}
      >
        new user
      </Button>

      {showNewUserModal && (
        <Modal onClose={setshowNewUserModal}>
          <NewUser
            onCreate={() => setshowNewUserModal(false)}
            onCancel={() => setshowNewUserModal(false)}
          />
        </Modal>
      )}

      <Space medium />

      <p>Lista de usuarios</p>
    </div>
  );
}

export default Users;
