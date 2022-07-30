import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import firebase from '../../Services/firebase';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import LoginString from '../login/LoginStrings';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';


export default class SignUp extends Component{

    constructor(){
        super();
        this.state = {
            email:"",
            password:"",
            name:"",
            error:null
        }
        this.handlechange = this.handlechange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handlechange(event){
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    async handleSubmit(event){

        const {name,password,email}=this.state;
        event.preventDefault();
        this.setState({error:""})
        try{
            firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(async result =>{
                firebase.firestore().collection('users')
                .add({
                    name,
                    id: result.user.uid,
                    email,
                    password,
                    URL:'',
                    description:'',
                    messages:[{notificationId:"",number: 0}]
                }).then((docRef)=>{
                    localStorage.setItem(LoginString.ID, result.user.uid);
                    localStorage.setItem(LoginString.Name, name);
                    localStorage.setItem(LoginString.Email, email);
                    localStorage.setItem(LoginString.Password, password);
                    localStorage.setItem(LoginString.PhotoURL, "");
                    localStorage.setItem(LoginString.UPLOAD_CHANGED, 'state_changed');
                    localStorage.setItem(LoginString.Description, "");
                    localStorage.setItem(LoginString.FirebaseDocumentId, docRef.id );
                    localStorage.setItem(LoginString.Description, "")
                    this.setState({
                        name:'',
                        password:'',
                        url:'',
                    });
                    this.props.history.push("/chat");
                })
               .catch((error) =>{
                   console.error("Error adding document", error)
               })  
         
            })
        }
        catch(error){
            document.getElementById('1').innerHTML = "Error in signing up please try again"
        }

    }
    render(){
        const paper= {
            marginTop: '8px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }
          const avatar1= {
            marginTop: '32px',
            backgroundColor: '#9BD3F2',
            textDecoration: 'none'
          }
        const avatar2= {
            marginTop: '32px',
            backgroundColor: '#eb427e'
          }
        const form= {
            width: '100%',
            marginTop: '12px'
          }
        const error= {
          display: 'flex',
          color:'red'
        }
        const submit= {
            margin: '12px 0px 8px'
          }

          return (
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <div style={paper}>
                <Avatar style={avatar1}>
                    <Link to="/">
                        <HomeOutlinedIcon />
                    </Link>
                </Avatar>
                <Typography component="h1" variant="h5">
                  Home
                </Typography>
                <Avatar style={avatar2}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign up
                </Typography>
                <form style={form} noValidate onSubmit={this.handleSubmit}>
                  <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  onChange={this.handlechange}
                  value={this.state.email}
                  />
                  <TextField
                   variant="outlined"
                   margin="normal"
                   required
                   fullWidth
                   id="password"
                   label="Password"
                   name="password"
                   type="password"
                   autoComplete="current-password"
                   onChange={this.handlechange}
                   value={this.state.password}
                   />
                   <TextField
                   variant="outlined"
                   margin="normal"
                   required
                   fullWidth
                   id="name"
                   label="Your Name"
                   name="name"
                   autoComplete="name"
                   onChange={this.handlechange}
                   value={this.state.name}
                   />
                  
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    style={submit}
                  >
                    Sign Up
                  </Button>
        
                  <Grid container>
                    <Grid item>
                      <Link to="/login" variant="body2">
                        Already have an account? Log in
                      </Link>
                    </Grid>
                  </Grid>
        
                  <div>
                        <p id='1' style={error}></p>
                  </div>
                </form>
              </div>
              <Box mt={5}>
              </Box>
            </Container>
          );
    }
}