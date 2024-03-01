import React from "react";
import { Grid, Card, CardContent, Typography } from "@mui/material";
//@ts-ignore
import SaroSteels from '../../assets/SingleEOT.png'

const OurClients:React.FC=()=>{

    const cardItems= [
        {image:SaroSteels, client:'Saro Steels'},
        {image:SaroSteels,client:'Bharat Steels'},
        {image:SaroSteels,client:'Sri Amman Steel'},
        {image:SaroSteels,client:'Selam Steels'},
        {image:SaroSteels,client:'Kalpataru Metal Industries'},
        {image:SaroSteels,client:'Southern Ulogs'},
        // {image:SaroSteels,client:'Crayon Roofing'}
    ]

    return (
        <Grid container spacing={2} sx={{ backgroundColor: 'transparent', padding: '20px' }}>
            {cardItems.map((item, index) => (
                <Grid key={index} item xs={12} sm={6} md={4} lg={4}>
                    <Card>
                        <img src={item.image} alt="Company Image" style={{ width: '100%' }} />
                        <CardContent>
                            <Typography variant="h6" align="center">
                                {item.client}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    )
}

export default OurClients;