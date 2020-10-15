import * as yup from 'yup';

export default yup.object().shape({
    first_name: yup
        .string()
        .required('name is required')
        .min(3, '*full* name is required'),
    last_name: yup
        .string()
        .required('name is required')
        .min(3, '*full* name is required'),
    email: yup
        .string()
        .email('must be a valid email address')
        .required('email is required'),
    password: yup
        .string()
        .required('password is required')
        .min(6, 'password must be 6+ characters'),
    tos: yup.boolean(),
});