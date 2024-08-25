import React, { useContext, useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { Context } from '../context/Context';
import '../assets/createdTender.css';

const CreatedTenders = () => {
    const { data: createdTenders, updateTender, deleteTender } = useContext(Context);
    const [show, setShow] = useState(false);
    const [editTender, setEditTender] = useState(null);
    const [updatedTender, setUpdatedTender] = useState({});
    const [deleteModal, setDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null)
    const [filteredTender, setFilteredTender] = useState([])

    const email = localStorage.getItem("signupData")
    const parsedData = JSON.parse(email)
    const dataEmail = parsedData.map(item => item.email).join(" ")

    useEffect(() => {
        const filteredDataInEmail = createdTenders.filter(tender => tender?.email == dataEmail)
        setFilteredTender(filteredDataInEmail)
    }, [createdTenders,email])
    const handleClose = () => setShow(false);
    const handleDeleteModalClose = () => setDeleteModal(false);
    const handleShow = (tender) => {
        setEditTender(tender);
        setUpdatedTender(tender);
        setShow(true);
    };
    const handleDeleteModalShow = (id) => {
        setDeleteId(id);
        setDeleteModal(true);
    };
    const inputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedTender({ ...updatedTender, [name]: value });
    };

    const handleUpdateTender = async () => {
        if (editTender) {
            await updateTender(editTender.id, updatedTender);
            handleClose();
        }
    };

    const handleDeleteTender = async () => {
        if (deleteId) {
            await deleteTender(deleteId);
            setDeleteModal(false);
        }
    };

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header style={{ justifyContent: "center" }}>
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
                    <Button style={{ margin: "0 auto" }} variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button style={{ margin: "0 auto", marginTop: "10px" }} variant="primary" onClick={handleUpdateTender}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={deleteModal} onHide={handleDeleteModalClose}>
                <Modal.Header style={{ textAlign: "center" }} >
                    <Modal.Title>Are you sure you want to delete this tender?</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button style={{ margin: "0 auto" }} variant="secondary" onClick={handleDeleteModalClose}>
                        Cancel
                    </Button>
                    <Button style={{ margin: "0 auto", marginTop: "10px" }} variant="danger" onClick={handleDeleteTender}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
            <div className='container'>
                <Table striped bordered hover responsive className="tenderTable">
                    <thead className='tenderHead'>
                        <tr>
                            <th>Owner</th>
                            <th>Subject</th>
                            <th>Address</th>
                            <th>Cost</th>
                            <th colSpan={2}>End Date</th>
                        </tr>
                    </thead>
                    <tbody className="tenderBody">
                        {filteredTender?.map((item) => (
                            <tr key={item?.id}>
                                <td>{item?.owner}</td>
                                <td>{item?.subject}</td>
                                <td>{item?.address}</td>
                                <td>{item?.estimatedCost}</td>
                                <td>{item?.endDate}</td>
                                <td>
                                    <Button variant="outline-primary" className='editButton' onClick={() => handleShow(item)}>Edit</Button>
                                    <Button variant="outline-danger" onClick={() => handleDeleteModalShow(item?.id)}>Delete</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </>
    );
};

export default CreatedTenders;
