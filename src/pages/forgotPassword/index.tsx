import React, { useEffect, useState } from 'react'
import { ThemeProvider } from "@emotion/react"
import { CssBaseline, createTheme, Grid, FormControlLabel, Button, TextField, Box, Avatar, Typography, Checkbox, Link, Paper, IconButton } from "@mui/material"
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { Visibility, VisibilityOff } from "@mui/icons-material" 
import { useNavigate } from "react-router-dom"
import {useFormik} from 'formik'
import { forgotPasswordSchema } from 'utils/signup_validation'
import '../../index.scss'


const Image: string = require('../../assets/Cranee.svg').default

const ForgotPassword: React.FC  =()=>{

    const theme = createTheme();
    const navigate = useNavigate();
    const [success, setSuccess] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    
   
    const handleSubmit = async () =>{

        try{

            const response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/user/forgotPassword`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    email: formik.values.email
                })
            });

            if(!response.ok){
                const errorMessage = await response.json();
                throw new Error(errorMessage)
            }

            setSuccess(true)
         

        }catch(error){
            setError(error.message);
        }
    }

    const formik = useFormik({
        initialValues:{
          email: ''
        },
        validationSchema: forgotPasswordSchema,
        onSubmit: handleSubmit
    });

    return (
        <ThemeProvider theme={theme}>
            <Grid container sx={{height:'100vh'}}>
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
                        success ? (
                            <>
                                <Typography component="p" variant="h4">
                                    Reset password link sent. Please check your registered mail.
                                </Typography>
                                <Box sx={{ mt: 3 }}>
                                <Box>
                                    <Link href="/login" variant="body2">Go to Login</Link>
                                </Box>
                                </Box>
                            </>
                        ) : (
                            <>
                                <Avatar sx={{ m: 1, bgcolor: "#FEBE10" }}>
                                    <LockOutlinedIcon />
                                </Avatar>
                                <Typography component="h1" variant="h5">
                                    Forgot Password
                                </Typography>
                                <Box
                                component="form"
                                onSubmit={formik.handleSubmit}
                                width='80%'
                                sx={{ mt: 3 }}
                                >
                                    <Grid container spacing={2}>

                                        <Grid item xs={12}>
                                            <TextField
                                                required
                                                fullWidth
                                                id="email"
                                                label="Email Address"
                                                {...formik.getFieldProps('email')}
                                                error={formik.touched.email && Boolean(formik.errors.email)}
                                                helperText={formik.touched.email && formik.errors.email}
                                                />
                                        </Grid>
                                        
                                    </Grid>

                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2, backgroundColor:'#FEBE10', '&:hover':{backgroundColor:'#FEBE10'} }}
                                    >
                                        Send Reset Link
                                    </Button>


                                    <Grid container justifyContent="flex-end" sx={{maxWidth:'100%'}}>
                                        <Grid item>
                                                <Link onClick={()=>{navigate('/login')}} variant="body2">
                                                    Back to Login
                                                </Link>
                                            </Grid>
                                        
                                    </Grid> 
                                </Box>
                            </>
                        )
                    }              
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    )
}

export default ForgotPassword;