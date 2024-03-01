import React, {useEffect, useState} from "react"
import { Grid, Card, CardContent, Typography, Pagination, Button} from "@mui/material";

const RegisteredUsers:React.FC=()=>{

    const [registeredUsers, setRegisteredUsers] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);


    const fetchRegisteredUsers= async()=>{
        
        try{
            const jwtToken = localStorage.getItem('jwtToken') ?? '';

            const response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/user/registeredUsers?pageNo=${currentPage}`, {
                method:'GET',
                headers:{
                    'Content-Type' : 'application/json',
                    'token': jwtToken
                }
            });

            if(!response.ok){
                throw new Error('Unable to fetch registered Users');
            }

            const data = await response.json();
            // console.log('Data: ', data)
            setRegisteredUsers(data.message.users);
            setTotalPages(Math.ceil(data.message.totalCount/10));

        }catch(error){
            console.error('Error fetching registered users: ', error);
        }
    }

    useEffect(()=>{
        fetchRegisteredUsers();
    },[currentPage]);

    const handlePageChange=(event: any, value: any)=>{
        setCurrentPage(value);
    }

    const handleNoticed= async (email:string)=>{

        try{

            const jwtToken = localStorage.getItem('jwtToken') ?? '';

            const response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/user/markNoticed`,{
                method:'PUT',
                headers:{
                    'Content-Type' : 'application/json',
                    'token' : jwtToken
                },
                body:JSON.stringify({
                    email: email
                })
            });

            if(!response.ok){
                throw new Error('Unable to mark as noticed')
            }

            fetchRegisteredUsers();

        }catch(error){
            console.error('Error marking the status as noticed')
        }

    }

    const handleDownload = async()=>{
        
        try{

            const jwtToken = localStorage.getItem('jwtToken') ?? '';

            const response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/user/allRegisteredUsers`,{
                method: 'GET',
                headers:{
                    'Content-Type':'application/json',
                    'token': jwtToken
                }
            });

            const blob = await response.blob();
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'registeredUsers.csv');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

        }catch(error){
            console.error('Error downloading CSV: ', error);
        }
    };

    return (
        <Grid sx={{display:'flex', flexDirection:'column', alignItems:'center', padding:'0', height:'100vh', overflowY:'auto', marginTop:'1rem'}}>
            <Grid sx={{display:'flex', flexDirection:'row',  justifyContent:'space-between', marginTop:'1rem', marginBottom:'2rem', width:'100vw'}}>
                <h1>Registered Users</h1>
                <Button 
                    sx={{
                        height:{lg:'2rem', md:'2rem', xs:'3rem'}, 
                        width:'15rem', 
                        borderRadius:'5px', 
                        backgroundColor:'#00308F',
                        '&:hover':{backgroundColor:'#00308F'}, 
                        color:'white', 
                        marginRight:'1rem'
                    }}
                    onClick={handleDownload}
                >
                    Download
                </Button>
            </Grid>
            
            <Grid container spacing={2} sx={{maxWidth:'105vw', height:{lg:'80vh', md:'80vh', xs:'73vh'}, backgroundColor:'rgba(0,0,0,0.2)', padding:'10px', overflowY:'auto'}}>
                {
                    registeredUsers.map(user => (
                        <Grid key={user._id} item xs={12} sm={6} md={6} lg={6} sx={{maxWidth:'100vw'}}>
                            <Card >
                                <CardContent>
                                    <Typography variant="h6">{user.firstName} {user.lastName}</Typography>
                                    <Typography>Email: {user.email}</Typography>
                                    <Typography>Ph.No: {user.mobileNumber}</Typography>
                                    {
                                        user.isNoticed ? (
                                            <Button sx={{backgroundColor:'green', color:'white', '&:hover':{backgroundColor:'green'}}}>Noticed</Button>
                                        ):(
                                            <Button onClick={()=>handleNoticed(user.email)} sx={{backgroundColor:'red', color:'white', '&:hover':{backgroundColor:'green'}}}>Mark as Noticed</Button>
                                        )
                                    }
                                </CardContent>
                            </Card>
                        </Grid>    
                    ))
                }
            </Grid>
            <Pagination  count={totalPages} page={currentPage} onChange={handlePageChange}/>
        </Grid>
    );
}

export default RegisteredUsers;