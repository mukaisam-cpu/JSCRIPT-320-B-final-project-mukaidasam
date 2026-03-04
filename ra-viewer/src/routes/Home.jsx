import Dropdown from 'react-bootstrap/Dropdown';
import { useEffect, useState } from 'react'
import { PacmanLoader } from 'react-spinners'
import SiteNavbar from '../components/Navbar';
import Row from 'react-bootstrap/Row'
import GameCard from '../components/GameCard';


const getSystemListURL = "https://retroachievements.org/API/API_GetConsoleIDs.php";
const getGamesURL = "https://retroachievements.org/API/API_GetGameList.php";
const apiKey = import.meta.env.VITE_RA_KEY;
const cardRows = 2;
const cardCols = 3;

function Home() {
    const [_error, setError] = useState(false);
    const [loadingSystems, setLoadingSystems] = useState(true);
    const [loadingGames, setLoadingGames] = useState(false);
    const [systems, setSystems] = useState([]);
    const [currentSystem, setCurrentSystem] = useState(null);
    const [systemNavList, setSystemNavList] = useState(<></>);
    const [games, setGames] = useState([]);
    const [gameCards, setGameCards] = useState(<></>);
    const [page, setPage] = useState(1);

    useEffect(() => {
        console.log('useEffect Home, get systems');
        fetch(`${getSystemListURL}?y=${apiKey}&a=1&g=1`)
            .then(response => response.json())
            .then(
                data => {
                    console.log(data);
                    setLoadingSystems(false);
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
                    setLoadingSystems(false);
                }
            )
    }, []) // Rate limiting array

    const selectSystem = (system) => {
        console.log(system);
        setCurrentSystem(system);

        const cardsPerPage = cardRows * cardCols;
        const offsetStart = cardsPerPage * (page - 1);
        const offsetEnd = cardsPerPage * page;
        setLoadingGames(true);
        fetch(`${getGamesURL}?&y=${apiKey}&i=${system.ID}&f=1`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setLoadingGames(false);
                setGames(data);
                setGameCards(data.map((game, index) =>
                        <GameCard
                            index={index}
                            id={game.ID}
                            title={game.Title}
                            image={game.ImageIcon}
                            numAchievements={game.NumAchievements}
                            points={game.Points}
                        />
                    ));
            })
    }

    return (<div>
        <SiteNavbar />
        <PacmanLoader color="red" loading={loadingSystems} className="mt-5"/>

        {!loadingSystems && <div className="mt-5">
            <Dropdown drop={"end"} >
                <Dropdown.Toggle variant="Secondary" id="dropdown-basic">
                    {currentSystem && <img src={currentSystem.IconURL} className='me-2' />}
                    {currentSystem ? currentSystem.Name : "Select System"}
                </Dropdown.Toggle>

                <Dropdown.Menu
                    style={{ overflowY: "scroll", maxHeight: 300 }}
                >
                    {systemNavList}
                </Dropdown.Menu>
            </Dropdown>

            <PacmanLoader color="red" loading={loadingGames} className="mt-3" />

            <Row xs={cardCols} md={cardRows} className='g-4'>
                {gameCards}
            </Row>
        </div>}

    </div>)
}

export default Home