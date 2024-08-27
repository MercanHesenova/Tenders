import React, { useContext, useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { Context } from '../context/Context';
import '../assets/createdTender.css';

const CreatedTenders = () => {
    const { data: createdTenders, updateTender, deleteTender } = useContext(Context);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [modalData, setModalData] = useState({});

    const currentUserEmail = JSON.parse(localStorage.getItem("currentUser")).email;

    const filteredTender = createdTenders.filter(tender => tender?.email === currentUserEmail);

    const handleEditModalShow = (tender) => {
        setModalData({ ...tender });
        setShowEditModal(true);
    };

    const handleEditModalClose = () => {
        setShowEditModal(false);
        setModalData({});
    };

    const handleDeleteModalShow = (id) => {
        setModalData({ id });
        setShowDeleteModal(true);
    };

    const handleDeleteModalClose = () => {
        setShowDeleteModal(false);
        setModalData({});
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setModalData({ ...modalData, [name]: value });
    };

    const handleUpdateTender = async () => {
        if (modalData.id) {
            await updateTender(modalData.id, modalData);
            handleEditModalClose();
        }
    };

    const handleDeleteTender = async () => {
        if (modalData.id) {
            await deleteTender(modalData.id);
            handleDeleteModalClose();
        }
    };

    return (
        <>
            <Modal show={showEditModal} onHide={handleEditModalClose}>
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
                                value={modalData.owner || ''}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Subject</Form.Label>
                            <Form.Control
                                type="text"
                                name="subject"
                                value={modalData.subject || ''}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                type="text"
                                name="address"
                                value={modalData.address || ''}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Cost</Form.Label>
                            <Form.Control
                                type="text"
                                name="estimatedCost"
                                value={modalData.estimatedCost || ''}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>End Date</Form.Label>
                            <Form.Control
                                type="date"
                                name="endDate"
                                value={modalData.endDate || ''}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                  
                    <button style={{ margin: "0 auto", marginTop: "10px" }} variant="primary" onClick={handleUpdateTender}>
                        Save Changes
                    </button>
                    <button style={{ margin: "0 auto", marginTop: "10px" }} className='closeBtn' variant="secondary" onClick={handleDeleteModalClose}>
                        Close
                    </button>
                </Modal.Footer>
            </Modal>
            <Modal show={showDeleteModal} onHide={handleDeleteModalClose}>
                <Modal.Header style={{ textAlign: "center" }} >
                    <Modal.Title>Are you sure you want to delete this tender?</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <button style={{ margin: "0 auto" }} variant="danger" onClick={handleDeleteTender} className='deleteBtn'>
                        Delete
                    </button>
                    <button style={{ margin: "0 auto", marginTop: "10px" }} variant="secondary" onClick={handleDeleteModalClose} className='closeBtn'>
                        Close
                    </button>
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
                                    <Button variant="outline-primary" className='editButton' onClick={() => handleEditModalShow(item)}>Edit</Button>
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
