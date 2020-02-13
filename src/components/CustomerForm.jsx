import React from 'react';
import '../styles/customer.css'
import Modal from 'react-bootstrap/Modal'

const CustomerForm = (props) => {
    return (
        <Modal
            show={props.show}
            aria-labelledby="customerForm"
            centered
            dialogClassName="customer-modal"
            >
            <Modal.Header closeButton>
                <Modal.Title id="customerForm">
                    Form Pelanggan
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <span id="warning"></span>
                <form onSubmit={e=>e.preventDefault()}>
                    <input type="text" name="name" id="name" value={props.name} onChange={props.handleOnChange} placeholder="Masukkan Nama Pelanggan"/>
                    <input type="text" name="phone" id="phone" value={props.phone} onChange={props.handleOnChange} placeholder="Masukkan Nomor Telepon"/>
                    <input type="text" name="email" id="email" value={props.email} onChange={props.handleOnChange} placeholder="Masukkan Email"/>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <button type="button" class="btn btn-close" onClick={props.onHide}>Tutup</button>
                <button type="button" class="btn btn-add" onClick={props.saveCustomer}>Simpan</button>
            </Modal.Footer>
        </Modal>
    )
}

export default CustomerForm;