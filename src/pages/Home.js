import React, { useEffect } from 'react'
import './home.css'
import {getPosts} from '../actions/post';
import {  useDispatch } from 'react-redux'
import {Memories} from '../components/Memories'
import { useLocation } from 'react-router-dom';
import Paginate from '../components/Paginate';

function useQuery() {
   return new URLSearchParams(useLocation().search);
}

export default function Home() {
  
    const dispatch = useDispatch();
    const query = useQuery();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery') || '';
  
    useEffect(() => {
      dispatch(getPosts(searchQuery, page))
    }, [dispatch , page, query]) 

    return (      
         <div className="container">
            <div className="row d-flex justify-content-center">
               <Memories />
            </div> 

            <div className="row d-flex justify-content-center">
               <Paginate />
            </div>
         </div>   
    )
}
