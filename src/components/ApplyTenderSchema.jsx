//Library Imports
import * as Yup from 'yup'

export const ApplyTenderSchema  =Yup.object().shape({
    companyName:Yup.string().min(3).required().matches(/^[A-Za-zÇçƏəĞğIıİiÖöŞşÜü\s]+$/,'only letters'),
    companyWork:Yup.string().min(5).trim().required(),
    teamInfo:Yup.string().min(5).required(),
   
})