import React, { useEffect, useState } from 'react'
import { getHistory } from '../service/allapi'


function Watchhistory() {

  const [history, sethistory] = useState([])

  useEffect(() => {

    getwatchhistory()

  }, [])


  const getwatchhistory = async () => {

    const { data } = await getHistory()

    sethistory(data)

  }
  console.log(history);




  return (
    <>
      <h5>Watch History</h5>


      <table className='table-shadow m-3 rounded border'>


        <thead>
          <tr>
            <th>ID </th>
            <th>NAME </th>
            <th>URL </th>
            <th>DATE</th>
          </tr>
        </thead>


        <tbody>

          {

            history?.map((item, index) => (



              <tr>
                <td>{index+1} </td>
                <td>{item?.categoryName} </td>
                <td>{item?.url} </td>
                <td>{item?.date}</td>
              </tr>
            ))
          }
        </tbody>

      </table>
    </>

  )
}

export default Watchhistory