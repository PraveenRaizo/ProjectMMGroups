import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import {Box, Container} from '@mui/material'
import '../../index.scss'
import AdminNavbar from './AdminNavbar'

const AdminLayout:React.FC=()=>{

    return (
        <>
            {/* <Box> */}
                <AdminNavbar/>
                <Container className='body-container'>
                    <Outlet/>
                </Container>
            {/* </Box> */}
        </>
        
    )
}

export default AdminLayout;