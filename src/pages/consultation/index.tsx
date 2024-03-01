import React, {useEffect, useState} from "react";
import { Grid, ThemeProvider, Typography, useMediaQuery, Button, Link, TextField, MenuItem } from "@mui/material";
import { useNavigation } from "react-router-dom";
import { useFormik } from "formik";
import { useTheme } from '@emotion/react'
import { jwtDecode } from 'jwt-decode';
import { consultationSchema } from "utils/signup_validation";

//@ts-ignore
import AutomotiveLogo from '../../assets/consultation/automobiles.png'
//@ts-ignore
import WindmillLogo from '../../assets/consultation/windMill.png'
//@ts-ignore
import PaperLogo from '../../assets/consultation/Paper.png'
//@ts-ignore
import FmcgLogo from '../../assets/consultation/shopping_cart.png'
//@ts-ignore
import PharmaLogo from '../../assets/consultation/pharma.png'
//@ts-ignore
import HeavyEnggLogo from '../../assets/consultation/heavyEngineering.png'
//@ts-ignore
import PowerLogo from '../../assets/consultation/power.png'
//@ts-ignore
import InfraLogo from '../../assets/consultation/Infrastructure.png'
//@ts-ignore
import AppliancesLogo from '../../assets/consultation/Appliances.png'
//@ts-ignore
import GranitesLogo from '../../assets/consultation/Granites.png'
//@ts-ignore
import OthersLogo from '../../assets/consultation/Others.png'
//@ts-ignore
import WeightLogo from '../../assets/consultation/weight.png'
//@ts-ignore
import ScaleLogo from '../../assets/consultation/Scale.png'


interface Logo {
    name: string;
    image: string;
}


interface Props {
    logo: Logo;
    onClick: (name: string)=>void;
    isSelected: boolean;
}

interface DutyClass {
    name: string;
    description: string;
}

interface DutyClassItemProps{
    dutyClass: DutyClass;
    onClick: (name: string)=> void;
    isSelected: boolean;
}

interface LoggedUser{
    
    email: string;
    firstName: string;
    iat: number;
    id: string;
    isAdmin: boolean;
    mobileNumber: string;

}

