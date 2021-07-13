import * as yup from 'yup';

export const schema = yup.object().shape(
    {
        subject: yup.string().required("Subject is required"),
        description: yup.string().required("Description is required"),
        minNumOfVotes: yup.number().optional().min(1).label("Minimum number of votes"),
        minPercentOfYesVotes: yup.number().optional().min(1).label("Minimum percentage of yes votes"),
        allowDuplicteVotes: yup.boolean().required().default(true),
        vetoUserName: yup.string().optional(),
        minCloseDateTime: yup.date().optional(),
        closeDateTime: yup.date().optional().when('minCloseDateTime', (minCloseDateTime, schema) => {
            return schema.test({
                test: (closeDateTime) => { return !closeDateTime || !minCloseDateTime || closeDateTime > minCloseDateTime; },
                message: "Close date must be greater than minimum close date"
            })
        }),
        requiredUserNames: yup.array().of(yup.string()).optional()
    })
    ;

export const initialValue = {
    subject: '',
    description: '',
    allowDuplicteVotes: true
}