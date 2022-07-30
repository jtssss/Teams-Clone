import React from 'react';
import {Link} from 'react-router-dom';
import firebase from '../../Services/firebase';
import LoginString from './LoginStrings';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';


export default class Login extends React.Component{

    constructor(props){
        super(props);
        this.state ={
            isLoading : true,
            email: "",
            password: ""
        }
    this.handleChange =this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleChange(event) {
        this.setState({
          [event.target.name]: event.target.value
        });
      }
    componentDidMount(){
        if(localStorage.getItem(LoginString.ID)){
            this.setState({isLoading: false}, ()=>{
                this.setState({isLoading: false})
                this.props.showToast(1, 'Login succes')
                this.props.history.push('/chat')
            })
        }else{
            this.setState({isLoading: false})
        }
    }

    async handleSubmit(event){
        event.preventDefault();

        await firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(async result =>{
            let user = result.user;
            if(user){
                await firebase.firestore().collection('users')
                .where('id' , "==", user.uid)
                .get()
                .then(function(querySnapshot){
                    querySnapshot.forEach(function(doc){
                        const currentdata = doc.data();
                        localStorage.setItem(LoginString.FirebaseDocumentId, doc.id);
                        localStorage.setItem(LoginString.ID, currentdata.id);
                        localStorage.setItem(LoginString.Name, currentdata.name)
                        localStorage.setItem(LoginString.Email, currentdata.email)
                        localStorage.setItem(LoginString.Password, currentdata.password)
                        localStorage.setItem(LoginString.PhotoURL, currentdata.URL)
                        localStorage.setItem(LoginString.Description, currentdata.description)

                    })
                })
            }
            this.props.history.push('/chat')
        }).catch(function(error){
            document.getElementById('1').innerHTML="incorrect email/password or poor internet"
        })
    }

    render() {
        const paper= {
              marginTop: '8px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }
        const avatar1= {
              marginTop: '32px',
              backgroundColor: '#9BD3F2'
            }
        const avatar2= {
              marginTop: '32px',
              backgroundColor: '#eb427e'
            }
        const form= {
              width: '100%',
              marginTop: '4px'
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
                  <Link to="/" variant="body2">
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
                  Log in
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
                    onChange={this.handleChange}
                    value={this.state.email}
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={this.handleChange}
                    value={this.state.password}
                  />
                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                  />
                  <Typography component="h6" variant="h5">
                            {this.state.error ?(
                                <p className="text-danger">{this.state.error}</p>
                            ):null}
                  </Typography>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    style={submit}
                  >
                    Sign In
                  </Button>
                  <Grid container>
                    <Grid item>
                      <Link to="/signup" variant="body2">
                        {"Don't have an account? Sign Up"}
                      </Link>
                    </Grid>
                  </Grid>
                  <div>
                            <p id='1' style={error}></p>
                  </div>
                </form>
              </div>
              <Box mt={8}>
              </Box>
            </Container>
          );
    }
}