import React, { useEffect, useState } from 'react'
import { ThemeProvider } from "@emotion/react"
import { CssBaseline, createTheme, Grid, FormControlLabel, Button, TextField, Box, Avatar, Typography, Checkbox, Link, Paper, IconButton } from "@mui/material"
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { Visibility, VisibilityOff } from "@mui/icons-material" 
import { useNavigate, useLocation } from "react-router-dom"
import {useFormik} from 'formik'
import { resetPasswordSchema } from 'utils/signup_validation'
import '../../index.scss'


const Image: string = require('../../assets/Cranee.svg').default

const ResetPassword: React.FC  =()=>{

    const theme = createTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [success, setSuccess] = useState('');
    const [errorResponse, setErrorResponse] = useState('');

   
    const handleSubmit = async () =>{

        const searchParams = new URLSearchParams(location.search)
        const id = searchParams.get('id');

        try{

            const response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/user/resetPassword?id=${id}`,{
                method:'PUT',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    password: formik.values.password
                })
            });

            console.log('REsponse: ', response)
            if(!response.ok){
                const errorMessage = await response.json();
                throw new Error(errorMessage.message)
            }

            setSuccess('Reset Password Successful')
         

        }catch(error){
            setErrorResponse(error.message);
        }
            
    }

    const formik = useFormik({
        initialValues:{
          password: '',
          confirmPassword: ''
        },
        validationSchema: resetPasswordSchema,
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
                                        Reset Password successful
                                    </Typography>
                                    <Box sx={{ mt: 3 }}>
                                    <Box>
                                        <Link href="/login" variant="body2">Go to Login</Link>
                                    </Box>
                                    </Box>
                                </>
                            ) : 
                            (
                                <>
                                    <Avatar sx={{ m: 1, bgcolor: "#4D8AA1" }}>
                                        <LockOutlinedIcon />
                                    </Avatar>
                                    <Typography component="h1" variant="h5">
                                        Reset Password
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
                                            sx={{ mt: 3, mb: 2, backgroundColor:'#4D8AA1', '&:hover':{backgroundColor:'#4D8AA1'} }}
                                        >
                                            Reset Password
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

export default ResetPassword;