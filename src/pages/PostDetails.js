import React , {useState , useEffect , useRef } from 'react'
import Paper from '@material-ui/core/Paper';
import { useParams } from "react-router-dom";
import './PostDetails.css';
import Bounch from '../components/spinner/Bounch';
import Chip from '@material-ui/core/Chip';
import Moment from 'react-moment';
import Tooltip from '@material-ui/core/Tooltip';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import { Button } from '@material-ui/core/';
import { CommentOutlined } from '@ant-design/icons';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import { Single_Postlike , deletePost } from '../actions/post';
import { useDispatch , useSelector} from 'react-redux';
import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import { Button as ButtonP } from 'primereact/button';
import { useHistory } from 'react-router-dom';
import CommentBox from '../components/CommentBox';
import { Toast } from 'primereact/toast';
import {getPost} from '../actions/post';
import RecommendedPost from './RecommendedPost';

export default function PostDetails() {

    const toast = useRef(null);
    const toastBC = useRef(null);
    const history = useHistory();
    const [showComment, setShowComment] = useState(false)
    const [initialloading, setInitialLoading] = useState(true)

    
    const dispatch = useDispatch()
    const { id } = useParams();

    useEffect(() => {
    
      dispatch(getPost(id))
      setInitialLoading(false)

   }, [dispatch , id]);

   
  

    const {isLoading , post} = useSelector((state) => state.post ? state.post : null)  

    console.log('post details ', post)

    const user = JSON.parse(localStorage.getItem('profile'));
    
    var userid;
    if(user){
        userid = user.result._id
    }



    const handleClickLike = async (id) => {
       
        try{
          if(user){
            await switchClickLike(dispatch, id)
            toast.current.show({severity:'success', summary: 'Likes', detail:'Likes added in the post', life: 1000});
          }else{
            toast.current.show({severity:'error', summary: 'Ivalid login', detail:'Please login first', life: 3000});
          }  
        }catch(e){
          toast.current.show({severity:'error', summary: 'Ivalid', detail:'Something went wrong', life: 3000});
        }
      }


      const Likes = () => {
        if (!initialloading && !isLoading) {
          return post.likes.find((like) => like === userid)
            ? (
              <><ThumbUpAltIcon  fontSize='default' />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}` }</>
            ) : (
              <><ThumbUpAltOutlinedIcon  fontSize='default' />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
            );
        }
    
        return <><ThumbUpAltOutlinedIcon  fontSize='default' />&nbsp;Like</>;
      };
    
      const switchClickLike = async (dispatch, id) => {
          await dispatch(Single_Postlike(id))
      }


    const handleDeletePostDispatch = (id) => {
        dispatch(deletePost(id))
        toastBC.current.clear();
        toast.current.show({severity:'warn', summary: 'Post delete', detail:'Your Post successFully deleted', life: 3000});
        history.push('/')
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
   
 



    return (
        <div className="container-fluid">
            {
              !initialloading && !isLoading ? 
                 
              <Paper style={{margin:'30px'}} variant="outlined" square >   
                <Toast ref={toast} />   
                <Toast ref={toastBC} position="bottom-center" />
                 {
                   userid ? 
                   <div className="postDetails-update-icon-post">
                    <Tooltip title="Update Post" arrow>
                        <DragIndicatorIcon onClick={()=> history.push(`/post/update-post/${id}`)}  /> 
                    </Tooltip> 
                   </div> : null
                 }
                
                <div className="row post-creator d-flex justify-content-center">
                    {post.title}
                  
                </div>
                <div className="row post-date d-flex justify-content-center">
                   Posted &nbsp; <Moment fromNow>{post.createdAt}</Moment>
                </div>

                <div className="row post-tags d-flex justify-content-center">
                        {
                            post.tags.map((item2, index)=>                           
                              <span  style={{margin:'10px'}} key={index}>
                                &nbsp;
                               <Chip
                                className="chip-shadow z-depth-5"
                                label={`${item2}`}
                                color="secondary"
                              />
                              </span>                                                     
                            )
                         }
                </div>

                <div className="row post-image d-flex justify-content-center">
                   <img src={post.selectedFile} className="img-fluid" alt="empty"/>
                </div>

                <div className="row post-desc d-flex justify-content-center">
                    <p className="post-desc-text">  
                      {post.message}
                    </p>
                </div>

                <div className="row post-like-comments d-flex justify-content-around">
                     <div>
                        <Button size="small"  onClick={()=>handleClickLike(post._id)} >
                            <Likes />
                        </Button>
                        
                      </div>   

                      <div>
                      <CommentOutlined onClick={()=>setShowComment(!showComment)} style={{fontSize:'24px'}}  />
                       </div>   

                       {
                           userid === post.creator ? 
                          <div className="row memories-card-icon">
                            <DeleteIcon style={{color:''}} onClick={()=> handleDeletePost(post._id)} />
                          </div>
                           : null
                       }   

                       
                </div>

                <div className="row d-flex justify-content-center">
                            {
                                showComment && !isLoading ? 
                                <div className="row" style={{width:'80%'}}>
                                    <CommentBox 
                                      key={post._id} 
                                      postId={post._id}  
                                      user={userid} 
                                      data={post.comment}
                                     
                                    />
                                </div> : null
                            }  
                       </div>

              </Paper>
                :
                <Bounch />
                
            }
            

            <div className="row">
            <Paper style={{margin:'30px', width:'100%'}} variant="outlined" square >   
              {
                !initialloading && !isLoading && post ?
                <RecommendedPost tags={post.tags} id={id}/> : null
              }
              </Paper>
            </div>
        </div>
    )
}
