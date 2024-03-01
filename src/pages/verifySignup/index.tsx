import React, { useState } from 'react'
import { ThemeProvider } from "@emotion/react"
import { CssBaseline, createTheme, Grid, FormControlLabel, Button, TextField, Box, Avatar, Typography, Checkbox, Link, Paper, IconButton } from "@mui/material"
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { signupSchema, validateRegistrationSchema } from "utils/signup_validation"
import { Visibility, VisibilityOff } from "@mui/icons-material" 
import { useLocation, useNavigate } from "react-router-dom"
import {useFormik} from 'formik'

const Image: string = require('../../assets/Cranee.svg').default

const VerifySignup: React.FC =()=>{

    const theme = createTheme();
    const navigate = useNavigate();

    const location = useLocation();
    const [isLoading,setIsLoading] = useState(false);
    const [verificationSuccess, setVerificationSuccess] = useState(false);
    
    const handleVerify = async()=>{

        const searchParams = new URLSearchParams(location.search);
        const id = searchParams.get('id');
        console.log('id: ', id)

        if(!id){
            navigate('/');
            return;
        }

        setIsLoading(true);
        try{
            const response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/user/verifysignup?id=${id}`,{
                method:'PUT',
                headers:{
                    'Content-Type' : 'application/json'
                },
            });

            if(response.ok){
                setIsLoading(false);
                setVerificationSuccess(true);
            }else{
                throw new Error('Failed to verify user');
            }

        }catch(error){
            console.error('Error verifying user: ', error.message);
            setIsLoading(false);
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Grid container component='main' sx={{height:'100vh'}}>
                <CssBaseline/>
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: `url(${Image})`,
                        backgroundRepeat: "no-repeat",
                        backgroundColor: (t) =>
                          t.palette.mode === "light"
                            ? t.palette.grey[50]
                            : t.palette.grey[900],
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                />

                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                    sx={{
                    my: 8,
                    mx: 4,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    }}
                    >
                        {
                            verificationSuccess ? (
                                <>
                                    <Typography component="p" variant="h4">
                                        Verification Successful
                                    </Typography>
                                    <Box sx={{ mt: 3 }}>
                                    <Box>
                                        <Link href="/" variant="body2">Go to Home</Link>
                                    </Box>
                                    <Box>
                                        <Link href="/login" variant="body2">Go to Login</Link>
                                    </Box>
                                    </Box>
                                </>
                            ) : (
                                    <>
                                        <Avatar sx={{ m: 1, bgcolor: "#4D8AA1" }}>
                                        <LockOutlinedIcon />
                                        </Avatar>
                                        <Typography component="h1" variant="h5">
                                        Verify Registration
                                        </Typography>

                                        <Button
                                        onClick={handleVerify}
                                        disabled={isLoading}
                                        variant='contained'
                                        color='primary'
                                        sx={{mt:2}}
                                        >
                                        Verify
                                        </Button>

                                        {isLoading && <Typography variant='body1'>Verifying...</Typography>}
                                    </>
                            )
                        }
                    </Box>
                </Grid>

            </Grid>
        </ThemeProvider>
    )
}

export default VerifySignup;