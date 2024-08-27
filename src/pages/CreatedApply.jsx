import React, { useContext, useEffect, useState } from 'react'
import { Table } from 'react-bootstrap';
import { Context } from '../context/Context';
import '../assets/createdTender.css';
const CreatedApply = () => {
    const { dataApply } = useContext(Context)
    const [filterDataApply, setFilterDataApply] = useState([])
    const currentUserEmail = JSON.parse(localStorage.getItem("currentUser")).email

    useEffect(() => {
        const filteredApplications = dataApply.filter(application => application.email === currentUserEmail);
        setFilterDataApply(filteredApplications);
    }, [dataApply, currentUserEmail]);
    return (
        <div className='container'>
            <Table striped bordered hover responsive className="tenderTable">
                <thead className='tenderHead'> 
                    <tr>
                        <th>Company Name</th>
                        <th>Company Work</th>
                        <th>Team Info</th>
                        <th>Company File</th>
                    </tr>
                </thead>
                <tbody className="tenderBody">
                    {filterDataApply?.map((item) => (
                        <tr key={item?.id}>
                            <td>{item?.companyName}</td>
                            <td>{item?.companyWork}</td>
                            <td>{item?.teamInfo}</td>
                            <td>{item?.companyFile ? <a href={item?.companyFile}>Download</a> : 'No file'}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}

export default CreatedApply