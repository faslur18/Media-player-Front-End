import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import Videocard from './Videocard'
import { getVideo } from '../service/allapi'



function View({serverRes}) {

  // to store api response

  const [allVideos, setallVideos] = useState([])


  const [deleteStatus,setdeleteStatus]=useState(false)




  //hook 
  useEffect(() => {
    // call getvideos 

    getallvideos()


  }, [serverRes,deleteStatus])


  // create a function

  const getallvideos = async () => {
    const response = await getVideo()

    //  console.log(response.data);

    setallVideos(response.data)

  }

  console.log(allVideos);

  // to get delete response

  const handleDeleteStatus=(res)=>{
    setdeleteStatus(res)
  }





  return (
    <>

      <div className='border p-3 rounded m-4'>

        <Row>

          {
            allVideos.map(video => (
              <Col className='p-3 mb-3' sm={12} md={6}>
                <Videocard card={video} handleDeleteStatus={handleDeleteStatus} />

              </Col>))


          }


        </Row>


      </div>

    </>
  )
}

export default View