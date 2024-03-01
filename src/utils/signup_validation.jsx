import * as Yup from 'yup';

const loginSchema = Yup.object().shape({
  email: Yup.string().email('Please enter a valid email').required("Email is required"),
  password: Yup.string().required("Password is required")
});

const consultationSchema = Yup.object().shape({
  companyName: Yup.string(),
  email: Yup.string().email('Please enter a valid email').required("Email is required"),
  mobileNumber: Yup.string()
  .test('is-number', 'Invalid Mobile Number', (value) => {
    // Check if the value is a valid number
    return !isNaN(value);
  })
  .required('Required'),
  address: Yup.string()
              .min(10, 'Address must be at least 10 characters long')
              .max(1000, 'Address must be at most 1000 characters long')
              .required('Address is required'),
  roleSelect: Yup.string(),
  customQuery: Yup.string(),
  industry: Yup.string(),
  capacity: Yup.string(),
  span: Yup.string(),
  dutyClass: Yup.string() 
})

const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email('Please enter a valid email').required("Email is required"),
});

const resetPasswordSchema = Yup.object().shape({
  password: Yup.string().required('Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Required'),
})

const validateRegistrationSchema= Yup.object().shape({
   otp: Yup.string().required('required')
})

const signupSchema = Yup.object().shape({
  firstName: Yup.string().required('Required'),
  lastName: Yup.string().required('Required'),
  email: Yup.string().email('Invalid Email').required('Required'),
  mobileNumber: Yup.string()
  .test('is-number', 'Invalid Mobile Number', (value) => {
    // Check if the value is a valid number
    return !isNaN(value);
  })
  .required('Required'),
  password: Yup.string()
              .matches(
                /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,20}$/,
                'Password must contain at least one uppercase letter, one lowercase letter, one special character, one number, and be between 6 to 20 characters long'
              )
              .required('Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Required'),
});



export {
  loginSchema, 
  signupSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  validateRegistrationSchema,
  consultationSchema
}