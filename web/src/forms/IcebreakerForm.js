import React from 'react';
import BaseForm from './BaseForm';
import { FlexDown } from '../blocks/Flex';
import { Paragraph } from '../blocks/Type';
import {
  ICEBREAKER_1,
  ICEBREAKER_2,
  ICEBREAKER_INTRO,
} from '../copy';

const IceBreakerForm = (props) => {
  const { formName } = props;

  const fields = [
    {
      name: 'question',
      label: 'Question',
      type: 'select',
      options: [
        {
          value: ICEBREAKER_1,
          title: ICEBREAKER_1,
        },
        {
          value: ICEBREAKER_2,
          title: ICEBREAKER_2,
        },
      ],
      required: true,
    },
    {
      name: 'answer',
      label: 'Answer',
      type: 'longtext',
      required: true,
    },
  ];

  return (
    <FlexDown>
      <Paragraph>{ICEBREAKER_INTRO}</Paragraph>
      <BaseForm
        formName={formName}
        fields={fields}
      />
    </FlexDown>
  )
};

export default IceBreakerForm;