const Consultation:React.FC=()=>{


    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [loggedUser, setLoggedUser] = useState<LoggedUser | null>(null);
    const [industry, setIndustry] = useState<string>('');
    const [capacity, setCapacity] = useState<string>('');
    const [span, setSpan] = useState<string>('');
    const [dutyClass, setDutyClass] = useState<string>('');

    const [isFeetSelected, setIsFeetSelected] = useState<boolean>(false);
    const [isMeterSelected, setIsMeterSelected] = useState<boolean>(true);  

    const theme = useTheme();

    const decodeJWT =(token: string): any =>{
        try{
            return jwtDecode(token);
        }catch(error){
            console.error('Error decoding JWT token: ', error);
            return null;
        }
    };

    const checkLoggedIn =()=>{

        const jwtToken = localStorage.getItem('jwtToken');

        if(jwtToken){   
            setIsLoggedIn(true);
            const decodedUser = decodeJWT(jwtToken);
            if(decodedUser){
                setLoggedUser(decodedUser);
                // console.log('Logged USER: ', loggedUser)
            }
        }else{
            setIsLoggedIn(false);
            setLoggedUser(null);
        }
        
    }
    
   
    const handleSubmit= async ()=>{

        console.log('Formik Values: ')
        console.log(formik.values.companyName)
        console.log(formik.values.email)
        console.log(formik.values.mobileNumber)
        console.log(formik.values.capacity)
        console.log(formik.values.customQuery)
        console.log(formik.values.address)
        console.log(formik.values.roleSelect)
        console.log(formik.values.span)
    }

    const formik = useFormik({
        initialValues:{
            companyName: '',
            email: '',
            mobileNumber: '',
            address: '',
            roleSelect: '',
            customQuery: '',
            industry: industry,
            capacity: capacity,
            span: span,
            dutyClass: dutyClass
        },
        validationSchema: consultationSchema,
        onSubmit: handleSubmit
    })

    useEffect(()=>{
        checkLoggedIn();
        // console.log('FORMIK: ', formik)

        formik.setValues({
            companyName: '',
            email: loggedUser?.email || '',
            mobileNumber: loggedUser?.mobileNumber || '',
            address: '',
            roleSelect: '',
            customQuery: '',
            industry: industry,
            capacity: capacity,
            span: span,
            dutyClass: dutyClass
        })

    }, [isLoggedIn]);
    

    const roles = ['Owner/Executive', 'General/Operations Manager', 'Production Manager', 'Consultant'];

    const industries = [
        { name: 'Automotive', image: AutomotiveLogo},
        { name: 'Windmill', image: WindmillLogo},
        { name: 'Paper', image: PaperLogo},
        { name: 'FMCG', image: FmcgLogo},
        { name: 'Pharma', image: PharmaLogo },
        { name: 'Heavy Engineering', image: HeavyEnggLogo},
        { name: 'Power', image: PowerLogo},
        { name: 'Infrastructure', image: InfraLogo},
        { name: 'Appliances', image: AppliancesLogo},
        { name: 'Granites', image: GranitesLogo},
        { name: 'Others', image: OthersLogo}
    ];

    const liftingCapacities = [
        { name: 'Upto 2 tons', image: WeightLogo},
        { name: 'Upto 5 tons', image: WeightLogo},
        { name: 'Upto 10 tons', image: WeightLogo},
        { name: 'Upto 20 tons', image: WeightLogo},
        { name: 'Upto 40 tons', image: WeightLogo},
        { name: 'Upto 63 tons', image: WeightLogo},
        { name: 'Upto 80 tons', image: WeightLogo},
        { name: 'Over 80 tons', image: WeightLogo}
    ];

    const spanMeters = [
        { name: 'Up to 6m', image: ScaleLogo},
        { name: 'Up to 10m', image: ScaleLogo},
        { name: 'Up to 20m', image: ScaleLogo},
        { name: 'Up to 30m', image: ScaleLogo},
        { name: 'Over 30m', image: ScaleLogo}
    ];

    const spanFeet = [
        { name: "Up to 20'", image: ScaleLogo},
        { name: "Up to 33'", image: ScaleLogo},
        { name: "Up to 66'", image: ScaleLogo},
        { name: "Up to 98'", image: ScaleLogo},
        { name: "Over 98'", image: ScaleLogo},
    ];

    const dutyClasses: DutyClass[] = [
        { name:'M3', description: 'STANDBY OR INFREQUENT'},
        { name:'M4', description: 'LIGHT SERVICE'},
        { name:'M5', description: 'MODERATE SERVICE'},
        { name:'M6', description: 'HEAVY SERVICE'},
        { name:'M7', description: 'SEVERE SERVICE'},
        { name:'M8', description: 'CONTINUOUS SEVERE'},
    ]

    const handleIndustrySelection = (selectedIndustry: string) => {
        setIndustry(selectedIndustry);
        // console.log("SELECTED INdustry:",industry)
    }

    const handleCapacitySelection = (selectedCapacity: string)=>{
        setCapacity(selectedCapacity);
    }

    const handleDutyClassSelection = (selectedDutyClass: string)=>{
        setDutyClass(selectedDutyClass);
    }

    const handleSpan = (selectedSpan: string) => {
        setSpan(selectedSpan);
    }

    const handleFeet =()=>{

        setIsFeetSelected(!isFeetSelected);
        setIsMeterSelected(!isMeterSelected);
    }

    const handleMeters =()=>{

        setIsFeetSelected(!isFeetSelected);
        setIsMeterSelected(!isMeterSelected);
    }

    return (

        // <ThemeProvider theme={theme}>

            <Grid sx={{width:'100%', height: 'auto'}}>

                {/* Industry Selection */}
                <Grid
                    sx={{
                        // height:{lg:'50vh', md:'50vh', xs:'50vh'}, 
                        backgroundColor:'rgba(0,0,0,0.15)',
                        display:'flex',
                        flexDirection:'column',
                        alignItems:'center',
                        paddingTop:'50px',
                        paddingBottom:'10px'
                    }}
                >
                    <Typography textAlign={'center'} sx={{ color: '#002244', textTransform: 'uppercase' }}> Please select your requirements </Typography>
                    <Typography textAlign={'center'} sx={{ color: '#002244', textTransform: 'uppercase' }}>Any custom requirements can be filled at the final step</Typography>
                    <Typography textAlign={'center'} sx={{ color: '#002244', textTransform: 'uppercase', marginTop:'2rem' }}>Step1: Industry</Typography>
                    <Typography textAlign={'center'} sx={{ color: '#002244', textTransform: 'uppercase' }}>Select your Industry type</Typography>
                    
                    <Grid container justifyContent='center' spacing={5} sx={{marginTop:'5rem'}}>
                        {
                            industries.map((logo, index)=>(
                                <Grid item key={index}>
                                    <ClickableLogo logo={logo} onClick={handleIndustrySelection} isSelected={industry === logo.name} />
                                </Grid>
                            ))
                        }
                    </Grid>            
                </Grid>
                
                {/* Capacity Selection */}
                <Grid
                    sx={{
                        // height:{lg:'50vh', md:'50vh', xs:'50vh'}, 
                        backgroundColor:'whitesmoke',
                        display:'flex',
                        flexDirection:'column',
                        alignItems:'center',
                        paddingTop:'50px',
                        paddingBottom:'10px'
                    }}
                >
                    <Typography textAlign={'center'} sx={{ color: '#002244', textTransform: 'uppercase', marginTop:'2rem' }}>Step2: Capacity</Typography>
                    <Typography textAlign={'center'} sx={{ color: '#002244', textTransform: 'uppercase' }}>Select your maximum lifting capacity</Typography>
                    
                    <Grid container justifyContent='center' spacing={5} sx={{marginTop:'5rem'}}>
                        {
                            liftingCapacities.map((logo, index)=>(
                                <Grid item key={index}>
                                    <ClickableLogo logo={logo} onClick={handleCapacitySelection} isSelected={capacity === logo.name} />
                                </Grid>
                            ))
                        }
                    </Grid>

                </Grid>

                {/* Span selection */}
                <Grid
                    sx={{
                        // height:{lg:'50vh', md:'50vh', xs:'50vh'}, 
                        backgroundColor:'rgba(0,0,0,0.15)',
                        display:'flex',
                        flexDirection:'column',
                        alignItems:'center',
                        paddingTop:'50px',
                        paddingBottom:'10px'
                    }}
                >
                    <Typography textAlign={'center'} sx={{ color: '#002244', textTransform: 'uppercase', marginTop:'2rem' }}>Step3: Span</Typography>
                    <Typography textAlign={'center'} sx={{ color: '#002244', textTransform: 'uppercase' }}>Select your span in: </Typography>

                    <Grid>
                        <Button
                            onClick={handleMeters} 
                            sx={{padding:'5px', 
                            backgroundColor: isMeterSelected? '#00308F':'transparent', 
                            '&:hover': {backgroundColor: isMeterSelected? '#00308F':'transparent', color: isMeterSelected? 'white':'black'}, 
                            color: isMeterSelected?'white':'black'}}
                        >
                            Meters
                        </Button>
                        <Button
                            onClick={handleFeet} 
                            sx={{padding:'5px', 
                            backgroundColor: isFeetSelected? '#00308F':'transparent', 
                            '&:hover': {backgroundColor: isFeetSelected? '#00308F':'transparent', color: isFeetSelected? 'white' : 'black'}, 
                            color:isFeetSelected?'white':'black'}}
                        >
                            Feet
                        </Button>
                    </Grid>

                    {
                        isMeterSelected && !isFeetSelected ? (
                            <Grid container justifyContent='center' spacing={5} sx={{marginTop:'5rem'}}>
                                {
                                    spanMeters.map((logo, index)=>(
                                        <Grid item key={index}>
                                        <ClickableLogo logo={logo} onClick={handleSpan} isSelected={span === logo.name} />
                                        </Grid>
                                    ))
                                }
                            </Grid>
                        ) : (
                            <Grid container justifyContent='center' spacing={5} sx={{marginTop:'5rem'}}>
                                {
                                    spanFeet.map((logo, index)=>(
                                        <Grid item key={index}>
                                        <ClickableLogo logo={logo} onClick={handleSpan} isSelected={span === logo.name} />
                                        </Grid>
                                    ))
                                }
                            </Grid>
                        )
                    }                   
                </Grid>

                {/* Duty class selection */}
                <Grid
                    sx={{
                        // height:{lg:'50vh', md:'50vh', xs:'50vh'}, 
                        backgroundColor:'whitesmoke',
                        display:'flex',
                        flexDirection:'column',
                        alignItems:'center',
                        paddingTop:'50px',
                        paddingBottom:'10px'
                    }}
                >
                    <Typography textAlign={'center'} sx={{ color: '#002244', textTransform: 'uppercase', marginTop:'2rem' }}>Step4: Duty Class</Typography>
                    <Typography textAlign={'center'} sx={{ color: '#002244', textTransform: 'uppercase' }}>Select your Crane usage classifications as per:</Typography>
                    <Button sx={{backgroundColor:'#00308F', padding:'5px', color:'white', '&:hover':{backgroundColor:'#00308F',color:'white'}}}>Fem/bsi</Button>
                    <Grid container justifyContent='center' spacing={5} sx={{marginTop:'5rem', marginLeft:'0.2rem'}}>
                        {
                            dutyClasses.map((dutyclass, index)=>(
                                <DutyClassItem key={index} dutyClass={dutyclass} onClick={handleDutyClassSelection} isSelected={dutyClass === dutyclass.name }/>
                            ))
                        }
                    </Grid>

                </Grid>

                {/* Contact Details form */}        
                <Grid 
                    sx={{
                        display:'flex',
                        flexDirection:'column',
                        alignItems:'center',
                        paddingRight:{lg: '5rem', md:'5rem', sm:'5rem', xs:'0rem'},
                        paddingLeft:{lg: '5rem', md:'5rem', sm:'5rem', xs:'0rem'},
                        paddingTop:'5rem',
                        paddingBottom:'5rem'
                    }}
                >

                    {
                        isLoggedIn ? (

                            <form onSubmit={formik.handleSubmit}>
                                <Grid container spacing={2} sx={{padding:{lg:'1rem', md:'0rem', sm:'0rem', xs:'0rem'}, maxWidth:{lg:'50vw', xs:'80vw'}}}>

                                    <Grid item xs={12}>
                                        <Typography sx={{typography:{lg:'h4', md:'h5', sm:'h6', xs:'body1'}, fontWeight:'bold', textAlign:'center'}}>Contact Details</Typography>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label='companyName'
                                            variant="outlined"
                                            value={formik.values.companyName}
                                            onChange={(event)=> formik.setFieldValue('companyName', event.target.value)}
                                            error={formik.touched.companyName && Boolean(formik.errors.companyName)}
                                            helperText={formik.touched.companyName && formik.errors.companyName}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label='email'
                                            variant="outlined"
                                            value={formik.values.email}
                                            disabled
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label='mobile number'
                                            variant="outlined"
                                            value={formik.values.mobileNumber}
                                            disabled
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label='Address'
                                            multiline
                                            rows={4}
                                            variant="outlined"
                                            value={formik.values.address}
                                            onChange={(event)=> formik.setFieldValue('address', event.target.value)}
                                            error={formik.touched.address && Boolean(formik.errors.address)}
                                            helperText={formik.touched.address && formik.errors.address}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextField
                                            select
                                            fullWidth
                                            label='Role'
                                            variant="outlined"
                                            value={formik.values.roleSelect}
                                            onChange={(event)=> formik.setFieldValue('roleSelect', event.target.value)}
                                            error={formik.touched.roleSelect && Boolean(formik.errors.roleSelect)}
                                            helperText={formik.touched.roleSelect && formik.errors.roleSelect}
                                        >
                                            {
                                                roles.map((role)=>(
                                                    <MenuItem key={role} value={role}>
                                                        {role}
                                                    </MenuItem>
                                                ))
                                            }
                                        </TextField>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            multiline
                                            rows={10}
                                            label='Short Description'
                                            variant="outlined"
                                            value={formik.values.customQuery}
                                            onChange={(event)=> formik.setFieldValue('customQuery', event.target.value)}
                                            error={formik.touched.customQuery && Boolean(formik.errors.customQuery)}
                                            helperText={formik.touched.customQuery && formik.errors.customQuery}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Button type="submit" variant="contained" sx={{backgroundColor:'#00308F', color:'white', '&:hover':{backgroundColor:'#00308F', color:'white'}}}>
                                            Submit
                                        </Button>

                                        <Button type="button" variant="contained" onClick={() => window.location.reload()} sx={{marginLeft:'1rem', backgroundColor:'#FF4500', '&:hover':{backgroundColor:'#FF4500', color:'white'}}}>
                                            Reset
                                        </Button>
                                    </Grid>

                                </Grid>
                            </form>
                            
        
                        ) : (

                            <Grid sx={{display:'flex', alignItems:'center', flexDirection:'column'}}>
                                <Typography fontWeight='bold' sx={{typography:{lg:'h4', md:'h5', sm:'h6', xs:'body1'}, textTransform:'uppercase', textAlign:'center'}}>
                                    User is not logged in. Please signup and login to complete the form.
                                </Typography>
                                <Link href='/login' sx={{marginTop:'1rem'}}>Login</Link>
                                <Link href='/signup' sx={{marginTop:'1rem'}}>SignUp</Link>
                            </Grid>
                            
                        )
                    }
                    



                </Grid>

                
            </Grid>

        // </ThemeProvider>
    
    )
}

