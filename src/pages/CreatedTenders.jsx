import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../assets/createdTender.css'
const CreatedTenders = () => {
    const tendersUrl = import.meta.env.VITE_TENDERS;

    const [createdTenders, setCreatedTenders] = useState([]);

    const getTenders = async () => {
        try {
            const response = await axios.get(tendersUrl);
            const tendersRes = response.data ? response.data : [];
            setCreatedTenders(tendersRes);
        } catch (error) {
            console.error('Error fetching tenders:', error);
        }
    };

    useEffect(() => {
        getTenders();
    }, []);

    return (
        <table className="tenderTable">
            <thead>
                <tr>
                    <th>Owner</th>
                    <th>Subject</th>
                    <th>Address</th>
                    <th>Estimated Cost</th>
                    <th>End Date</th>
                </tr>
            </thead>
            <tbody className="tenderBody">
                {createdTenders.map((item) => (
                    <tr key={item.id}>
                        <td>{item.owner}</td>
                        <td>{item.subject}</td>
                        <td>{item.address}</td>
                        <td>{item.estimatedCost}</td>
                        <td>{item.endDate}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default CreatedTenders;
