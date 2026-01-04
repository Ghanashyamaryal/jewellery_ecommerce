import * as yup from 'yup';

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
  firstName: yup
    .string()
    .min(2, 'First name must be at least 2 characters')
    .required('First name is required'),
  lastName: yup
    .string()
    .min(2, 'Last name must be at least 2 characters')
    .required('Last name is required'),
  address: yup
    .string()
    .min(5, 'Address must be at least 5 characters')
    .required('Address is required'),
  city: yup
    .string()
    .min(2, 'City must be at least 2 characters')
    .required('City is required'),
  state: yup
    .string()
    .min(2, 'State must be at least 2 characters')
    .required('State is required'),
  zip: yup
    .string()
    .matches(
      /^\d{5}(-\d{4})?$/,
      'ZIP code must be 5 digits (e.g. 12345) or 5+4 (e.g. 12345-6789)'
    )
    .required('ZIP code is required'),
  phoneNumber: yup
    .string()
    .matches(
      /^(\+?\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
      'Invalid phone number format'
    )
    .required('Phone number is required'),
});

export default validationSchema;
