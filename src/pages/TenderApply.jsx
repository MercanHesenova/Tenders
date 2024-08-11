import React from 'react'
import { Formik, useFormik } from 'formik'
import '../assets/applyTender.css'
const TenderApply = () => {


  return (
    <div className='applyParent'>
      <form className="applyForm">
        <div>
          <p>Apply</p>
        </div>
        <div className="form-group">
          <label htmlFor="companyName">Company Name</label>
          <input type="text" id="companyName" name="companyName" required />
        </div>

        <div className="form-group">
          <label htmlFor="companyWork">The Company's Activities and Motivation</label>
          <textarea id="companyWork" name="companyWork" rows="4" required></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="teamInfo">Information About Team Members</label>
          <textarea id="teamInfo" name="teamInfo" rows="4" required></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="companyFile">To Download Company Information File</label>
          <input type="file" id="companyFile" name="companyFile" required />
        </div>

        <button type="submit" className="applyButton">Send</button>
      </form>

    </div>
  )
}

export default TenderApply