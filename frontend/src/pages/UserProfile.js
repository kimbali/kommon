import React from 'react';
import { useUser } from '../context/userContext';
import Text from '../components/text/Text';
import Space from '../components/space/Space';
import ResumeTable from '../components/resumeTable/ResumeTable';
import { getActivityLabel } from '../config/enums/activitiesEnum';
import { getAlcoholLabel } from '../config/enums/alcoholsEnum';
import { getPatologiesLabel } from '../config/enums/patologiesEnum';
import { getPorpuseEnum } from '../config/enums/porpusesEnum';
import { getProblemsLabel } from '../config/enums/problemsEnum';
import { getSmokeLabel } from '../config/enums/smokeEnum';

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
          { name: 'Ciudad', value: user?.city },
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
          { name: 'Consumo de alcohol', value: getAlcoholLabel(user?.alcohol) },
          { name: 'Patologias', value: getPatologiesLabel(user?.patologies) },
          { name: 'Propósito', value: getPorpuseEnum(user?.porpuse) },
          {
            name: 'Antecedentes',
            value: getProblemsLabel(user?.problem) || '-',
          },
          { name: 'Fumador', value: getSmokeLabel(user?.smoke) },
        ]}
      />
    </div>
  );
}

export default UserProfile;
