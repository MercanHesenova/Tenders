import React, { useContext, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { ApplyTenderSchema } from '../components/ApplyTenderSchema'
import '../assets/applyTender.css'
import { Context } from '../context/Context';
import axios from 'axios';
const TenderApply = () => {
  const { applyUrl, setData, data } = useContext(Context)
  const formik = useFormik({
    initialValues: {
      companyName: "",
      companyWork: "",
      teamInfo: "",
      companyFile: null
    },
    onSubmit: async (values) => {
      try {
        const response = axios.post(applyUrl, values)
        setData([...data, response.data])
      } catch (error) {
        console.log(error);
      }
      console.log(data);
    },
    validationSchema: ApplyTenderSchema
  });

  return (
    <div className='applyParent'>
      <div className='container' style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <form className='applyForm' onSubmit={formik.handleSubmit}>
          <div>
            <p>Apply</p>
          </div>
          <div className="form-group">
            <label htmlFor="companyName">Company Name</label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={formik.values.companyName}
              onChange={formik.handleChange}
            />
            {formik.errors.companyName && <div className='errors'>{formik.errors.companyName}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="companyWork">The Company's Activities and Motivation</label>
            <textarea
              id="companyWork"
              name="companyWork"
              rows="4"
              value={formik.values.companyWork}
              onChange={formik.handleChange}
            ></textarea>
            {formik.errors.companyWork && <div className='errors'>{formik.errors.companyWork}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="teamInfo">Information About Team Members</label>
            <textarea
              id="teamInfo"
              name="teamInfo"
              rows="4"
              value={formik.values.teamInfo}
              onChange={formik.handleChange}
            ></textarea>
            {formik.errors.teamInfo && <div className='errors'>{formik.errors.teamInfo}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="companyFile">Upload Company Information File</label>
            <input
              type="file"
              id="companyFile"
              name="companyFile"
              onChange={(event) => {
                formik.setFieldValue("companyFile", event.currentTarget.files[0]);
              }}
            />
          </div>
          <button type="submit" className="applyButton">Send</button>
        </form>
      </div>
    </div>
  );
};

export default TenderApply;
