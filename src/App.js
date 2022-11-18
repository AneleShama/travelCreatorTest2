import React, { useState }  from 'react';
import { CssBaseline, Grid } from '@material-ui/core';
import {AppBar, Toolbar, Typography, InputBase, Box} from '@material-ui/core';
import {Avatar, Divider, Link, Button, Chip} from '@material-ui/core';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import SearchIcon from '@material-ui/icons/Search';
import RoomIcon from '@mui/icons-material/Room';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import GoogleMapReact from 'google-map-react';


import useStyles from './style'


const App = () => {

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'b5b163f5c3msh115ef8964cddc11p154c3ejsndc14aeeafbf7',
      'X-RapidAPI-Host': 'apidojo-booking-v1.p.rapidapi.com'
    }
  };
  
  fetch('https://apidojo-booking-v1.p.rapidapi.com/properties/list?offset=30&arrival_date=2022-12-14&departure_date=2022-12-21&guest_qty=1&dest_ids=-3712125&room_qty=1&search_type=city&price_filter_currencycode=USD&latitude=16.0790434&longitude=108.2439106&order_by=popularity&languagecode=en-us&travel_purpose=leisure&categories_filter=distance%3A%3A3.32', options)
  .then(response => response.json())  
  .then(response => {
    console.log(response);
    document.getElementById('hotelName').innerHTML = response.result[18].hotel_name;
    document.getElementById('hotelName2').innerHTML = response.result[18].hotel_name;
    document.getElementById('hotelName3').innerHTML = response.result[18].hotel_name;
    document.getElementById('cityName').innerHTML = response.result[18].city;
    document.getElementById('hotelAddress').innerHTML = response.result[18].address;
    document.getElementById('countryName').innerHTML = response.result[18].country_trans;
    document.getElementById('hotelImage').src = response.result[18].main_photo_url;
    document.getElementsByClassName('book')[0].href = response.result[18].url;
    
  })
  .catch(err => console.error(err));


  fetch('https://apidojo-booking-v1.p.rapidapi.com/properties/get-description?hotel_ids=4263092&check_out=2022-12-14&languagecode=en-us&check_in=2022-12-21', options)
	.then(response => response.json())
	.then(response => {
    console.log(response);
    document.getElementById('descriptionOne').innerHTML = response[0].description;
    document.getElementById('descriptionTwo').innerHTML = response[1].description;
  })
	.catch(err => console.error(err));

  const classes = useStyles();
  const [center] = useState({lat: 16.0407, lng: 108.246});
  const [zoom] = useState(17);
  return (
    <>
      <CssBaseline />
      {/*Header Section*/}
      <AppBar position='fixed'  style={{opacity:0.95}}>
        <Toolbar className={classes.toolbar}>
          <Typography variant='h5' className={classes.title}>
            Hotel
          </Typography>
          <Box display='flex'>
            <Typography variant='h6' className={classes.title}>
              Explore the World
            </Typography>
            {/* <Autocomplete> */}
              <div className= {classes.search}>
                <div className= {classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase placeholder='Enter Distination' classes={{root: classes.InputRoot, input: classes.inputInput}}/>
              </div>
            {/* </Autocomplete> */}
          </Box>
        </Toolbar>
      </AppBar>
      {/*Profile Section*/}
      <div className={classes.container} style={{marginTop:70}}>
        <Grid container spacing={3}>
          <Grid item md={1}>
            <Avatar alt="Kritika Goel" src="https://launchwebsitedesign.com/wp-content/uploads/2017/09/josh-d-avatar.jpg" style={{width: 65, height: 65}}/>
          </Grid>
          <Grid item md={11}>
            <Typography>Created by<Link href='https://www.linkedin.com/in/anele-shamase-133a73228/' variant="button"><br/>Anele Shamase</Link><br/></Typography>
            <Typography>from South Africa</Typography>
          </Grid>
        </Grid><br/>
        <Divider/>
      </div>
      {/*About Trip Section*/}
      <div className={classes.container} style={{paddingTop: 10}}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant='h6' style={{fontSize: 18 }}>From R5,000/night</Typography>
            <Button size="small" variant="outlined" className="book" href='#'>Book Now</Button>
          </Grid>
          <Grid item xs={12} md={6}>
          <Typography variant='h6'>Trip Length</Typography>
          <Typography style={{color: 'gray', fontWeight: 'bold'}}>7 days</Typography>
          <Typography variant='h6'>Hotel Name</Typography>
          <Typography id='hotelName' style={{color: 'gray', fontWeight: 'bold'}}></Typography>
          
          </Grid>
        </Grid><br/>
        <Divider /> 
      </div>
      {/*Info about Hotel Section*/}
      <div className={classes.container} style={{paddingTop: 10}}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={7}>
            <Typography variant='h6' id='hotelName2'></Typography>
            <Rating name="half-rating-read" defaultValue={4.5} precision={0.5} readOnly size="small"/>
            <Typography id='descriptionOne' style={{color: 'gray'}}></Typography><br/>
            <Typography id='descriptionTwo' style={{color: 'gray'}}></Typography>
          </Grid>
          <Grid item xs={12} md={5}>
            <img id= 'hotelImage' alt="hotel logo" style={{width: 400, height: 400}}/>
          </Grid>
        </Grid>
        <Stack style={{paddingTop: 15, paddingBottom: 15}} direction="row" spacing={1}>
          <Typography style={{fontSize: 17, color: 'green' }}>Activities:</Typography>
            <Chip label="Free Breakfast and Dinner" variant="outlined" />
            <Chip label="Massage" variant="outlined" />
            <Chip label="Free WiFi" variant="outlined" />
        </Stack >
        <Divider />
      </div>

      {/*Map Info Section*/}
      <div className={classes.container} style={{paddingTop:15, paddingBottom:50}}>
       
        <Typography variant='h6' style={{fontSize: 16, textAlign: 'left' }}>Where you'll be</Typography><br/>
        <div style={{display:'flex'}}>
          <LocationOnIcon sx={{ fontSize: 20 }}/>
          <Typography id = 'hotelName3' style={{fontSize: 14, color:'darkblue'}}> </Typography>  
          <Typography style={{ marginLeft: '1.5rem' }}></Typography>
          <Typography id = 'hotelAddress' style={{fontSize: 14, color:'darkblue'}}> </Typography>  
          <Typography style={{ marginLeft: '1.5rem' }}></Typography> 
          <Typography id = 'cityName' style={{fontSize: 14, color:'darkblue'}}> </Typography>
          <Typography style={{ marginLeft: '1.5rem' }}></Typography> 
          <Typography id = 'countryName' style={{fontSize: 14, color:'darkblue'}}> </Typography>
       </div><br/>
       <div style={{ height: '40vh', width: '100%'}}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyD2MXWQSCAi5x9yLat7Ta7rlFPmT7XwIAo' }}
          defaultCenter={center}
          defaultZoom={zoom} >
          <RoomIcon sx={{ color: 'red', fontSize: 40  }}/>
        </GoogleMapReact>
       </div>
      </div>
    </>
  );
}

export default App;

