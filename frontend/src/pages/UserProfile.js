import React, { useState } from 'react';
import { useUser } from '../context/userContext';
import Text from '../components/text/Text';
import Space from '../components/space/Space';
import ResumeTable from '../components/resumeTable/ResumeTable';
import { getActivityLabel } from '../config/enums/activitiesEnum';
import { getPatologiesLabel } from '../config/enums/patologiesEnum';
import { getPorpuseLabel } from '../config/enums/porpusesEnum';
import { getProblemsLabel } from '../config/enums/problemsEnum';
import { getAllergiesLabel } from '../config/enums/allergiesEnum';
import { getYesNoLabel } from '../config/enums/yesNoEnum';
import { useTranslation } from 'react-i18next';
import Button from '../components/button/Button';
import Modal from '../components/modal/Modal';
import BodyFotosForm from '../components/progress/BodyFotosForm';
import { useMarathon } from '../context/marathonContext';
import { lessThan3DaysDifference } from '../utils/formatDate';
import { useProgress } from '../context/progressContext';
import BodyPhotos from '../components/progress/BodyPhotos';

function UserProfile() {
  const { t } = useTranslation();
  const { user } = useUser();
  const { marathon } = useMarathon();
  const { userProgress, updateUserProgress } = useProgress();

  const [showFotosModal, setShowFotosModal] = useState();

  const handleSaveFotos = progressUpdated => {
    setShowFotosModal(false);
    updateUserProgress(progressUpdated);
  };

  return (
    <div>
      <Text isTitle>Perfil</Text>

      <Space small />

      <Text>
        Recuerda actualizar tus parámetros corporales en la pestaña de progreso
        para seguir tu evolución y resultados.
      </Text>

      <Space big />

      <div className='user-profile'>
        <div className='section'>
          <Text isSubtitle>{t('personalInfo')}</Text>

          <ResumeTable
            list={[
              { name: t('name'), value: user?.name },
              { name: t('mail'), value: user?.email },
              { name: t('region'), value: user?.city?.region || '-' },
              { name: t('address'), value: user?.address || '-' },
              { name: t('tel'), value: user?.phone },
            ]}
          />
        </div>

        <div className='section'>
          <Text isSubtitle>{t('parameters')} iniciales</Text>

          <ResumeTable
            list={[
              { name: t('age'), value: user?.age },
              { name: t('height'), value: user?.height },
              { name: t('weightKg'), value: user?.weight },
              { name: t('chestCm'), value: user?.chest },
              { name: t('waistCm'), value: user?.waist },
              { name: t('buttocksCm'), value: user?.buttocks },
            ]}
          />
        </div>

        <div className='section'>
          <Text isSubtitle>{t('lifeStyle')}</Text>

          <ResumeTable
            list={[
              { name: t('activity'), value: getActivityLabel(user?.activity) },
              {
                name: t('allergies'),
                value: getAllergiesLabel(user?.allergies),
              },
              {
                name: t('patologies'),
                value: getPatologiesLabel(user?.patologies),
              },
              { name: t('porpuse'), value: getPorpuseLabel(user?.porpuse) },
              { name: t('breastfeed'), value: getYesNoLabel(user?.breastfeed) },
              {
                name: t('problem'),
                value: getProblemsLabel(user?.problem) || '-',
              },
            ]}
          />
        </div>

        <div className='body-fotos-section'>
          <Text isSectionTitle>{t('photosSectionTitle')}</Text>

          <Space extraSmall />

          <Text>{t('photosSectionDescription')}</Text>

          <Space medium />

          <BodyPhotos photos={userProgress?.initialPhotos} />

          <Space medium />

          {lessThan3DaysDifference(marathon?.endDate) && (
            <BodyPhotos photos={userProgress?.photoFinish} />
          )}

          <Space medium />

          <div className='buttons-container'>
            <Button
              onClick={() => setShowFotosModal('initialPhotos')}
              isPrimary
              disabled={!lessThan3DaysDifference(marathon?.startDate)}
            >
              {t('uploadFotosInit')}
            </Button>

            <Button
              onClick={() => setShowFotosModal('photoFinish')}
              isPrimary
              disabled={!lessThan3DaysDifference(marathon?.endDate)}
            >
              {t('uploadFotosFinish')}
            </Button>
          </div>
        </div>

        {showFotosModal && (
          <Modal onClose={setShowFotosModal}>
            <BodyFotosForm onSave={handleSaveFotos} time={showFotosModal} />
          </Modal>
        )}
      </div>
    </div>
  );
}

export default UserProfile;
