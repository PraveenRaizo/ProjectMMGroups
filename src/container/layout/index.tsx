import React from 'react'
import Navbar from './Navbar'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import {Box, Container} from '@mui/material'
import '../../index.scss'

const Layout:React.FC=()=>{

    return (
        
        <>
            {/* <Box> */}
            <Navbar/>
            <Container className='body-container'>
                <Outlet/>
            </Container>
            {/* </Box> */}
        </>
        
            
        
    )
}

export default Layout;