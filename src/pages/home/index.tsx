import React,{useState} from 'react'
import { Avatar, Grid, Typography, Box, ThemeProvider, Button, Icon, useMediaQuery, useTheme} from '@mui/material'
// import ReactPlayer from 'react-player/lazy'
import '../../home.scss'
//@ts-ignore
import videoFile from '../../assets/cranefactory.mp4'
//@ts-ignore
import CraneWireframe from '../../assets/crane_wireframe.svg'
//@ts-ignore
import CraneLogo from '../../assets/CraneHookLogoNoBg.png'
import Carousel from 'components/Carousel'
import { Height } from '@mui/icons-material'
import ContactUs from 'components/ContactUs'
import OurClients from 'components/OurClients'
//@ts-ignore
import {ReactComponent as CalculatorIcon} from '../../assets/crane-calculator.svg'
//@ts-ignore
import {ReactComponent as QuoteIcon} from '../../assets/sign_contract.svg'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';

// const Image: string = require('../../assets/Cranee.svg').default
// const videoFile: string = require('../../assets/cranefactory.mp4').default


const Home: React.FC = () => {

  const theme = useTheme();
  const navigate = useNavigate();
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  
  const isSmallScreen = useMediaQuery(`(max-width: 845px)`);
  const isSmallHeight = useMediaQuery(`(max-height:  600px)`);

  // const handleConsole=()=>{
  //   console.log('isSmallScreen',isSmallScreen)
  // }

  // handleConsole();

  return (
    
    <ThemeProvider theme={theme}>

      {/* video content */}
      <div className='main_wrapper'>

        {/* <video src="https://css-tricks-post-videos.s3.us-east-1.amazonaws.com/708209935.mp4" autoPlay loop playsInline muted></video> */}
        <video src={videoFile} autoPlay loop playsInline muted></video>

        {/* <iframe src="https://player.vimeo.com/video/829767205?background=1&amp;dnt=1" frameBorder="0" allow="autoplay; fullscreen" allowFullScreen></iframe> */}

        <div className='overlay_content'> 
          
          { 
            isSmallHeight ? (
              <Typography variant='h5' sx={{marginTop:'1rem'}}>Safe, sustainable & reliable mobile crane hire</Typography>
            ) : (
              isSmallScreen ? (
                  <Typography variant='h5' sx={{marginTop:'1rem'}}>Safe, sustainable & reliable mobile crane hire</Typography>
              ) : (
                  <Typography variant='h2' sx={{marginTop:'1rem'}}>Safe, sustainable & reliable mobile crane hire</Typography>
              )
            )
          }


          <Grid container spacing={2} marginTop={'1rem'} sx={{display:'flex', justifyContent:{xs:'column'}, marginLeft:{xs:'0.1rem'}, }}>
           
              <Button
                sx={{
                  backgroundColor:'#FEBE10', 
                  color:'white',
                  display:'flex',
                  alignItems:'center',
                  padding:0,
                  paddingRight:1,
                  '&:hover' : {backgroundColor:'#002D62', transition:'background-color 0.5s ease-out'},
                  marginBottom:'8px'
                }}
                onClick={()=>navigate('/craneCalculator')}
              >
                <CalculatorIcon width={50} height={50} style={{marginRight:'8px'}}/>
                Crane Calculator
              </Button>
            
            
            
              <Button
                sx={{
                  backgroundColor:'#FEBE10', 
                  color:'white',
                  display:'flex',
                  alignItems:'center',
                  padding:0,
                  paddingRight:1,
                  '&:hover' : {backgroundColor:'#002D62', transition:'background-color 0.5s ease-out'},
                  height:'0',
                  marginLeft:{lg:'1rem', md:'1rem'}
                }}
                onClick={()=>navigate('/consultation')}
              >
                <QuoteIcon width={50} height={50} style={{marginRight:'8px', padding:'5px', backgroundColor:'#0a2351'}}/>
                Get Quote
              </Button>
            

          </Grid>
          
        </div>

      </div>

      {/* About section */}
      <Grid 
        sx={{
          width:'100vw', 
          minHeight:'70vh',
          backgroundImage:`url(${CraneWireframe})`,
          backgroundSize: 'cover',
          backgroundPosition:'center',
          display:'flex',
          alignItems:'center',
          justifyContent:'center'
        }}
      >
        <Grid sx={{backgroundColor:'transparent', height:'60vh', width:'80vw',display:'flex', flexDirection:'row', alignItems:'center'}}>
          <Grid item sx={{ height:{lg:'100%', md:'100%', xs:'80%'}, width: {lg:'50%', md:'50%', xs:'100%'}, padding: '20px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', backgroundColor:'rgba(227, 227, 227, 0.8)'}}>
            <Typography variant="h3" gutterBottom>About</Typography>
            <Typography variant='h4' gutterBottom>MM Cranes</Typography>
            <Typography variant="h5" gutterBottom>Crane Manufacturers in Tamil Nadu</Typography>
            <Typography variant="h6" gutterBottom style={{overflow:'hidden'}}>MM Cranes Pvt., Ltd., Chennai, established in the year 2008 with the vision to be a “Crane manufacturers with quality and class”. MM Cranes specialize in Single & Double Girder EOT, Gantry/Goliath, Pillar mounted jib Cranes, over head crane parts, CTL machine and Silliting Machines.</Typography>
            <Typography variant="body1" gutterBottom><Link to='/about' style={{textDecoration:'none', color:'blue'}}>See more...</Link></Typography>
          </Grid>

          <Grid item sx={{ height: '100%', width: '50%', padding: '20px', boxSizing: 'border-box', display: {lg:'flex', md:'flex', xs:'none'}, alignItems: 'center', justifyContent: 'center' }}>
          {/* SVG Image */}
            <img src={CraneLogo} className='cranelogo' style={{height:'inherit'}}/>
          </Grid>
        </Grid>

      </Grid>

      {/* Our Products section */}
      <Grid 
        sx={{
          width:'100vw',
          backgroundColor:'white',
          display:'flex',
          flexDirection:'column',
          alignItems:'center',
          justifyContent:'center',
        }}
      >
        <Typography variant='h4' sx={{marginTop:'1rem'}}>Our Products</Typography>
        <Carousel/>
      </Grid>

      {/* Our Clients */}
      <Grid 
        sx={{
          marginTop:'10px',
          width:'100vw',
          // height:'50vh',
          backgroundColor:'rgba(0,0,0,0.05)',
          display:'flex',
          alignItems:'center',
          justifyContent:'center',
          flexDirection:'column'
        }}
      >
        <Typography variant='h4' sx={{marginTop:'1rem'}}>Our Clients</Typography>
        <OurClients/>
      </Grid>

      {/* Contact Us */}
      <Grid 
        sx={{
          width:'100vw',
          minHeight:'60vh',
          backgroundColor:'gray',
          display:'flex',
          alignItems:'center',
          justifyContent:'center',
          paddingBottom:'10px'
        }}
      >
        <ContactUs/>
      </Grid>

    </ThemeProvider>
    
  )
}

export default Home;


      
    