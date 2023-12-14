import React from 'react'
import { PlusCircle } from 'react-feather'
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { addVideo } from '../service/allapi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




function Add({handleresponse}) {

  const [uploaddata, setuploaddata] = useState({
    id: "", caption: "", thumbnail: "", url: ""
  })

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  // define setInput function
  const setInput = (e) => {
    const { name, value } = e.target

    setuploaddata({ ...uploaddata, [name]: value })

  }

  console.log(uploaddata);

  // extract embeded url from youtube original url

  const extractURL = (e) => {

    let youtubeURL = e.target.value
    if (youtubeURL.includes("v=")) {

      let index = youtubeURL.indexOf("v=")

      console.log(index);

      let videoURL = youtubeURL.substring(index + 2, index + 13)

      console.log(videoURL);

      let videoData = uploaddata

      videoData.url = `https://www.youtube.com/embed/${videoURL}`

      setuploaddata(videoData)

    }
    console.log(uploaddata);

  }

  // add btn
  const handleAdd = async () => {

    const { id, caption, thumbnail, url } = uploaddata

    if (!id || !caption || !thumbnail || !url) {
      toast.error("please fill the form completely")
    }

    else {
      // make api call
      const response = await addVideo(uploaddata)



      if (response.status > 200 && response.status < 300) {
        // console.log(response.data);
        handleresponse(response.data)
        setShow(false);
        toast.success("new video uploaded successfuly", {

          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",

        })

      }
      else {
        toast.warning("provide a unique id!!!!", 
        {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        })
      }
    }

  }


  // original url

  // https://www.youtube.com/watch?v=Frp0zC4643U

  // embedded url

  // https://www.youtube.com/embed/Frp0zC4643U


  return (
    <>

      <div onClick={handleShow} className='btn'>

        <PlusCircle color='green' size={90} />

      </div>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Upload Video Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Form>

            {/* id  */}
            <FloatingLabel controlId="floatinid" label="Id">
              <Form.Control name='id' type="text" onChange={setInput} placeholder="Uploading video id" />
            </FloatingLabel>

            {/* caption  */}
            <FloatingLabel controlId="floatincaption" label="Uploading Video Caption">
              <Form.Control name='caption' type="text" onChange={setInput} placeholder="Video Caption" />
            </FloatingLabel>

          </Form>

          {/* video cover image url */}
          <FloatingLabel controlId="floatingimage" label="Video Cover Image URL">
            <Form.Control name='thumbnail' type="text" onChange={setInput} placeholder="Video Cover Image URL" />
          </FloatingLabel>


          {/* uploading video link  */}
          <FloatingLabel className='mb-3' controlId="floatinglink" label="Upload Video Link">
            <Form.Control name='url' type="text" onChange={extractURL} placeholder="Video Link" />
          </FloatingLabel>


        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAdd}>Add</Button>
        </Modal.Footer>
      </Modal>


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

export default Add