// Main Imports
import React, { useContext, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';

// Library Imports
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Custom Imports
import { ApplyTenderSchema } from '../components/ApplyTenderSchema';
import { Context } from '../context/Context';

// Asset Imports
import '../assets/applyTender.css';

const TenderApply = () => {
  const { applyUrl, setData, data, dataApply } = useContext(Context)

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const response = axios.post(applyUrl, values)
      setData([...data, response.data])
      toast.success("Apply successfully added!")
      resetForm()
    } catch (error) {
      toast.error("An error occurred while adding the apply.");
      console.log(error);
    }
    console.log(data);
  }

  const formik = useFormik({
    initialValues: {
      companyName: "",
      companyWork: "",
      teamInfo: "",
      companyFile: "",
      email: ""
    },
    onSubmit: handleSubmit,
    validationSchema: ApplyTenderSchema
  });
  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser")
    if (currentUser) {
      const parsedUser = JSON.parse(currentUser)
      const email = parsedUser.email
      if (email) {
        formik.setFieldValue("email", email)
      }
      else{
        console.log("No current user data found in localStorage.");
        
      }
    }

  }, [formik.setFieldValue])
  return (
    <div className='applyParent'>
      <ToastContainer />
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
}

export default TenderApply;