import * as yup from 'yup';

export const schema = yup.object().shape(
    {
        userName: yup.string().required("User name is required"),
        voteTypeName: yup.string().required("Vote type/option is required"),
    });

export const initialValue = {
    userName: '',
    voteTypeName: ''
}