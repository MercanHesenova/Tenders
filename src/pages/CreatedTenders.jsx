import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../assets/createdTender.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const CreatedTenders = () => {
    const tendersUrl = import.meta.env.VITE_TENDERS;
    const [createdTenders, setCreatedTenders] = useState([]);
    const [show, setShow] = useState(false);
    const [editTender, setEditTender] = useState(null);
    const [updatedTender, setUpdatedTender] = useState({});

    const handleClose = () => setShow(false);

    const handleShow = (tender) => {
        setEditTender(tender);
        setUpdatedTender(tender);
        setShow(true);
    };

    const getTenders = async () => {
        try {
            const response = await axios.get(tendersUrl);
            const tendersRes = response.data ? response.data : [];
            setCreatedTenders(tendersRes);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getTenders();
    }, []);

    const deleteTender = async (id) => {
        try {
            await axios.delete(`${tendersUrl}/${id}`);
            setCreatedTenders(prevTenders => prevTenders.filter(tender => tender.id !== id));
        } catch (error) {
            console.log(error);
        }
    };

    const inputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedTender({ ...updatedTender, [name]: value });
    };

    const updateTender = async () => {
        try {
            await axios.put(`${tendersUrl}/${editTender.id}`, updatedTender);
            setCreatedTenders(prevTenders => prevTenders.map(tender => tender.id === editTender.id ? updatedTender : tender));
            handleClose();
        } catch (error) {
            console.log(error);
        }
    };
    const expiredTenders = () => {
        let date = new Date().toISOString().split("T")[0]
        createdTenders.forEach(item => {
            if (item.endDate < date) {
               deleteTender(item.id);
            }
        })
    }

    useEffect(() => {
        expiredTenders()
    }, [createdTenders])


    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Tender</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Owner</Form.Label>
                            <Form.Control
                                type="text"
                                name="owner"
                                value={updatedTender.owner || ''}
                                onChange={inputChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Subject</Form.Label>
                            <Form.Control
                                type="text"
                                name="subject"
                                value={updatedTender.subject || ''}
                                onChange={inputChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                type="text"
                                name="address"
                                value={updatedTender.address || ''}
                                onChange={inputChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Cost</Form.Label>
                            <Form.Control
                                type="text"
                                name="estimatedCost"
                                value={updatedTender.estimatedCost || ''}
                                onChange={inputChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>End Date</Form.Label>
                            <Form.Control
                                type="date"
                                name="endDate"
                                value={updatedTender.endDate || ''}
                                onChange={inputChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={updateTender}>
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
                            <td>
                                <button className='editButton' onClick={() => handleShow(item)}>Edit</button>
                                <button className='deleteButton' onClick={() => deleteTender(item.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default CreatedTenders;
