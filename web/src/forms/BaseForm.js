import React from 'react';
import styled from 'styled-components';
import Rivet from '../hoc/Rivet';
import { FlexDown } from '../blocks/Flex';
import {
  TextInput,
  TextInputContainer,
  FieldContainer,
  Label,
  LongTextInput,
  SelectInput,
} from '../blocks/Input';
import {
  Detail,
} from '../blocks/Type';
import { selectFormValue } from '../selectors';
import { setFormValue } from '../actions';

const FieldDetail = styled(Detail)`
  ${props => props.theme.extraTinyMarginTop}
`;

class BaseForm extends React.Component {
  constructor(props) {
    super(props);

    this.fieldRefs = {};
  }

  componentDidMount() {
    const { fields, values, formName, setFormValue } = this.props;

    fields.forEach(field => {
      const missingValue = typeof values[field.name] === 'undefined' ||
        values[field.name] === null;

      if (field.default && missingValue) {
        setFormValue(formName, field.name, field.default);
      }
    });
  }

  render() {
    const { fields, values, formName, setFormValue } = this.props;

    return (
      <FlexDown>
        {fields.map(field => {
          const FieldLabel = () => (
            <Label>{`${field.label} ${field.required ? '' : '(Optional)'}`}</Label>
          );

          switch (field.type) {
            case 'tel':
            case 'number':
            case 'text': return (
              <FieldContainer key={field.name}>
                <FieldLabel />
                <TextInputContainer>
                  <TextInput
                    type={field.type}
                    value={values[field.name]}
                    innerRef={comp => this.fieldRefs[field.name] = comp}
                    onChange={event => {
                      setFormValue(formName, field.name, event.target.value);
                    }}
                  />
                </TextInputContainer>
                {field.note ? <FieldDetail>{field.note}</FieldDetail> : null}
              </FieldContainer>
            );

            case 'longtext': return (
              <FieldContainer key={field.name}>
                <FieldLabel />
                <LongTextInput
                  value={values[field.name]}
                  innerRef={comp => this.fieldRefs[field.name] = comp}
                  onChange={event => {
                    setFormValue(formName, field.name, event.target.value);
                  }}
                ></LongTextInput>
                {field.note ? <FieldDetail>{field.note}</FieldDetail> : null}
              </FieldContainer>
            );

            case 'select': return (
              <FieldContainer key={field.name}>
                <FieldLabel />
                <SelectInput
                  value={values[field.name]}
                  innerRef={comp => this.fieldRefs[field.name] = comp}
                  onChange={event => {
                    setFormValue(formName, field.name, event.target.value);
                  }}
                >
                  {values[field.name] ? null : <option>Select an icebreaker question</option>}
                  {field.options.map(option => (
                    <option key={option.value} value={option.value}>{option.title}</option>
                  ))}
                </SelectInput>
              </FieldContainer>
            );

            default: return null;
          }
        })}
      </FlexDown>
    );
  }
}

BaseForm.mapStateToProps = (state, ownProps) => ({
  values: ownProps.fields.reduce((values, field) => {
    values[field.name] = selectFormValue(
      ownProps.formName, field.name, state,
    );

    return values;
  }, {}),
});

BaseForm.actionCreators = {
  setFormValue,
};

export default Rivet(BaseForm);
