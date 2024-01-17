import React from 'react';
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

function UserProfile() {
  const { t } = useTranslation();
  const { user } = useUser();

  return (
    <div>
      <Text isTitle>Perfil</Text>

      <Space medium />

      <Text isSubtitle>{t('personalInfo')}</Text>

      <Space extraSmall />

      <ResumeTable
        list={[
          { name: t('name'), value: user?.name },
          { name: t('mail'), value: user?.email },
          { name: t('region'), value: user?.city?.region || '-' },
          { name: t('address'), value: user?.address || '-' },
          { name: t('tel'), value: user?.phone },
        ]}
      />

      <Space medium />

      <Text isSubtitle>{t('parameters')}</Text>

      <Space extraSmall />

      <ResumeTable
        list={[
          { name: t('age'), value: user?.age },
          { name: t('height'), value: user?.height },
          { name: t('weight'), value: user?.weight },
          { name: t('chest'), value: user?.chest },
          { name: t('waist'), value: user?.waist },
          { name: t('buttocks'), value: user?.buttocks },
        ]}
      />

      <Space medium />

      <Text isSubtitle>{t('lifeStyle')}</Text>

      <Space extraSmall />

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
  );
}

export default UserProfile;
