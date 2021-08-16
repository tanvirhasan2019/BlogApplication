import React from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import { useHistory } from 'react-router-dom';


export const Error = (props) => {
    const history = useHistory();

    return (
        <div className="container">
        
            <Paper elevation={3} style={{margin:'20px'}}>
                <div className="row d-flex justify-content-center">
                    <div className="title" style={{margin:'20px'}}>
                        {props.title}
                    </div>
                </div>

                <div className="row d-flex justify-content-center">
                    <div className="erro-icon" style={{margin:'20px'}}>
                        <img src={props.image } className="img-fluid" alt="empty"></img>
                    </div>
                </div>

                <div className="row">
                    <div style={{margin:'20px 0px'}} className="col-md-6 d-flex justify-content-center">
                       <Button onClick={()=> history.push("/")} style={{width:'60%'}} variant="contained">
                           Back &nbsp; <KeyboardBackspaceIcon fontSize="small" />
                        </Button>
                    </div>
                    <div style={{margin:'20px 0px'}}  className="col-md-6 d-flex justify-content-center">
                        <Button onClick={()=> history.push("/login")} style={{width:'60%'}} variant="contained" color="primary">
                            login &nbsp; <LockOpenIcon fontSize="small"/>
                        </Button>
                    </div>
                </div>
            </Paper>

        </div>
    )
}
