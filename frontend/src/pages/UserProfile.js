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

function UserProfile() {
  const { user } = useUser();

  return (
    <div>
      <Text isTitle>Perfil</Text>

      <Space medium />

      <Text isSubtitle>Información personal</Text>

      <Space extraSmall />

      <ResumeTable
        list={[
          { name: 'Nombre', value: user?.name },
          { name: 'Email', value: user?.email },
          { name: 'Region', value: user?.city?.region || '-' },
          { name: 'Address', value: user?.address || '-' },
          { name: 'Telefono', value: user?.phone },
        ]}
      />

      <Space medium />

      <Text isSubtitle>Body parámeters</Text>

      <Space extraSmall />

      <ResumeTable
        list={[
          { name: 'Edad', value: user?.age },
          { name: 'Altura', value: user?.height },
          { name: 'Peso', value: user?.weight },
          { name: 'Pecho', value: user?.chest },
          { name: 'Cintura', value: user?.waist },
          { name: 'Gluteos', value: user?.buttocks },
        ]}
      />

      <Space medium />

      <Text isSubtitle>Estilo de vida</Text>

      <Space extraSmall />

      <ResumeTable
        list={[
          { name: 'Actividad', value: getActivityLabel(user?.activity) },
          {
            name: 'Alergias alimentarias',
            value: getAllergiesLabel(user?.allergies),
          },
          { name: 'Patologias', value: getPatologiesLabel(user?.patologies) },
          { name: 'Propósito', value: getPorpuseLabel(user?.porpuse) },
          { name: 'Das el pecho', value: getYesNoLabel(user?.breastfeed) },
          {
            name: 'Antecedentes',
            value: getProblemsLabel(user?.problem) || '-',
          },
        ]}
      />
    </div>
  );
}

export default UserProfile;
