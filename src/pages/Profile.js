import React, { useEffect , useState } from 'react'
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import CreateIcon from '@material-ui/icons/Create';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import {getUser , updateUser} from '../api/index';
import { useParams } from 'react-router-dom';
import FileBase from 'react-file-base64';
import Bounch from '../components/spinner/Bounch';


export const Profile = () => {

    const [edit, setedit] = React.useState(false);
    const {id} = useParams();
    const [loading, setloading] = useState(true);
    const [data, setdata] = useState({avatar:' ', name:'', email:''})

    console.log('state data  ', data);

    const handledit = () =>{
        setedit(!edit)
    } 

    const handlesubmit = async () => {
        console.log('handlesubmit data ', {data})
        const response = await updateUser(id, data)
        console.log('After submit respons is ', response)
    }

    useEffect(() => {

        console.log('useEffect id ', id)
        async function fetchUser() {
          let response = await getUser(id)
          console.log('name ', response.data.data.name)
          setdata({name : response.data.data.name,  email : response.data.data.email , avatar : response.data.data.avatar})
          setloading(false)
          console.log('user response data ', response);
         
        }
    
        fetchUser()
      }, [id])

    return (
        <div style={{padding:'20px'}} className="container">
                {
                    loading ? <Bounch/>
                    :

                    <Paper style={{backgroundColor: '##FFFFF0'}} variant="outlined" square>   
                        
                <div style={{marginTop:'30px'}} className="row">
                    <div className="col d-flex justify-content-center">
                        <Avatar  style={{width:'200px', height : '200px', boxShadow:'rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px'}} 
                        alt="Remy Sharp" src={data.avatar} />
                        <div style={{ position:'absolute', bottom:'2px'}}>
                            {
                                edit ? <Tooltip title="Upload avatar"> 
                                           
                                            <FileBase  style={{color:'#3f51b5' , cursor :'pointer'}} type="file" multiple={false} 
                                                onDone={({ base64 }) => setdata({ ...data, avatar: base64 })} 
                                            />
                                    </Tooltip> : null
                            }                       
                        </div>
                    </div>

                    <div style={{marginRight:'10px', color:'#3f51b5'}}>
                        {
                            !edit ? <Tooltip title="Edit Profile"><CreateOutlinedIcon onClick={handledit} fontSize="large" style={{cursor:'pointer'}} /></Tooltip>
                                : <CreateIcon onClick={handledit} fontSize="large" style={{cursor:'pointer'}} />
                        }                      
                    </div>
                </div>

                <div style={{marginTop:'30px'}} className="row d-flex justify-content-between">
                    <div style={{margin:'10px 20px'}} className="col-md-5">
                            <TextField
                                autoComplete="fname"
                                name="name"
                                variant="outlined"
                                required
                                fullWidth
                                value={data.name}
                                id="firstName"
                                label="Full Name"
                                autoFocus 
                                disabled={!edit}
                                onChange={(e)=> setdata({...data, name:e.target.value})}
                            
                        />
                        </div>

                        <div style={{margin:'10px 20px'}} className="col-md-5">
                            <TextField                          
                                autoComplete="fname"
                                name="firstName"
                                variant="outlined"
                                value={data.email}
                                required
                                fullWidth
                                id="firstName"
                                label="Email"
                                autoFocus
                                disabled={!edit}
                                onChange={(e)=> setdata({...data, email:e.target.value})}
                        />
                        </div>
                </div>

                
                {
                     edit ? <div style={{margin:'20px'}} className="row d-flex justify-content-center">
                                <div className="col">
                                    <Button onClick={handlesubmit} style={{width:'100%'}} variant="contained" color="primary">
                                        save
                                    </Button>
                                </div>                  
                             </div>
                             : null
                }
            </Paper>
                    
                }   
            
        </div>
    )
}

//<div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>
