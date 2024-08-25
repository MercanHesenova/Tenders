import React, { useContext, useEffect, useState } from 'react'
import { Table } from 'react-bootstrap';
import { Context } from '../context/Context';
import '../assets/createdTender.css';
const CreatedApply = () => {
    const { dataApply } = useContext(Context)
    const [filterDataApply, setFilterDataApply] = useState([])
    const email = localStorage.getItem("signupData")
    const parsed = JSON.parse(email)
    const applyEmail = parsed.map(item => item.email).join(" ")
    useEffect(() => {
        const filteredApplyData = dataApply.filter(item => item?.email == applyEmail)
        setFilterDataApply(filteredApplyData)
    }, [dataApply, email])
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