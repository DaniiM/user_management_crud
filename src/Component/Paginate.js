import React, { useState, useEffect } from 'react'
import ReactPaginate from "react-paginate";

const Paginate = (props) => {

    const [items, setItems] = useState([]);

    const [pageCount, setPageCount] = useState(0);

    let limit = 10;

    useEffect(() => {
        const getUsers = async () => {
            const res = await fetch(
                `http://localhost:3003/users?_page=1&_limit=${limit}`
            );
            const data = await res.json();
            let total = res.headers.get('x-total-count');
            setPageCount(total/limit);
            setItems(data);
        };

        getUsers();

    }, []);

    const fetchUsers = async (currentPage) => {
        const res = await fetch (
            `http://localhost:3003/users?_page=${currentPage}`
        );
        const data = await res.json();
        return data; 
    }

    const handlePageClick = async (data) => {

        let currentPage = data.selected + 1;

        const usersFromServer = await fetchUsers(currentPage);
    
        props.onSetItems(usersFromServer);
        // setItems(usersFromServer);
    }


  return (
    <div>
        <ReactPaginate 
            previousLabel={'previous'}
            nextLabel={'next'}
            pageCount={pageCount}
            marginPagesDisplayed = {'2'}
            onPageChange={handlePageClick}
            containerClassName={'pagination justify-content-center'}
            pageClassName={'page-item'}
            pageLinkClassName={'page-link'}
            previousClassName={'page-item'}
            nextClassName={'page-item'}
            previousLinkClassName={'page-link'}
            nextLinkClassName={'page-link'}
            activeClassName={'active'}
        />
    </div>
  )
}

export default Paginate
