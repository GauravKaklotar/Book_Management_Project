import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { toast } from 'react-toastify';
import {
  MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody, MDBIcon, MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBInput,
  MDBValidation,
  MDBValidationItem,
  MDBInputGroup,
} from 'mdb-react-ui-kit';
import "./book.css";

export default function AvailableBooks() {

  const [query, setQuery] = useState('');
  const [filterData, setFilterData] = useState({});

  const [centredModal, setCentredModal] = useState(false);

  const toggleShow = () => setCentredModal(!centredModal);

  const [centredModalForEdit, setCentredModalForEdit] = useState(false);

  const toggleShowForEdit = () => setCentredModalForEdit(!centredModalForEdit);

  const [centredModalForShare, setCentredModalForShare] = useState(false);

  const toggleShowForShare = () => setCentredModalForShare(!centredModalForShare);

  const [data, setData] = useState([]);
  const [id, setId] = useState(0);


  const [formValue, setFormValue] = useState({
    bookID: 0,
    bookTitle: '',
    bookAuthor: '',
    sharedWith: '',
    isAvailable: true,
    isShared: false,
  });

  const search = (e) =>{
    if(e.target.value !== '')
    {
      setQuery(e.target.value);
      const temp = data.filter(o=>Object.keys(o).some(k=>String(o[k]).toLowerCase().includes(e.target.value.toLowerCase())));

      setFilterData(temp);
    }
    else
    {
      setQuery(e.target.value);
    }
  }


  const onChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const handleEdit = async () => {
    // e.preventDefault();

    console.log(formValue);
    try {

      if (formValue.bookTitle.length === 0) {
        toast.error("Please provide a book title.");
      }
      else if (formValue.bookAuthor.length === 0) {
        toast.error("Please provide a book author.");
      }
      else {
        console.log(formValue.bookID);
        const res = await fetch(`https://localhost:7285/api/BooksController1/${formValue.bookID}`, {
          method: 'PUT',
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            bookID: formValue.bookID, bookTitle: formValue.bookTitle, bookAuthor: formValue.bookAuthor, sharedWith: formValue.sharedWith, isAvailable: formValue.isAvailable, isShared: formValue.isShared
          })
        });

        toast.success("Book Updated successfully.");
        toggleShowForEdit();
        // setTimeout(()=>window.location.reload(), 5000);
        window.location.reload();
      }
    }
    catch (err) {
      toast.error(err);
    };

  };

  const handleShare = async () => {
    // e.preventDefault();

    console.log(formValue);
    try {

      if (formValue.bookTitle.length === 0) {
        toast.error("Please provide a book title.");
      }
      else if (formValue.bookAuthor.length === 0) {
        toast.error("Please provide a book author.");
      }
      else if (formValue.sharedWith.length === 0) {
        toast.error("Please provide a valid name to share with.");
      }
      else {
        console.log(formValue.bookID);
        const res = await fetch(`https://localhost:7285/api/BooksController1/${formValue.bookID}`, {
          method: 'PUT',
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            bookID: formValue.bookID, bookTitle: formValue.bookTitle, bookAuthor: formValue.bookAuthor, sharedWith: formValue.sharedWith, isAvailable: false, isShared: true
          })
        });

        toast.success("Book Shared successfully.");
        toggleShowForShare();
        // setTimeout(()=>window.location.reload(), 5000);
        window.location.reload();
      }
    }
    catch (err) {
      toast.error(err);
    };

  };

  const handleDelete = async () => {
    const res = await fetch(`https://localhost:7285/api/BooksController1/${id}`, {
      method: 'DELETE',
      headers: {
        "content-type": "application/json",
      }
    });
    // const ans = await res;
    // console.log(ans);
    toast.success("Book has been deleted successfully.");
    toggleShow();
    // setTimeout(()=>window.location.reload(), 5000);
    window.location.reload();
  };

  const getData = async function () {
    const res = await fetch('https://localhost:7285/api/BooksController1', {
      method: 'GET',
      headers: {
        "content-type": "application/json",
      }
    });
    const ans = await res.json();
    ans.reverse();
    setData(ans);
  }
  useEffect(() => {
    getData();
  }, [])
  return (
    <>
      <Box sx={{ mt: 5 + 'vh', ml: 5 + 'vh', mr: 5 + 'vh' }}>
        <Typography gutterBottom variant="h5" component="div" fontWeight={700} sx={{ color: "#007bff", textAlign: "center", mb: 3 }}>
          AVAILABLE BOOKS
        </Typography>
        <div className='col-md-4'>
        <MDBInputGroup tag="form" className='d-flex w-auto mb-2 mt-1'>
          <input className='form-control' placeholder="Search Books" aria-label="Search" type='Search' value={query} onChange={search} />
        </MDBInputGroup>
        </div>
        <MDBTable align='middle' responsive hover>
          <MDBTableHead>
            <tr className='table-primary'>
              <th scope='col'>#</th>
              <th scope='col'>Book Title</th>
              <th scope='col'>Book Author</th>
              <th scope='col'>Status</th>
              <center>
                <th scope='col'>Actions</th>
              </center>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {query.length>0 ? filterData.filter(item => item.isAvailable).map((item, index) => (
              <tr key={index}>
                <th scope='row'>{index + 1}</th>
                <td>
                  <div className='d-flex align-items-center'>
                    <p className='fw-bold mb-1'>{item.bookTitle}</p>
                  </div>
                </td>
                <td>
                  <p className='fw-normal mb-1'>{item.bookAuthor}</p>
                </td>
                <td>
                  {item.isAvailable && <MDBBadge color='success' pill>Available</MDBBadge>}
                  {item.isShared && <MDBBadge color='warning' pill>Shared</MDBBadge>}
                </td>
                <td>
                  <center>
                    <MDBBtn color='secondary' rounded size='sm' className='me-2 mt-1' placement='bottom' title='EDIT' onClick={() => {
                      setFormValue({
                        bookID: item.bookID,
                        bookTitle: item.bookTitle,
                        bookAuthor: item.bookAuthor,
                        sharedWith: item.sharedWith,
                        isAvailable: item.isAvailable,
                        isShared: item.isShared,
                      });
                      toggleShowForEdit();
                    }}>
                      <MDBIcon fas icon="marker" />
                    </MDBBtn>
                    {/* <MDBBtn color='info' rounded size='sm' className='me-2 mt-1' placement='bottom' title='SHARE'>
                      <MDBIcon fas icon="share-square" />
                    </MDBBtn> */}
                    {item.isAvailable && <MDBBtn color='info' rounded size='sm' className='me-2 mt-1' placement='bottom' title='SHARE' onClick={() => {
                      setFormValue({
                        bookID: item.bookID,
                        bookTitle: item.bookTitle,
                        bookAuthor: item.bookAuthor,
                        sharedWith: item.sharedWith,
                        isAvailable: item.isAvailable,
                        isShared: item.isShared,
                      });
                      toggleShowForShare();
                    }}>
                      <MDBIcon fas icon="share-square" />
                    </MDBBtn>}
                    {item.isShared && <MDBBtn color='info' rounded size='sm' className='me-2 mt-1' placement='bottom' title='SHARE' onClick={()=>toast.info("This Book is already shared with someone.")}>
                      <MDBIcon fas icon="share-square" />
                    </MDBBtn>}
                    <MDBBtn color='danger' rounded size='sm' className='me-2 mt-1' placement='bottom' title='DELETE' onClick={() => {
                      setId(item.bookID);
                      toggleShow();
                    }}>
                      <MDBIcon fas icon="trash" />
                    </MDBBtn>
                  </center>
                </td>
              </tr>
            )) : data.filter(item => item.isAvailable).map((item, index) => (
              <tr key={index}>
                <th scope='row'>{index + 1}</th>
                <td>
                  <div className='d-flex align-items-center'>
                    <p className='fw-bold mb-1'>{item.bookTitle}</p>
                  </div>
                </td>
                <td>
                  <p className='fw-normal mb-1'>{item.bookAuthor}</p>
                </td>
                <td>
                  {item.isAvailable && <MDBBadge color='success' pill>Available</MDBBadge>}
                  {item.isShared && <MDBBadge color='warning' pill>Shared</MDBBadge>}
                </td>
                <td>
                  <center>
                    <MDBBtn color='secondary' rounded size='sm' className='me-2 mt-1' placement='bottom' title='EDIT' onClick={() => {
                      setFormValue({
                        bookID: item.bookID,
                        bookTitle: item.bookTitle,
                        bookAuthor: item.bookAuthor,
                        sharedWith: item.sharedWith,
                        isAvailable: item.isAvailable,
                        isShared: item.isShared,
                      });
                      toggleShowForEdit();
                    }}>
                      <MDBIcon fas icon="marker" />
                    </MDBBtn>
                    {/* <MDBBtn color='info' rounded size='sm' className='me-2 mt-1' placement='bottom' title='SHARE'>
                      <MDBIcon fas icon="share-square" />
                    </MDBBtn> */}
                    {item.isAvailable && <MDBBtn color='info' rounded size='sm' className='me-2 mt-1' placement='bottom' title='SHARE' onClick={() => {
                      setFormValue({
                        bookID: item.bookID,
                        bookTitle: item.bookTitle,
                        bookAuthor: item.bookAuthor,
                        sharedWith: item.sharedWith,
                        isAvailable: item.isAvailable,
                        isShared: item.isShared,
                      });
                      toggleShowForShare();
                    }}>
                      <MDBIcon fas icon="share-square" />
                    </MDBBtn>}
                    {item.isShared && <MDBBtn color='info' rounded size='sm' className='me-2 mt-1' placement='bottom' title='SHARE' onClick={()=>toast.info("This Book is already shared with someone.")}>
                      <MDBIcon fas icon="share-square" />
                    </MDBBtn>}
                    <MDBBtn color='danger' rounded size='sm' className='me-2 mt-1' placement='bottom' title='DELETE' onClick={() => {
                      setId(item.bookID);
                      toggleShow();
                    }}>
                      <MDBIcon fas icon="trash" />
                    </MDBBtn>
                  </center>
                </td>
              </tr>
            ))}
          </MDBTableBody>
        </MDBTable>
      </Box>



      {/* Delete */}
      <MDBModal tabIndex='-1' show={centredModal} setShow={setCentredModal}>
        <MDBModalDialog centered>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>DELETE BOOK</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <p>
                Are you sure you want to delete this book?
              </p>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color='secondary' onClick={toggleShow}>
                Close
              </MDBBtn>
              <MDBBtn color='danger' onClick={() => handleDelete()}>Delete</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>



      {/* Edit Book */}
      <MDBModal tabIndex='-1' show={centredModalForEdit} setShow={setCentredModalForEdit}>
        <MDBModalDialog centered>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>EDIT BOOK</MDBModalTitle>
              <MDBBtn className='btn-close' rounded color='secondary' onClick={toggleShowForEdit}></MDBBtn>
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
                  <MDBBtn className='col-md-12 mt-1' type='submit' onClick={handleEdit}>UPDATE</MDBBtn>
                </div>
              </MDBValidation>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color='secondary' onClick={toggleShowForEdit}>
                Close
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>


      {/* Share Book */}
      <MDBModal tabIndex='-1' show={centredModalForShare} setShow={setCentredModalForShare}>
        <MDBModalDialog centered>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>SHARE BOOK</MDBModalTitle>
              <MDBBtn className='btn-close' rounded color='secondary' onClick={toggleShowForShare}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <MDBValidation className='row g-3'>
                <MDBValidationItem tooltip feedback='Please provide a Book Title.' invalid className='col-md-12 mb-2'>
                  <MDBInput
                    disabled
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
                    disabled
                    value={formValue.bookAuthor}
                    name='bookAuthor'
                    onChange={onChange}
                    id='validationCustom01'
                    required
                    label='Book Author'
                  />
                </MDBValidationItem>
                <MDBValidationItem tooltip feedback='Please provide a Book Author.' invalid className='col-md-12'>
                  <MDBInput
                    value={formValue.sharedWith}
                    name='sharedWith'
                    onChange={onChange}
                    id='validationCustom01'
                    required
                    label='Share with...'
                  />
                </MDBValidationItem>
                <div className='col-md-12'>
                  <MDBBtn className='col-md-12 mt-1' type='submit' onClick={handleShare}>SHARE</MDBBtn>
                </div>
              </MDBValidation>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color='secondary' onClick={toggleShowForShare}>
                Close
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  )
};