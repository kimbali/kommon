import React, { useState } from 'react';
import Input from '../input/Input';

function TaskItem() {
  const [formData, setFormData] = useState({});

  const handleOnChange = ({ name, value }) => {
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div>
      <Input
        type='checkbox'
        label='title of the task'
        onChange={handleOnChange}
      />
    </div>
  );
}

export default TaskItem;
