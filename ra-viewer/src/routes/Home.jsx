import Dropdown from 'react-bootstrap/Dropdown';
import { useEffect, useState } from 'react'
import { PacmanLoader } from 'react-spinners'

const getSystemListURL = "https://retroachievements.org/API/API_GetConsoleIDs.php"

function Home() {
    const [_error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [systems, setSystems] = useState([]);
    const [gameCards, setGameCards] = useState(<></>);

    useEffect(() => {
        console.log('useEffect Home, get systems');
        fetch(`${getSystemListURL}?y=${import.meta.env.VITE_RA_KEY}&a=1&g=1`)
            .then(response => response.json())
            .then(
                data => {
                    console.log(data);
                    setLoading(false);
                    setSystems(data);
                },
                error => {
                    console.log(error)
                    setError(true);
                    setLoading(false);
                }
            )
    }, []) // Rate limiting array

    return (<div>
        <PacmanLoader color="red" loading={loading} />

        {!loading && <Dropdown>
            <Dropdown.Toggle variant="Secondary" id="dropdown-basic">
                Select System
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">
                    <img src="https://static.retroachievements.org/assets/images/system/md.png" />
                    Action
                    </Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>}

    </div>)
}

export default Home