import Dropdown from 'react-bootstrap/Dropdown';
import { useEffect, useState } from 'react'
import { PacmanLoader } from 'react-spinners'
import SiteNavbar from '../components/Navbar';
import Row from 'react-bootstrap/Row'


const getSystemListURL = "https://retroachievements.org/API/API_GetConsoleIDs.php";
const cardRows = 6;
const cardCols = 3;

function Home() {
    const [_error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [systems, setSystems] = useState([]);
    const [currentSystem, setCurrentSystem] = useState(null);
    const [systemNavList, setSystemNavList] = useState(<></>);
    const [gameCards, setGameCards] = useState(<></>);
    const [page, setPage] = useState(1);

    useEffect(() => {
        console.log('useEffect Home, get systems');
        fetch(`${getSystemListURL}?y=${import.meta.env.VITE_RA_KEY}&a=1&g=1`)
            .then(response => response.json())
            .then(
                data => {
                    console.log(data);
                    setLoading(false);
                    setSystems(data);
                    setSystemNavList(data.map((system) =>
                        <Dropdown.Item onClick={() => selectSystem(system)}>
                            <img
                                src={system.IconURL}
                                className='me-2' />
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

    const selectSystem = (system) => {
        console.log(system);
        setCurrentSystem(system);
    }

    return (<div>
        <SiteNavbar />
        <PacmanLoader color="red" loading={loading} />

        {!loading && <div className="mt-5">
            <Dropdown drop={"end"} >
                <Dropdown.Toggle variant="Secondary" id="dropdown-basic">
                    {currentSystem ? currentSystem.Name : "Select System"}
                </Dropdown.Toggle>

                <Dropdown.Menu
                    style={{ overflowY: "scroll", maxHeight: 300 }}
                >
                    {systemNavList}
                </Dropdown.Menu>
            </Dropdown>

            <Row xs={3} md={6} className='g-4'>
                {gameCards}
            </Row>
        </div>}
    </div>)
}

export default Home