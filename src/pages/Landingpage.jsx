import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'


function Landingpage() {

  // function defenition 
  // redirect from one page to another page we can use hook ie useNavigate()
  const navigate=useNavigate()

  const handleNavigate=()=>{
    navigate("/home")
  }



  return (
    <>

    <Row>

    <Col></Col>

    <Col lg={6}>
    
    <h1>Welcom VidioUP.com</h1>
    
    <p style={{fontWeight: 'bold',textAlign:'justify'}}>
    Where User Can use their Favourite videos.user can upload any youtube videos by copy and paste their url in to VidioUP.com will allow to add and remove their uploaded videos and also arrange them in different categories by drag and drop it is free try it now!!!
    </p>

    <button onClick={handleNavigate} className='btn btn-primary'>Click Here To Know More</button>

    </Col>

    <Col lg={5}>

      <img src="https://www.tech-recipes.com/wp-content/uploads/2016/04/youtube-logo-1920.jpg" alt="no image" className='img-fluid' />
    
    </Col>


    </Row>


    </>
  )
}

export default Landingpage