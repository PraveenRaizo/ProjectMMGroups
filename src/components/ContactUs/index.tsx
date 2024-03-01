import React from "react";
import { Grid, Typography, Box, useMediaQuery } from "@mui/material";
import EmailIcon from '@mui/icons-material/Email';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import XIcon from '@mui/icons-material/X';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';

const ContactUs:React.FC=()=>{

    const isSmallScreen = useMediaQuery(`(max-width: 845px)`);


    return (
        <Grid sx={{display:'flex', alignItems:'center', flexDirection:'column'}}>

            <Typography  sx={{marginBottom:'10px', typography:{lg: 'h1', md:'h3', sm:'h5', xs:'h6' }}}>Contact Us</Typography>
            
            <Typography sx={{typography:{lg: 'h3', md:'h4', sm:'h5', xs:'h6' }}} align="center">MM Electricals & Engineering </Typography>
            <Typography sx={{typography:{lg: 'h6', md:'body1', sm:'body2', xs:'body2' }}} align="center">No:91/12, Esanimoorthy Koil Street, Thiruvottriyur, Chennai-600019</Typography>
            <Typography sx={{typography:{lg: 'h6', md:'body1', sm:'body2', xs:'body2' }}} align="center">+91 9444031117 | 8122202385</Typography>
            <Box sx={{display:'flex', flexDirection:'row', alignItems:'center'}}><EmailIcon/><Typography sx={{marginLeft:'8px',typography:{lg: 'h6', md:'body1', sm:'body2', xs:'body2' }}} align='center'>mmelectricalengineering@gmail.com </Typography></Box>

            <Grid container direction="row" alignItems="center" justifyContent="center" spacing={2}>
                <Grid item>
                    <InstagramIcon />
                </Grid>
                <Grid item>
                    <FacebookIcon />
                </Grid>
                <Grid item>
                    <XIcon />
                </Grid>
                <Grid item>
                    <WhatsAppIcon />
                </Grid>
                <Grid item>
                    <EmailIcon />
                </Grid>
                
            </Grid>
            
        </Grid>
        
        
    )
}

export default ContactUs;