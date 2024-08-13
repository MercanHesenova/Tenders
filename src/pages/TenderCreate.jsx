import React from 'react'
import '../assets/tenderCreate.css'
import { useFormik } from 'formik'
import { TenderCreateSchema } from '../components/TenderCreateSchema'
import axios from 'axios'

const TenderCreate = () => {
  const tendersUrl = import.meta.env.VITE_TENDERS
  const getCurrentDate = () => {
    const date = new Date()
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${day}/${month}/${year}`
  }

  const { values, handleChange, errors, handleSubmit } = useFormik({
    initialValues: {
      owner: "",
      subject: "",
      endDate: "",
      address: "",
      estimatedCost: "",
      createdDate: getCurrentDate()
    },
    onSubmit: async (values) => {
      try {
        const response = await axios.get(tendersUrl)
        const tendersRes = response.data ? response.data : []

        const isSubject = tendersRes.some(tender => tender.subject == values.subject)
        if (!isSubject) {
          await axios.post(tendersUrl, values)
        }
      } catch (error) {
        console.log(error);

      }

    },
    validationSchema: TenderCreateSchema
  })

  return (
    <div className='tenderCreateParent'>
      <div className='container'style={{display:"flex",justifyContent:"center", alignItems:"center"}} >
        <form onSubmit={handleSubmit} className='tenderCreateForm'>
          <div >
            <p>Add a tender</p>
          </div>
          <div>
            <label htmlFor="owner">Owner</label>
            <input
              type="text"
              name="owner"
              id='owner'
              placeholder='Ad owner is usual'
              value={values.owner} onChange={handleChange}
            />
            {errors.owner && <div className='errors'>{errors.owner}</div>}
          </div>
          <div>
            <label htmlFor='subject'>Cone of announcement</label>
            <input
              type="text"
              name="subject"
              id='subject'
              placeholder='Write the subject of the ad'
              value={values.subject} onChange={handleChange}
            />
            {errors.subject && <div className='errors'>{errors.subject}</div>}
          </div>
          <div>
            <label htmlFor='date'>End Date</label>
            <input
              type="date"
              name="endDate"
              id='date'
              value={values.endDate} onChange={handleChange}
            />
            {errors.subject && <div className='errors'>{errors.subject}</div>}
          </div>
          <div>
            <label htmlFor='address'>Address</label>
            <input
              type="text"
              name="address"
              id='address'
              placeholder='Address'
              value={values.address} onChange={handleChange}
            />
            {errors.address && <div className='errors'>{errors.address}</div>}
          </div>
          <div>
            <label htmlFor='estimatedCost'>Estimated Cost</label>
            <input
              type="number"
              name="estimatedCost"
              id='estimatedCost'
              placeholder='Estimated Cost'
              value={values.estimatedCost} onChange={handleChange}
            />
            {errors.estimatedCost && <div className='errors'>{errors.estimatedCost}</div>}
          </div>
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  )
}

export default TenderCreate