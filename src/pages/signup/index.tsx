import React, { useEffect, useState } from 'react'
import { ThemeProvider } from "@emotion/react"
import { CssBaseline, createTheme, Grid, FormControlLabel, Button, TextField, Box, 
    Avatar, Typography, Checkbox, Link, Paper, IconButton, CircularProgress } from "@mui/material"
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { signupSchema } from "utils/signup_validation"
import { Visibility, VisibilityOff } from "@mui/icons-material" 
import { useNavigate } from "react-router-dom"
import {ErrorMessage, useFormik} from 'formik'
import '../../index.scss'

const Image: string = require('../../assets/Cranee.svg').default

const Signup: React.FC  =()=>{

    const theme = createTheme();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isSignupSuccess, setIsSignupSuccess] = useState(false);
    const [errorResponse, setError] = useState('');
    const [isLoading, setLoading] = useState(false);
    // const handleShowPassword =()=> setShowPassword(!showPassword);
    // const handleShowConfirmPassword=()=> setShowConfirmPassword(!showConfirmPassword);

    

    const handleSubmit = async () =>{
        
        setLoading(true);
        try{
            const response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/user/signup`,{
                method:'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    firstName: formik.values.firstName,
                    lastName: formik.values.lastName,
                    email: formik.values.email,
                    mobileNumber: formik.values.mobileNumber,
                    password: formik.values.password
                })
            });

            console.log("response: ", response);
            
            if(!response.ok){
                const errorMessage = await response.json();
                throw new Error(errorMessage.message);
            }
            
            setIsSignupSuccess(true);

        }catch(error){
            console.error('Error signing up: ', error.message);
            setError(error.message);
            
        }finally{
            setLoading(false);
        }
    }

    

    const formik = useFormik({
        initialValues:{
          firstName: '',
          lastName: '',
          email: '',
          mobileNumber: '',
          password: '',
          confirmPassword: '',
        },
        validationSchema: signupSchema,
        onSubmit: handleSubmit
      });

    return (
        <ThemeProvider theme={theme}>
            <Grid container sx={{height:'100vh', overflow:'auto'}}>
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
                { isSignupSuccess ? (
                    <>
                        <Typography component="p" variant="h4">
                            Click verification link sent to your email to complete signup process
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
                ):(
                        
                        <>
                            <Avatar sx={{ m: 1, bgcolor: "#FEBE10" }}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Sign up
                            </Typography>
                            <Box
                            component="form"
                            onSubmit={formik.handleSubmit}
                            sx={{ mt: 3 }}
                            >
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="firstName"
                                            label="First Name"
                                            color='primary'
                                            autoFocus
                                            {...formik.getFieldProps('firstName')}
                                            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                                            helperText={formik.touched.firstName && formik.errors.firstName}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="lastName"
                                            label="Last Name"
                                            {...formik.getFieldProps('lastName')}
                                            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                                            helperText={formik.touched.lastName && formik.errors.lastName}
                                        />
                                    </Grid>

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

                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="mobileNumber"
                                            label="Mobile Number"
                                            {...formik.getFieldProps('mobileNumber')}
                                            error={formik.touched.mobileNumber && Boolean(formik.errors.mobileNumber)}
                                            helperText={formik.touched.mobileNumber && formik.errors.mobileNumber}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            label="Password"
                                            type={showPassword?'text' : 'password'}
                                            id="password"
                                            {...formik.getFieldProps('password')}
                                            InputProps={{
                                                endAdornment: (
                                                    <IconButton onClick={()=> setShowPassword(!showPassword)} edge="end">
                                                        {showPassword ? <Visibility/> : <VisibilityOff/>}
                                                    </IconButton>
                                                ),
                                                }}
                                            error={formik.touched.password && Boolean(formik.errors.password)}
                                            helperText={formik.touched.password && formik.errors.password}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            label="confirmPassword"
                                            type={showConfirmPassword?'text' : 'password'}
                                            id="confirmPassword"
                                            {...formik.getFieldProps('confirmPassword')}
                                            InputProps={{
                                                endAdornment: (
                                                <IconButton onClick={()=>setShowConfirmPassword(!showConfirmPassword)} edge="end">
                                                    {showConfirmPassword ? <Visibility/> : <VisibilityOff/>}
                                                </IconButton>
                                                ),
                                                }}
                                            error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                                            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                                        />
                                    </Grid>

                                    
                                </Grid>

                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2, backgroundColor:'#FEBE10', '&:hover':{backgroundColor:'#FEBE10'} }}
                                >
                                    Sign Up
                                </Button>

                                
                                <Grid container justifyContent="space-between" sx={{maxWidth:'100%'}}>
                                    <Grid item>
                                            <Link onClick={()=>{navigate('/')}} variant="body2">
                                                Back to Home
                                            </Link>
                                        </Grid>
                                    <Grid item> 
                                        <Link onClick={()=>{navigate('/login')}} variant="body2">
                                            Already have an account? Login
                                        </Link>
                                    </Grid>
                                </Grid>
                                
                                {isLoading && 
                                    <Grid container justifyContent='center' marginTop={'1rem'}>
                                        <CircularProgress/>
                                    </Grid>
                                }

                                {
                                    errorResponse && (
                                        <Grid container justifyContent='center' marginTop={'1rem'}>
                                            <Typography variant='h5' color='error'>
                                                {errorResponse}
                                            </Typography>
                                        </Grid>
                                    )
                                } 
                            </Box>
                        </>
                    
                )}
                </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    )
}

export default Signup;