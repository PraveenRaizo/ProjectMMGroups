import React, { useEffect, useState } from 'react'
import { ThemeProvider } from "@emotion/react"
import { CssBaseline, createTheme, Grid, FormControlLabel, Button, TextField, Box, Avatar, Typography, Checkbox, Link, Paper, IconButton } from "@mui/material"
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { Visibility, VisibilityOff } from "@mui/icons-material" 
import { useNavigate } from "react-router-dom"
import {useFormik} from 'formik'
import { jwtDecode } from 'jwt-decode'
import { loginSchema } from 'utils/signup_validation'
import '../../index.scss'



const Image: string = require('../../assets/Cranee.svg').default

const Login: React.FC  =()=>{

    const theme = createTheme();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [errorResponse, setErrorResponse] = useState('');
   
    const handleSubmit = async () =>{

        try{

            const response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/user/login`,{
                method:'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: formik.values.email,
                    password: formik.values.password
                })
            });

            console.log("response: ", response);
            
            if(!response.ok){
                const errorMessage = await response.json();
                throw new Error(errorMessage.message);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
            }

            const { token } = await response.json();

            // Log the JWT token to the console
            console.log('JWT token:', token);
            localStorage.setItem('jwtToken', token);

            const decodedToken : any = jwtDecode(token);
            console.log('JWTDECODE: ', decodedToken)

            if(decodedToken.isAdmin){
                console.log('enteredAdmin: ', typeof decodedToken.isAdmin, decodedToken.isAdmin);
                navigate('/admin/dashboard');
            }else{
                console.log('enteredDecode: ', typeof decodedToken.isAdmin);
                navigate('/');
                
            }

        }catch(error){
            console.error('Error signing up: ', error.message);
            setErrorResponse(error.message);
            console.error('ResponseMessage: ',errorResponse);
        }
    }

    const formik = useFormik({
        initialValues:{
          email: '',
          password: ''
        },
        validationSchema: loginSchema,
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
                        <Avatar sx={{ m: 1, bgcolor: "#FEBE10" }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Login
                        </Typography>
                        <Box
                        component="form"
                        onSubmit={formik.handleSubmit}
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
                                
                            </Grid>

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2, backgroundColor:'#FEBE10', '&:hover':{backgroundColor:'#FEBE10'} }}
                            >
                                Login
                            </Button>


                            <Grid container justifyContent="space-between" sx={{maxWidth:'100%'}}>
                                <Grid item>
                                        <Link onClick={()=>{navigate('/forgotpassword')}} variant="body2">
                                            Forgot Password?
                                        </Link>
                                    </Grid>
                                <Grid item sx={{display:'flex', flexDirection:'column', alignItems:'end'}}> 
                                    <Link onClick={()=>{navigate('/signup')}} variant="body2">
                                        New User? SignUp
                                    </Link>
                                    <Link onClick={()=>{navigate('/')}} variant="body2">
                                        Home
                                    </Link>
                                </Grid>
                            </Grid> 
                        </Box>

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
                </Grid>
            </Grid>
        </ThemeProvider>
    )
}

export default Login;