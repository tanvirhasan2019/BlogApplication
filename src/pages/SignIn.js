import React , { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import {signin} from '../actions/auth';
import { useDispatch } from 'react-redux'
import SimpleBackdrop from '../components/SimpleBackdrop';



const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();
  let history = useHistory();
  const dispatch = useDispatch();
  const [data, setData] = useState({ password : '', email:''})
  const [backdrop, setBackDrop] = useState(false)

  const handleRegister = () =>{
    console.log('Handle regiter called')
    history.push('/registration')
  }

  const StyledButton = styled.div`
    cursor: pointer;
`;

  const handleSubmit = (e)=>{
      e.preventDefault();
      setBackDrop(true)
      dispatch(signin(data , history));
      
  }

  const handleChange = (e)=>{
    setData({ ...data, [e.target.name]: e.target.value });
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline /> {backdrop ? <SimpleBackdrop /> : null }
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit} style={{marginBottom:'30px'}}>
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
            onChange={handleChange}
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
            onChange={handleChange}
          />

          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}     
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <StyledButton>
              <Link onClick={handleRegister}  variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
              </StyledButton>
            </Grid>
          </Grid>
        </form>
      </div>
      
    </Container>
  );
}