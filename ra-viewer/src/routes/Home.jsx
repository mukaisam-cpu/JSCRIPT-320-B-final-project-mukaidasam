import Dropdown from 'react-bootstrap/Dropdown';
import { useEffect, useState } from 'react'
import { PacmanLoader } from 'react-spinners'
import SiteNavbar from '../components/Navbar';

const getSystemListURL = "https://retroachievements.org/API/API_GetConsoleIDs.php"

function Home() {
    const [_error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [systemNavList, setSystemNavList] = useState(<></>);
    const [gameCards, setGameCards] = useState(<></>);

    useEffect(() => {
        console.log('useEffect Home, get systems');
        fetch(`${getSystemListURL}?y=${import.meta.env.VITE_RA_KEY}&a=1&g=1`)
            .then(response => response.json())
            .then(
                data => {
                    console.log(data);
                    setLoading(false);
                    setSystemNavList(data.map((system) =>
                        <Dropdown.Item>
                            <img src={system.IconURL} />
                            {system.Name}
                        </Dropdown.Item>
                    ));
                },
                error => {
                    console.log(error)
                    setError(true);
                    setLoading(false);
                }
            )
    }, []) // Rate limiting array

    return (<div>
        <SiteNavbar />
        <PacmanLoader color="red" loading={loading} />

        {!loading && <Dropdown drop={"end"} className="mt-4">
            <Dropdown.Toggle variant="Secondary" id="dropdown-basic">
                Select System
            </Dropdown.Toggle>

            <Dropdown.Menu
                style={{overflowY:"scroll", maxHeight:300}}
                >
                {systemNavList}
            </Dropdown.Menu>
        </Dropdown>}

    </div>)
}

export default Home