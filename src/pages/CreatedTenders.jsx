import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../assets/createdTender.css'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const CreatedTenders = () => {
    const tendersUrl = import.meta.env.VITE_TENDERS;
    const [createdTenders, setCreatedTenders] = useState([]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const getTenders = async () => {
        try {
            const response = await axios.get(tendersUrl);
            const tendersRes = response.data ? response.data : [];
            setCreatedTenders(tendersRes);
        } catch (error) {
            console.error( error);
        }
    };

    useEffect(() => {
        getTenders();
    }, []);

    const deleteTender = async (id) => {
        try {
            await axios.delete(`${tendersUrl}/${id}`)
            setCreatedTenders(prevTenders => prevTenders.filter(tender => tender.id != id))
        } catch (error) {
            console.log(error);

        }
    }


    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

            <table className="tenderTable">
                <thead>
                    <tr>
                        <th>Owner</th>
                        <th>Subject</th>
                        <th>Address</th>
                        <th>Cost</th>
                        <th colSpan={2}>End Date</th>
                    </tr>
                </thead>
                <tbody className="tenderBody">
                    {createdTenders.map((item) => (
                        <tr key={item.id}>
                            <td>{item.owner}</td>
                            <th>{item.subject}</th>
                            <td>{item.address}</td>
                            <td>{item.estimatedCost}</td>
                            <td>{item.endDate}</td>
                            <td><button onClick={handleShow}>Edit</button><button onClick={() => deleteTender(item.id)}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </>
    );
};

export default CreatedTenders;
