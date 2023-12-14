import React, { useEffect } from 'react'
import { useState } from 'react';
import { Col, FloatingLabel, Form, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addCategory, deleteCategory, getAllCategory, getVideos, updateCategory } from '../service/allapi';
import { Trash2 } from 'react-feather';
import Videocard from './Videocard';






function Category() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [categoryItem, setcategoryItem] = useState({
    id: "", name: "", allVideos: []
  })

  const [allCategory, setallCategory] = useState([])



  useEffect(() => {

    getCategoryList()


  }, [])


  // define function

  const addcategoryForm = (e) => {
    const { name, value } = e.target
    // {...} spread operator
    setcategoryItem({ ...categoryItem, [name]: value })
  }

  console.log(categoryItem);

  const handleAddCategory = async (e) => {
    e.preventDefault()
    const { id, name } = categoryItem
    if (!id || !name) {
      toast.error("please fill the form completely")

    }
    else {
      const response = await addCategory(categoryItem)
      console.log(response);
      if (response.status >= 200 && response.status <= 300) {
        // Hide the component or set a state variable (e.g., setShow) to false
        setShow(false);

        // Display a success toast notification
        toast.success("New video uploaded successfully", {
          position: "top-center",
          autoClose: 5000, // Set the auto-close duration to 5000 milliseconds (5 seconds)
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored", // Set the theme to colored for a colored toast
        })

        getCategoryList()
      }


      else {
        toast.warning("provide a unique id!!!!")
      }


    }
  }

  const getCategoryList = async () => {
    // api call for get category
    const res = await getAllCategory()
    console.log(res);
    setallCategory(res.data)

    console.log(setallCategory);
  }

  // api call delete category

  const handleDeleteCategory = async (e, id) => {
    e.preventDefault()
    console.log(id);

    // api call
    await deleteCategory(id)

    getCategoryList()
  }

  // function define 

  const dragOver = (e) => {
    e.preventDefault()
    console.log("dragging over the category board");

  }

  const dropped = async (e, categoryId) => {
    console.log("category Id", categoryId);
    let sourceCardId = e.dataTransfer.getData("cardId")
    console.log("sourceCardId", sourceCardId);
    // logic to implement adding card in the given category
    const { data } = await getVideos(sourceCardId)
    console.log("source video data", data);
    // dropped category details
    let selectedCategory = allCategory.find(item => item.id == categoryId)
    console.log("target category details", selectedCategory);

    // to push drop data into array
    selectedCategory.allVideos.push(data)
    // update drop data in allvideos array
    await updateCategory(categoryId, selectedCategory)
    getCategoryList()



  }


  return (
    <>

      <div className='d-grid'>

        <div className='btn btn-dark m-2' onClick={handleShow}>

          Add Category

        </div>

        {
          allCategory.map(item => (
            <div droppable onDragOver={e => dragOver(e)} onDrop={e => dropped(e, item?.id)} >
              <div className='d-flex justify-content-between border rounded mt-3 p-2'>
                <h4>{item.name}</h4>

                <span onClick={e => handleDeleteCategory(e, item?.id)}>

                  <Row>
                    {
                      item?.allVideos.map((card) => (

                        <Col className='p-3 mb-1 sm={12}'>

                        <Videocard card={card} insideCategory={true} />

                        </Col>

                      ))

                    }
                  </Row>


                  <Trash2 color='red' />
                </span>

              </div>
            </div>
          ))
        }



        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Add Category</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <Form>

              <FloatingLabel className='mb-3' controlId="floatingid" label="Id">
                <Form.Control name='id' type="text" placeholder="Category Id" onChange={addcategoryForm} />
              </FloatingLabel>

              <FloatingLabel className='mb-3' controlId="floatingcatoegory" label="Category">
                <Form.Control name='name' type="text" placeholder="Category" onChange={addcategoryForm} />
              </FloatingLabel>

            </Form>

          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button onClick={handleAddCategory} variant="primary">Add</Button>
          </Modal.Footer>
        </Modal>

      </div>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

    </>
  )
}

export default Category




// 1.create a watch history tab in home page

// 2.create a new component for watch history
// table format (no, cardname, link, title)
// create a watch history key in db.json and value as array

// when we click on the card add data to db.json and get data from db.json
