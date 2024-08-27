// Library Imports
import * as Yup from 'yup'

export const TenderCreateSchema  =Yup.object().shape({
    owner:Yup.string().min(3).required().matches(/^[A-Za-zÇçƏəĞğIıİiÖöŞşÜü.,"":;-\s]+$/,'only letters'),
    subject:Yup.string().min(3).trim().required(),
    endDate:Yup.string().required(),
    address:Yup.string().min(3).trim().required(),
    estimatedCost:Yup.number().moreThan(1000).lessThan(50000000)
})