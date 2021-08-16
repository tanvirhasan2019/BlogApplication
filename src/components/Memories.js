import React , {useState} from 'react';
import { MemoriesCard } from './MemoriesCard'
import Puffloader from './spinner/Puffloader';
import {  useSelector } from 'react-redux';

export const Memories = () => {    
    const {isLoading , posts} = useSelector((state) => state.post)  
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    var id=''
    if(user){
        id = user.result._id
    }
  
    return (
        <div>
           {
                isLoading ? 
                <Puffloader /> :                
                posts.map((item , index)=>
                    <MemoriesCard data={item} key={index} user_id={id}  />               
                )            
           } 
        </div>
    )
}
