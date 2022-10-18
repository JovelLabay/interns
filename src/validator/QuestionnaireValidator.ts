import * as yup from 'yup';

const QuestionnaireValidator = yup.object({
  labelName: yup.string().required(),
  labelType: yup.string().required(),
  multipleChoice: yup
    .object({
      option1: yup.string(),
      option2: yup.string(),
      option3: yup.string(),
    })
    .optional(),
  trueOrFalse: yup
    .object({
      option1: yup.string(),
      option2: yup.string(),
    })
    .optional(),
});

export { QuestionnaireValidator };
