import * as yup from "yup"

const SendEmailValidator = yup.object({
    subject: yup.string().required(),
    greetings: yup.string().required(),
    introduction: yup.string().required(),
    bodyMessage: yup.string().required(),
    closing: yup.string().required(),
})

export {SendEmailValidator}