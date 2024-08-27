// Main Imports
import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';

// Custom Imports
import { TenderCreateSchema } from '../components/TenderCreateSchema';
import { Context } from '../context/Context';

// Library Imports
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Asset Imports
import '../assets/tenderCreate.css';

const TenderCreate = () => {
  const { data, setData, tendersUrl } = useContext(Context); // Context-dən data və setData əldə edirik

  const tenderSubmit = async (values, { resetForm }) => {
    try {
      const isSubject = data.some(tender => tender.subject === values.subject);
      if (!isSubject) {
        await axios.post(tendersUrl, values);
        setData([...data, values]); // Yeni tendəri `Context`-ə əlavə edirik
        toast.success("Tender successfully added!")
        resetForm()
      } else {
        toast.error("Tender with this subject already exists.");
      }
    } catch (error) {
      console.error("Error details:", error);
      toast.error("An error occurred while adding the tender.");
    }
  }

  const getCurrentDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${day}/${month}/${year}`;
  };

  const { values, handleChange, errors, handleSubmit, setFieldValue } = useFormik({
    initialValues: {
      owner: "",
      subject: "",
      endDate: "",
      address: "",
      estimatedCost: "",
      email: "",
      createdDate: getCurrentDate()
    },
    onSubmit: tenderSubmit,
    validationSchema: TenderCreateSchema
  });
  console.log(values.email);

  
  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
        const parsedUser = JSON.parse(currentUser);
        const email = parsedUser.email;
        if (email) {
            setFieldValue("email", email);
        }
    } else {
        console.log("No current user data found in localStorage.");
    }
}, [setFieldValue]);


  return (
    <div className='tenderCreateParent'>
      <ToastContainer />
      <div className='container' style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <form onSubmit={handleSubmit} className='tenderCreateForm'>
          <div>
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
            {errors.endDate && <div className='errors'>{errors.endDate}</div>}
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
          <button type="submit" className='closeBtn'>Send</button>
        </form>
      </div>
    </div>
  );
}

export default TenderCreate;