const ClickableLogo:React.FC<Props> = ({logo, onClick, isSelected}) => {
    return (
        <Grid onClick={()=> onClick(logo.name)} style={{cursor:'pointer', backgroundColor: isSelected ? '#00308F' : 'transparent', borderRadius:'4px', padding:'5px'}} sx={{display:'flex', flexDirection:'column', alignItems:'center'}}>
            <img src={logo.image} alt={logo.name} style={{width:'80px', height:'60px'}} />
            <Typography variant="body2" align="center" sx={{color: isSelected ? '#ffffff' : '#002244', textTransform:'uppercase', marginTop:'0.3rem'}}>{logo.name}</Typography>
        </Grid>
    )
}

const DutyClassItem: React.FC<DutyClassItemProps> = ({ dutyClass, onClick, isSelected }) => {

    return (
        <Grid
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >

            <div 
                style={{
                    backgroundColor: isSelected ? '#00308F' : 'rgba(0,0,0,0.5)',
                    margin: '1rem',
                    borderRadius: '50%',
                    cursor:'pointer',
                    width:150,
                    height:150,
                    display:'flex',
                    justifyContent:'center',
                    flexDirection:'column',
                    alignItems:'center',
                    marginBottom:10
                }}
                onClick={()=>onClick(dutyClass.name)}
            >
                <Typography variant="h5" align="center" sx={{ color:'#ffffff', textTransform:'uppercase'}}>
                    {dutyClass.name}
                </Typography>
                <Typography variant="caption" align="center" sx={{ color:'#ffffff', textTransform:'uppercase'}}>
                    {dutyClass.description}
                </Typography>
            </div>

            

        </Grid>
    )
}

export default Consultation;