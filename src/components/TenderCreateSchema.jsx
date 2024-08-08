import * as Yup from 'yup'

export const TenderCreateSchema  =Yup.object().shape({
    owner:Yup.string().min(3).max(10).required().matches(/^[A-Za-z]+$/,'only letters'),
    subject:Yup.string().min(3).max(20).trim().required(),
    endDate:Yup.string().required(),
    address:Yup.string().min(3).max(30).trim().required(),
    estimatedCost:Yup.number().moreThan(1000).lessThan(500000)
})