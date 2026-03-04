import Dropdown from 'react-bootstrap/Dropdown';
import { useEffect, useState } from 'react'
import { PacmanLoader } from 'react-spinners'
import SiteNavbar from '../components/Navbar';
import Row from 'react-bootstrap/Row'
import GameCard from '../components/GameCard';
import Pagination from 'react-bootstrap/Pagination'


const getSystemListURL = "https://retroachievements.org/API/API_GetConsoleIDs.php";
const getGamesURL = "https://retroachievements.org/API/API_GetGameList.php";
const apiKey = import.meta.env.VITE_RA_KEY;
const cardRows = 10;
const cardCols = 2;
const cardsPerPage = cardRows * cardCols;

function Home() {
    const [_error, setError] = useState(false);
    const [loadingSystems, setLoadingSystems] = useState(true);
    const [loadingGames, setLoadingGames] = useState(false);
    const [systems, setSystems] = useState([]);
    const [currentSystem, setCurrentSystem] = useState(null);
    const [systemNavList, setSystemNavList] = useState(<></>);
    const [games, setGames] = useState([]);
    const [gameCards, setGameCards] = useState(<></>);
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        console.log('useEffect Home, get systems');
        fetch(`${getSystemListURL}?y=${apiKey}&a=1&g=1`)
            .then(response => response.json())
            .then(
                // Populate systems dropdown
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

    /**
     * Select system from dropdown, display first page of games, and prepare pagination
     * @param {Object} system Object containing system data, retrieved from RA api call
     */
    const selectSystem = (system) => {
        console.log(system);
        setCurrentSystem(system);

        setLoadingGames(true);
        fetch(`${getGamesURL}?&y=${apiKey}&i=${system.ID}&f=1`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setLoadingGames(false);
                setGames(data);

                // Display page 1
                const paginatedGames = data.slice(0, cardsPerPage);
                setGameCards(paginatedGames.map((game, index) =>
                    <GameCard
                        index={index}
                        id={game.ID}
                        title={game.Title}
                        image={game.ImageIcon}
                        numAchievements={game.NumAchievements}
                        points={game.Points}
                    />
                ));
                setCurrentPage(1);

                // Calculate page count
                setPageCount(Math.ceil(data.length / cardsPerPage));
            })
    }

    const setPage = (page) => {
        const offsetStart = cardsPerPage * (page - 1);
        const offsetEnd = cardsPerPage * page;

        const paginatedGames = data.slice(offsetStart, offsetEnd);
        setGameCards(paginatedGames.map((game, index) =>
            <GameCard
                index={index}
                id={game.ID}
                title={game.Title}
                image={game.ImageIcon}
                numAchievements={game.NumAchievements}
                points={game.Points}
            />
        ));
        setCurrentPage(page);
    }

    const nextPage = () => {

    }

    const prevPage = () => {

    }

    return (<div>
        <SiteNavbar />
        <PacmanLoader color="red" loading={loadingSystems} className="mt-5" />

        {!loadingSystems && <div className="mt-5">
            <Row>
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
            </Row>


            <PacmanLoader color="red" loading={loadingGames} className="mt-3" />

            <Row xs={1} lg={cardCols} className='g-4'>
                {gameCards}
            </Row>

            {games.length > 0 &&
                <Row className="mt-5">
                    <Pagination>
                        <Pagination.First />
                        <Pagination.Prev />
                        <Pagination.Item>{1}</Pagination.Item>
                        <Pagination.Ellipsis />

                        <Pagination.Item>{currentPage - 2}</Pagination.Item>
                        <Pagination.Item>{currentPage - 1}</Pagination.Item>
                        <Pagination.Item active>{currentPage}</Pagination.Item>
                        <Pagination.Item>{currentPage + 1}</Pagination.Item>
                        <Pagination.Item>{currentPage + 2}</Pagination.Item>

                        <Pagination.Ellipsis />
                        <Pagination.Item>{pageCount}</Pagination.Item>
                        <Pagination.Next />
                        <Pagination.Last />
                    </Pagination>
                </Row>
            }



        </div>}

    </div>)
}

export default Home