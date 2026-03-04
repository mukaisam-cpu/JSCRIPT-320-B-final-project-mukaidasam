import Pagination from 'react-bootstrap/Pagination'

function PaginationBar({ currentPage, pageCount, setPage}) {
    return (
        <Pagination className="justify-content-center">
            {currentPage > 1 ? <Pagination.First onClick={() => setPage(1)}/> 
            : <Pagination.First disabled />}
            {currentPage > 1 ? <Pagination.Prev onClick={() => setPage(currentPage - 1)}/> 
            : <Pagination.Prev disabled />}
            {currentPage > 1 && <Pagination.Item>{1}</Pagination.Item>}
            {currentPage > 3 && <Pagination.Ellipsis />}


            {currentPage > 3 && <Pagination.Item onClick={() => setPage(currentPage - 2)}>{currentPage - 2}</Pagination.Item>}
            {currentPage > 2 && <Pagination.Item onClick={() => setPage(currentPage - 1)}>{currentPage - 1}</Pagination.Item>}
            <Pagination.Item active>{currentPage}</Pagination.Item>
            {currentPage < pageCount - 1 && <Pagination.Item onClick={() => setPage(currentPage + 1)}>{currentPage + 1}</Pagination.Item>}
            {currentPage < pageCount - 2 && <Pagination.Item onClick={() => setPage(currentPage + 2)}>{currentPage + 2}</Pagination.Item>}
            
            {currentPage < pageCount - 3  && <Pagination.Ellipsis />}
            <Pagination.Item onClick={() => setPage(pageCount)}>{pageCount}</Pagination.Item>
            {currentPage < pageCount ? <Pagination.Next onClick={() => setPage(currentPage + 1)}/>
            : <Pagination.Next disabled/>}
            {currentPage < pageCount ? <Pagination.Last onClick={() => setPage(pageCount)}/>
            : <Pagination.Last />}    
        </Pagination>
    )
}

export default PaginationBar