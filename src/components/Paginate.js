import React from 'react';
import { useSelector } from 'react-redux';
import { Pagination, PaginationItem } from '@material-ui/lab';
import { Link , useLocation} from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Paginate = () => {

  const { numberOfPages , isLoading } = useSelector((state) => state.post);
  const query = useQuery();
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery') || '';
  
  return (
          <div>
          {
            !isLoading ? 

            <Pagination  
                count={numberOfPages} 
                size="large" 
                color="primary" 
                page={Number(page) || 1}
                style={{margin:'20px'}}
                renderItem={(item) => (
                    <PaginationItem {...item} 
                    component={Link} to={`/posts/search?searchQuery=${searchQuery}&page=${item.page}`} />
                  )} /> : null
                   
          }
          </div>
            
        )}
export default Paginate;
