import React, { useState } from 'react';
import Input from '../input/Input';
import { useTranslation } from 'react-i18next';
import { useProgress } from '../../context/progressContext';
import { useUpdateProgressMutation } from '../../slices/progressApiSlice';
import toast from 'react-hot-toast';
import Button from '../button/Button';
import Space from '../space/Space';
import Text from '../text/Text';

function BodyFotosForm({ onSave, time }) {
  const { t } = useTranslation();
  const { userProgress } = useProgress();

  const [formData, setFormData] = useState({ ...userProgress[time] });

  const [updateProgress] = useUpdateProgressMutation();

  const handleOnChange = ({ name, value }) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleOnSubmit = async e => {
    e.preventDefault();

    try {
      const updatedProgress = {
        ...userProgress,
        [time]: { ...userProgress[time], ...formData },
      };
      await updateProgress({ ...updatedProgress });

      onSave({ ...updatedProgress });
    } catch (error) {
      console.error(error.message);
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={handleOnSubmit} className='instructions'>
      <Text isSectionTitle>Instrucciones para tomar las fotos:</Text>
      <Space small />
      <ul>
        <li>
          <Text isSubtitle>Posición y ángulo: </Text>
          <Text>
            Las fotos deben ser lo más parecidas posibles en cuanto a posición y
            ángulo. Esto significa que debes mantener la misma postura y tomar
            las fotos desde el mismo ángulo en todas las fotos.
          </Text>
        </li>
        <li>
          <Text isSubtitle>Distancia: </Text>
          <Text>
            Asegúrate de que las fotos se tomen desde la misma distancia. Puedes
            marcar la posición donde colocas la cámara o el teléfono para
            mantener la consistencia.
          </Text>
        </li>
        <li>
          <Text isSubtitle>Repetir las fotos al final de la maratón: </Text>
          <Text>
            Al finalizar la maratón, repite el proceso tomando las mismas tres
            fotos (de frente, lateral y de espaldas) siguiendo las mismas
            instrucciones de posición, ángulo y distancia.
          </Text>
        </li>
      </ul>

      <Space medium />

      <Text>
        De esta manera, podrás ver claramente las mejoras en tu cuerpo al
        comparar las fotos del inicio y del final de la maratón.
      </Text>

      <Space medium />

      <Text fontSize='16' center isBold>
        ¡Estamos emocionados de ver tu progreso!
      </Text>

      <Space small />

      <Text fontSize='18' center isBold color='primary'>
        ¡Buena suerte y a dar lo mejor de ti!
      </Text>

      <Space big />

      <Text isSectionTitle>{t('uploadFotos')}</Text>
      <Space small />

      <Input
        label={t('front')}
        name='front'
        onChange={handleOnChange}
        value={formData?.front}
        type='file'
        clearClick={() => setFormData({ ...formData, front: null })}
        isClearable
      />

      <Space medium />

      <Input
        label={t('lateral')}
        name='lateral'
        onChange={handleOnChange}
        value={formData?.lateral}
        type='file'
        clearClick={() => setFormData({ ...formData, lateral: null })}
        isClearable
      />

      <Space medium />

      <Input
        label={t('back')}
        name='back'
        onChange={handleOnChange}
        value={formData?.back}
        type='file'
        clearClick={() => setFormData({ ...formData, back: null })}
        isClearable
      />

      <Space medium />

      <Button isPrimary center type='submit'>
        {t('save')}
      </Button>
    </form>
  );
}

export default BodyFotosForm;
