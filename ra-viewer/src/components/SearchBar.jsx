import Form from 'react-bootstrap/Form'

function SearchBar({ setFilter }) {
    return (
        <Form>
            <Form.Group controlId='searchForm.search'>
                <Form.Control placeholder='Search games...' onChange={e => {
                    setFilter(e.target.value);
                }} />
            </Form.Group>
        </Form>
    )
}

export default SearchBar