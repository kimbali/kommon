import React, { useState } from 'react';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import Text from '../components/text/Text';
import Button from '../components/button/Button';
import Input from '../components/input/Input';
import State, { stateItem } from '../components/state/State';
import Logo from '../components/logo/Logo';
import ResumeTable from '../components/resumeTable/ResumeTable';

const style = {
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: '1rem',
  marginBottom: '1rem',
};

const options = [
  { value: 'ES', name: 'Spain' },
  { value: 'AND', name: 'Andorra' },
];

const list = [
  { name: 'Nombre y apellidos', value: 'Kim Garcia Anton' },
  { name: 'Fecha y lugar de nacimiento', value: '01/01/2000 Barcelona' },
  { name: 'Nacionalidad', value: 'Española' },
  { name: 'País de residéncia', value: 'Catalunya' },
];

function Storybook() {
  const [inputValue, setInputValue] = useState('');
  const [inputDate, setInputDate] = useState();
  const [inputSelect, setInputSelect] = useState({});
  const [inputCheckbox, setInputCheck] = useState(false);

  return (
    <div style={{ padding: '2rem', backgroundColor: 'white' }}>
      <Text isSectionTitle>Text</Text>
      <div style={style}>
        <Text isTitle>Title</Text>
        <Text>normal</Text>
        <Text isBold>bold</Text>
        <Text isCTA>button</Text>
        <Text isPlaceholder>placeholder</Text>
      </div>

      <Text isSectionTitle>Buttons</Text>
      <div style={style}>
        <Button isPrimary>primary</Button>
        <Button isSecondary>secondary</Button>
        <Button isLink>link</Button>
        <Button isActive>active</Button>
        <Button isPrimary iconLeft={faEdit}>
          Icon
        </Button>
        <Button isPrimary iconRight={faEdit}>
          Icon
        </Button>
      </div>

      <Text isSectionTitle>Inputs</Text>
      <div style={style}>
        <Input
          label='Text'
          placeholder='text here'
          value={inputValue}
          onChange={setInputValue}
          id='text-input'
        />
        <Input
          label='Date'
          placeholder='select a date'
          value={inputDate}
          onChange={setInputDate}
          type='date'
          id='date-input'
        />
        <Input
          label='Select'
          value={inputSelect}
          onChange={setInputSelect}
          isSelect
          id='select-input'
          options={options}
        />
        <Input
          label='Check me please'
          value={inputCheckbox}
          onChange={setInputCheck}
          id='checkbox-input'
          type='checkbox'
        />
      </div>

      <Text isSectionTitle>States</Text>
      <div style={style}>
        <State state={stateItem.ACTIVE} />
        <State state={stateItem.PENDING} />
        <State state={stateItem.SUCCESS} />
      </div>

      <Text isSectionTitle>Logo</Text>
      <div style={style}>
        <Logo height='32px' />
      </div>

      <Text isSectionTitle>Resume table</Text>
      <div style={style}>
        <ResumeTable list={list} />
      </div>
    </div>
  );
}

export default Storybook;
