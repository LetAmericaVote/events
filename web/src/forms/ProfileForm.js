import React from 'react';
import Rivet from '../hoc/Rivet';
import BaseForm from './BaseForm';
import {
  selectAuthenticatedUserFirstName,
  selectAuthenticatedUserLastName,
  selectAuthenticatedUserMobile,
  selectAuthenticatedUserZipcode,
} from '../selectors';

const ProfileForm = (props) => {
  const {
    formName,
    firstName,
    lastName,
    mobile,
    zipcode,
  } = props;

  const fields = [
    {
      name: 'firstName',
      label: 'First name',
      default: firstName,
      type: 'text',
      required: true,
    },
    {
      name: 'lastName',
      label: 'Last name',
      default: lastName,
      type: 'text',
      required: true,
    },
    {
      name: 'mobile',
      label: 'Mobile',
      note: `By entering your phone number you agree to recieve periodic automated text messages and calls on your cell phone from Let America Vote to protect voting rights. Message & data rates may apply. Text STOP to cancel or HELP for help.`,
      default: mobile,
      type: 'tel',
      required: false,
    },
    {
      name: 'zipcode',
      label: 'Zipcode',
      default: zipcode,
      type: 'number',
      required: false,
    },
  ];

  return (
    <BaseForm
      formName={formName}
      fields={fields}
    />
  );
};

ProfileForm.mapStateToProps = (state, ownProps) => ({
  firstName: selectAuthenticatedUserFirstName(state),
  lastName: selectAuthenticatedUserLastName(state),
  mobile: selectAuthenticatedUserMobile(state),
  zipcode: selectAuthenticatedUserZipcode(state),
});

export default Rivet(ProfileForm);
