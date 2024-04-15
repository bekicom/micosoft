import React from 'react'
import Sitebar from './Sitebar'
import { Route, Routes } from 'react-router-dom'
import CreateProduct from '../page/CreateProduct'

export default function Main() {
  return (
    <div className='main' >
      <div className="left">
        <Sitebar/>
      </div>
      <div className="right">

        <Routes>
   <Route  path='/Create'   element={ <CreateProduct/>  }  />


        </Routes>

      </div>
    </div>
  )
}
