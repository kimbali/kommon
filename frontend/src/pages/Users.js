import React, { useEffect, useState } from 'react';
import Button from '../components/button/Button';
import {
  faAdd,
  faAddressCard,
  faCalendarDays,
  faCheck,
  faEdit,
  faEuro,
  faMagnifyingGlass,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
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
import { getPatologiesLabel } from '../config/enums/patologiesEnum';
import { getProblemsLabel } from '../config/enums/problemsEnum';
import { getAllergiesLabel } from '../config/enums/allergiesEnum';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Input from '../components/input/Input';
import { useGetMarathonsQuery } from '../slices/marathonApiSlice';
import Text from '../components/text/Text';
import formatDate from '../utils/formatDate';
import templateStart from '../components/emails/templateStart';
import postEmail from '../utils/postEmail';

function Users() {
  const { t } = useTranslation();
  const [showSendEmail, setShowSendEmail] = useState(false);
  const [showNewUserModal, setshowNewUserModal] = useState(false);
  const [showDeleteUserModal, setshowDeleteUserModal] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [keywordValue, setKeywordValue] = useState('');
  const [marathonOptions, setmarathonOptions] = useState([]);
  const [marathonSelected, setMarathonSelected] = useState(null);

  const { data: marathonsData } = useGetMarathonsQuery({});
  const { data: usersData, refetch: refetchUsers } = useGetUsersQuery({
    keyWord: keywordValue,
    marathon: marathonSelected?.value?._id || '',
  });
  const [deleteUser] = useDeleteUserMutation();

  const createMarathonOptions = () => {
    const options = marathonsData?.marathons.map((ele, index) => {
      return { label: ele.name || `${t('marathon')} ${index}`, value: ele };
    });

    setmarathonOptions(options);
  };

  useEffect(() => {
    createMarathonOptions();
  }, [marathonsData]);

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

  const handleSearchValueChange = ({ value }) => {
    setSearchValue(value);
  };

  const handleSearchSubmit = e => {
    e.preventDefault();

    setKeywordValue(searchValue);
  };

  const handleMarathonChange = async marathon => {
    setMarathonSelected(marathon);
  };

  const handleSendEmail = async () => {
    try {
      const listOfMails = usersData.map(ele => ele.email);

      const templateHTML = await templateStart();

      await postEmail({
        from: 'Body Maraton <noreply@bodymaraton.com>',
        // from: 'Body Maraton TEST <onboarding@resend.dev>',
        to: listOfMails,
        subject: '¡Empieza tu Body Maratón!',
        html: templateHTML,
      });

      toast.success(t('emailsSent'));
      setShowSendEmail(false);
    } catch {
      toast.error(t('error'));
    }
  };

  return (
    <div className='data-table'>
      <div className='content-left-and-right'>
        <div className='filters'>
          <Button
            onClick={() => setshowNewUserModal(true)}
            isPrimary
            iconLeft={faAdd}
          >
            {t('newUser')}
          </Button>

          <form onSubmit={handleSearchSubmit} className='search-input'>
            <Input
              onChange={handleSearchValueChange}
              placeholder={t('searchByNameAndEmail')}
              iconLeft={faMagnifyingGlass}
              isSecondary
              name='search'
              value={searchValue}
              type='search'
            />
            <Button type='submit' isPrimary iconLeft={faMagnifyingGlass} />
          </form>
        </div>

        <div className='filters align-right'>
          <Input
            placeholder={t('marathon')}
            isSingleSelect
            options={marathonOptions}
            onChange={handleMarathonChange}
            selectedOption={marathonSelected}
            name='marathon'
            trashClick={() => setMarathonSelected()}
            isClearable
          />

          <Button
            onClick={() => setShowSendEmail(true)}
            disabled={!marathonSelected}
            isSecondary
          >
            {t('sendStartEmail')}
          </Button>
        </div>
      </div>

      <Space small />

      <div className='content-left-and-right'>
        <Text color='primary' isBold className='first-element'>
          TOTAL USUARIOS: {usersData?.length}
        </Text>

        {marathonSelected && (
          <div className=' start-end-date'>
            <span>
              <FontAwesomeIcon icon={faCalendarDays} />
            </span>
            <Text>{formatDate(marathonSelected?.value?.startDate)}</Text>
            <Text>-</Text>
            <Text>{formatDate(marathonSelected?.value?.endDate)}</Text>
          </div>
        )}
      </div>

      <Space medium />

      <div className='scroll-table'>
        <table>
          <thead>
            <tr>
              <th style={{ width: '160px' }}>{t('name')}</th>
              <th>{t('mail')}</th>
              <th>{t('admin')}</th>
              <th>{t('patologies')}</th>
              <th>{t('problem')}</th>
              <th>{t('allergies')}</th>
              <th className='only-icon'>
                <FontAwesomeIcon icon={faAddressCard} />
              </th>
              <th className='only-icon'>
                <FontAwesomeIcon icon={faEuro} />
              </th>
              <th className='only-icon'>
                <FontAwesomeIcon icon={faEdit} />
              </th>
              <th className='only-icon'>
                <FontAwesomeIcon icon={faTrash} />
              </th>
            </tr>
          </thead>

          <tbody>
            {usersData?.length > 0 &&
              usersData.map(ele => (
                <tr key={ele._id}>
                  <td className='left'>{ele.name}</td>
                  <td className='lowercase left'>{ele.email}</td>
                  <td>{ele.isAdmin ? t('admin') : ''}</td>
                  <td>
                    {ele.patologies.length > 0
                      ? getPatologiesLabel(ele.patologies)
                      : ''}
                  </td>
                  <td>{ele.problems ? getProblemsLabel(ele.problems) : ''}</td>
                  <td>
                    {ele.allergies.length > 0
                      ? getAllergiesLabel(ele.allergies)
                      : ''}
                  </td>
                  <td>
                    {ele.isFullRegistered ? (
                      <FontAwesomeIcon icon={faCheck} />
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {ele.hasPaid ? <FontAwesomeIcon icon={faCheck} /> : ''}
                  </td>
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
      </div>

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
          title={t('deleteUser')}
          text={
            showDeleteUserModal.isAdmin
              ? t('cantDeleteAdminUser')
              : `${t('confirmDelete')} ${showDeleteUserModal.name}`
          }
          disableConfirm={!!showDeleteUserModal.isAdmin}
        />
      )}

      {showSendEmail && (
        <ConfirmModal
          onConfirm={handleSendEmail}
          onClose={setShowSendEmail}
          title={t('sendStartEmail')}
          text={t('confirmSendStartEmail')}
        />
      )}
    </div>
  );
}

export default Users;
