import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from "@chakra-ui/react";

export default function Sitebar() {
  const  navigate =  useNavigate()

   

  return (
    <div className='sitebar'>
      <Button colorScheme="blue"   onClick={()=> navigate('/create')} >Product Qo'shish +</Button >
      <Button colorScheme="blue" >Sotish</Button >
      <Button  colorScheme="blue">Product Qo'shish +</Button >
      <Button colorScheme="blue" >Product Qo'shish +</Button >
      <Button colorScheme="blue" >Product Qo'shish +</Button >
      <Button  colorScheme="blue">Product Qo'shish +</Button >


      
    </div>
  )
}
