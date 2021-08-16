import React, { useRef,  useState } from 'react';
import './MemoriesCard.css'
import Paper from '@material-ui/core/Paper';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import { Button } from '@material-ui/core/';
import Chip from '@material-ui/core/Chip';
import Moment from 'react-moment';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { CommentOutlined } from '@ant-design/icons';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import { likePost , deletePost } from '../actions/post';
import { useDispatch } from 'react-redux';
import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import { Button as ButtonP } from 'primereact/button';
import Tooltip from '@material-ui/core/Tooltip';

import { Toast } from 'primereact/toast';
import { useHistory } from 'react-router-dom';


 export const MemoriesCard = (props) => {

  const toast = useRef(null);
  const toastBC = useRef(null);
  const history = useHistory();

  const [txt, setTxt] = useState(false)
  
  const dispatch = useDispatch()

  

  const handleClickPost = (id) => {
    history.push(`/post/details/${id}`)
  }

  const Likes = () => {
    if (props.data.likes.length > 0) {
      return props.data.likes.find((like) => like === props.user_id)
        ? (
          <><ThumbUpAltIcon  fontSize='default' />&nbsp;{props.data.likes.length > 2 ? `You and ${props.data.likes.length - 1} others` : `${props.data.likes.length} like${props.data.likes.length > 1 ? 's' : ''}` }</>
        ) : (
          <><ThumbUpAltOutlinedIcon  fontSize='default' />&nbsp;{props.data.likes.length} {props.data.likes.length === 1 ? 'Like' : 'Likes'}</>
        );
    }

    return <><ThumbUpAltOutlinedIcon  fontSize='default' />&nbsp;Like</>;
  };

   const switchClickLike = async (dispatch, id) => {
      await dispatch(likePost(id))
  }

  const handleClickLike = async (id) => {
    try{
      if(props.user_id){
        await switchClickLike(dispatch, id)
        toast.current.show({severity:'success', summary: 'Likes', detail:'Likes added in the post', life: 1000});
      }else{
        toast.current.show({severity:'error', summary: 'Ivalid login', detail:'Please login first', life: 3000});
      }  
    }catch(e){
      toast.current.show({severity:'error', summary: 'Ivalid', detail:'Something went wrong', life: 3000});
    }
  }

  const handleDeletePost = (id) => {
  
   toastBC.current.show({ severity: 'warn', sticky: true, content: (
    <div className="p-flex p-flex-column" style={{flex: '1', textAlign:'center'}}>
        <div className="p-text-center">
            <i className="pi pi-exclamation-triangle" style={{fontSize: '3rem'}}></i>
            <h4>Are you sure?</h4>
            <p>Confirm to delete</p>
        </div>
        <div className="p-grid p-fluid">
            <div className="row d-flex justify-content-center">
              <div style={{width:'40%' , margin:'5px'}} className="p-col-6">
                  <ButtonP onClick={()=>handleDeletePostDispatch(id)} type="button" style={{backgroundColor:'#f50057'}} label="Yes" className="p-button-danger" />
              </div>
              <div style={{width:'40%', margin:'5px'}}  className="p-col-6">
                  <ButtonP onClick={()=> toastBC.current.clear()} type="button" label="No" className="p-button-secondary" />
              </div>
            </div>
            
        </div>
    </div>
) });


  }

  const handleDeletePostDispatch = (id) => {
        dispatch(deletePost(id))
        toastBC.current.clear();
        toast.current.show({severity:'warn', summary: 'Post delete', detail:'Your Post successFully deleted', life: 3000});
  }

    return (
        <Paper elevation={3} style={{margin:'20px', maxWidth:'700px'}}>   

            <Toast ref={toast} />   
            <Toast ref={toastBC} position="bottom-center" />

            <div className="card-main">
                <img  src={props.data.selectedFile}
                  className="img-fluid memories-image" style={{maxHeight:'300px', maxWidth:'700px'}} alt="empty" 
                  />
                    <p onClick={()=>handleClickPost(props.data._id)} className="memories-title">{props.data.title}</p>
                     <div className="memories-date">
                      <Moment  fromNow>{props.data.createdAt}</Moment>
                     </div>
                    {
                      props.user_id === props.data.creator ? 
                          <Tooltip title="Update Post" arrow>
                              <DragIndicatorIcon onClick={()=> history.push(`/post/update-post/${props.data._id}`)}  className="memories-card-menu-icon"/> 
                          </Tooltip> : null
                    }
                    
                      <div className="memories-card-hashtag">
                         {
                           props.data.tags.map((item2, index)=>                           
                              <span key={index}>
                                &nbsp;
                               <Chip
                                onClick={()=>handleClickPost(props.data._id)}
                                label={`${item2}`}
                                color="secondary"
                                className="chip-shadow z-depth-5"
                              />
                              </span>                                                     
                            )
                         }
                      </div>
                  
                    <p onClick={()=>handleClickPost(props.data._id)} className="memories-card-title">{props.data.title}</p>
                     {
                        props.data.message.length < 100 || txt ?  
                            <p className="memories-card-desc">{props.data.message}
                            </p> :
                             <p className="memories-card-desc">{props.data.message.slice(0, 100)}                
                                 <MoreHorizIcon style={{cursor:'pointer'}} onClick={()=>setTxt(!txt)}/> 
                             </p>           
                     }
                    <div className="row d-flex justify-content-around align-items-center">
                      <div className="row memories-card-icon">
                      <Button size="small"  disabled={props.user_id == null } onClick={()=>handleClickLike(props.data._id)} >
                           <Likes />
                      </Button>
                        
                        
                      </div>
                      <div className="row memories-card-icon">
                        <CommentOutlined onClick={()=>handleClickPost(props.data._id)} style={{fontSize:'24px'}}  />
                      </div>

                       {
                          props.user_id === props.data.creator ? 
                          <div className="row memories-card-icon">
                            <DeleteIcon style={{color:''}} onClick={()=> handleDeletePost(props.data._id)} />
                          </div>
                           : null
                       }   
                    </div>
                    
              </div>
        </Paper>
    )
}
