import React, {useEffect, useState} from 'react'
import {FetchRecommendPost} from '../api/index'
import { Alert, AlertTitle } from '@material-ui/lab';
import LoaderRise from '../components/spinner/LoaderRise';
import { useHistory } from 'react-router-dom';



export default function RecommendedPost(props) {

   
    const history = useHistory();

    const [loading, setloading] = useState(true)
    const [posts, setPosts] = useState([])

    const handlepostclick = (id) =>{
      history.push(`/post/details/${id}`)
    }


    useEffect(() => {
        async function fetchrecommendedPost() {
          let response = await FetchRecommendPost(props.tags, props.id);
        
          setPosts(response.data.data)
          setloading(false)
        }
    
        fetchrecommendedPost()

      }, [props.tags])

    const Showposts = () =>{
     
      if(!loading && posts.length === 0){
          return  <Alert severity="warning">
                   <AlertTitle>Opps!!</AlertTitle>
                      Sorry , We Found nothing <strong>recommended post !</strong>
                    </Alert>
      }else if(!loading && posts.length > 0){
          return <div className="row d-flex justify-content-center align-self-center"> 
                   {posts.map((item, index)=>
                     <div onClick={()=>handlepostclick(item._id)} style={{padding:'0px', margin:'5px'}} className="col-md-3" key={index}>
                       <div className="layered">
                        <img style={{width:'100%', height:'100%'}} src={item.selectedFile}  alt="Empty"  />
                        <div className="recommended-post-title">{item.title}</div>
                       </div>
                     </div>
                   )}
                 </div>
      }else{
          return <div style={{height:'200px'}} className="row d-flex justify-content-center align-self-center"> 
                     <div className="col d-flex justify-content-center align-self-center"><LoaderRise/></div> 
                  </div>
      }
    }

    return (
        <div>
            <Showposts />
        </div>
    )
}
