import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    MDBNavbar,
    MDBContainer,
    MDBNavbarBrand,
    MDBNavbarToggler,
    MDBNavbarItem,
    MDBCollapse,
    MDBBtn,
    MDBIcon,
    MDBNavbarNav,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
    MDBInput,
    MDBValidation,
    MDBValidationItem,
} from 'mdb-react-ui-kit';

import { toast } from 'react-toastify';

export default function Navbar() {

    const navigate = useNavigate();
    
    const [showNavNoTogglerSecond, setShowNavNoTogglerSecond] = useState(false);

    const [centredModal, setCentredModal] = useState(false);

    const toggleShow = () => setCentredModal(!centredModal);

    const [formValue, setFormValue] = useState({
        bookTitle: '',
        bookAuthor: '',
        sharedWith: '',
        isAvailable: true,
        isShared: false,
    });

    const onChange = (e) => {
        setFormValue({ ...formValue, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        // e.preventDefault();
        try {

            if (formValue.bookTitle.length === 0) {
                toast.error("Please provide a book title.");
            }
            else if (formValue.bookAuthor.length === 0) {
                toast.error("Please provide a book author.");
            }
            else
            {
                const res = await fetch('https://localhost:7285/api/BooksController1', {
                    method: 'POST',
                    headers: {
                        "content-type": "application/json",
                    },
                    body: JSON.stringify({
                        bookTitle: formValue.bookTitle, bookAuthor: formValue.bookAuthor, sharedWith: formValue.sharedWith, isAvailable: formValue.isAvailable, isShared: formValue.isShared
                    })
                });
    
                const data = await res.json();
                console.log(data);
                toast.success("New book has been added successfully.");
                toggleShow();
                // setTimeout(()=>window.location.reload(), 5000);
                window.location.reload();
            }
        }
        catch (err) {
            toast.errpr(err);
        };

    };


    return (
        <>
            <MDBNavbar sticky expand='lg' light bgColor='primary'>
                <MDBContainer fluid>
                    <MDBNavbarBrand href='/'>
                        <img
                            src='favicon.png'
                            height='30'
                            alt=''
                            loading='lazy'
                        />
                    </MDBNavbarBrand>
                    <MDBNavbarToggler
                        type='button'
                        data-target='#navbarTogglerDemo02'
                        aria-controls='navbarTogglerDemo02'
                        aria-expanded='false'
                        aria-label='Toggle navigation'
                        onClick={() => setShowNavNoTogglerSecond(!showNavNoTogglerSecond)}
                    >
                        <MDBIcon icon='bars' fas />
                    </MDBNavbarToggler>
                    <MDBCollapse navbar show={showNavNoTogglerSecond}>
                        <MDBNavbarNav className='mr-auto mb-2 mb-lg-0 justify-content-end'>
                            <MDBNavbarItem>
                                <MDBBtn rounded color="secondary" className='me-2 mt-1 mb-1' type='button' onClick={toggleShow}>
                                    ADD BOOK
                                </MDBBtn>
                            </MDBNavbarItem>
                            <MDBNavbarItem>
                                <MDBBtn rounded color="secondary" className='me-2 mt-1 mb-1' type='button' href='/'>
                                    ALL BOOKS
                                </MDBBtn>
                            </MDBNavbarItem>
                            <MDBNavbarItem>
                                <MDBBtn rounded color="secondary" className='me-2 mt-1 mb-1' type='button' href='/availableBooks'>
                                    AVAILABLE BOOKS
                                </MDBBtn>
                            </MDBNavbarItem>
                            <MDBNavbarItem>
                                <MDBBtn rounded color="secondary" className='me-2 mt-1 mb-1' type='button' href='/sharedBooks'>
                                    SHARED BOOKS
                                </MDBBtn>
                            </MDBNavbarItem>
                        </MDBNavbarNav>
                        {/* <MDBInputGroup tag="form" className='d-flex w-auto mb-1 mt-1'>
                            <input className='form-control' placeholder="Type query" aria-label="Search" type='Search' />
                            <MDBBtn color='info'>Search</MDBBtn>
                        </MDBInputGroup> */}
                    </MDBCollapse>
                </MDBContainer>
            </MDBNavbar>



            {/* Add Book */}
            <MDBModal tabIndex='-1' show={centredModal} setShow={setCentredModal}>
                <MDBModalDialog centered>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>ADD NEW BOOK</MDBModalTitle>
                            <MDBBtn className='btn-close' rounded color='secondary' onClick={toggleShow}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>
                            <MDBValidation className='row g-3'>
                                <MDBValidationItem tooltip feedback='Please provide a Book Title.' invalid className='col-md-12 mb-2'>
                                    <MDBInput
                                        value={formValue.bookTitle}
                                        name='bookTitle'
                                        onChange={onChange}
                                        id='validationCustom01'
                                        required
                                        label='Book Title'
                                    />
                                </MDBValidationItem>
                                <MDBValidationItem tooltip feedback='Please provide a Book Author.' invalid className='col-md-12'>
                                    <MDBInput
                                        value={formValue.bookAuthor}
                                        name='bookAuthor'
                                        onChange={onChange}
                                        id='validationCustom01'
                                        required
                                        label='Book Author'
                                    />
                                </MDBValidationItem>
                                <div className='col-md-12'>
                                    <MDBBtn className='col-md-12 mt-1' type='submit' onClick={onSubmit}>ADD BOOK</MDBBtn>
                                </div>
                            </MDBValidation>
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn color='secondary' onClick={toggleShow}>
                                Close
                            </MDBBtn>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </>
    );
}