import React, { useState } from 'react'
import Add from './Add'
import Category from './Category'
import { Col, Row } from 'react-bootstrap'
import View from './View'
import { Link } from 'react-router-dom'


function Home() {

  const [serverRes, setserverRes] = useState({})

  const handleresponse = (res) => {
    setserverRes(res)
  }

  return (
    <>

      <h1 className='text-info ms-5 mb-5'>All Video Cards</h1>

      <Link to="/watchistory" style={{textDecoration:"none",fontSize:"25px"}} className='text-info'>Watch History</Link>

      <div className='container-fluid'>

        <Row>

          {/* add component selector */}

          <Col lg={1}>
            <Add handleresponse={handleresponse} />

          </Col>

          {/* view component selector */}

          <Col lg={7}>
            <View serverRes={serverRes} />
          </Col>


          <Col lg={4}>

            <Category />

          </Col>

        </Row>


      </div>

    </>
  )
}

export default Home