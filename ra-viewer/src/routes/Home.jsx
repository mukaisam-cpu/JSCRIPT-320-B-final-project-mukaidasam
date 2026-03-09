import Dropdown from 'react-bootstrap/Dropdown';
import { useEffect, useState } from 'react'
import { PacmanLoader } from 'react-spinners'
import SiteNavbar from '../components/Navbar';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import GameCard from '../components/GameCard';
import PaginationBar from '../components/PaginationBar';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import SearchBar from '../components/SearchBar';

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
    const [displayGames, setDisplayGames] = useState([]);
    const [gameCards, setGameCards] = useState(<></>);
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [paginationbar, setPaginationBar] = useState(<></>)
    const [filter, setFilter] = useState("");

    // Initial call for systems list
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

    // Update games when changing page
    useEffect(() => {
        const offsetStart = cardsPerPage * (currentPage - 1);
        const offsetEnd = cardsPerPage * currentPage;
        console.log(games);

        const paginatedGames = games.slice(offsetStart, offsetEnd);
        console.log(paginatedGames);
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

        // Update pagination bar
        setPaginationBar(
            <PaginationBar
                currentPage={currentPage}
                pageCount={pageCount}
                setPage={setPage}
            />
        )
    }, [games, currentPage])

    // Filter game list
    useEffect(() => {
        console.log("useEffect filter");
        console.log(filter);

        if (filter !== "") {
            const filteredList = games.filter((game) => game.Title.toLowerCase().includes(filter.toLowerCase()));
            console.log(filteredList);
            populateGames(filteredList);
        }
    }, [games, filter])

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
                populateGames(data);
            })
    }

    const populateGames = (gameList) => {
        // Display page 1
        setDisplayGames(gameList);
        const paginatedGames = gameList.slice(0, cardsPerPage);
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
        const pageCount = Math.ceil(gameList.length / cardsPerPage)
        setPageCount(pageCount);

        // Update pagination bar
        setPaginationBar(
            <PaginationBar
                currentPage={1}
                pageCount={pageCount}
                setPage={setPage}
            />
        )
    }

    const setPage = (page) => {
        console.log(`Set page: ${page}`)

        setCurrentPage(page);
    }

    return (<div>
        <SiteNavbar />
        <Container>
            <PacmanLoader color="red" loading={loadingSystems} className="mt-5" />
            {!loadingSystems && <div className="mt-5">
                <Row>
                    <Col>
                        <Dropdown drop={"bottom"} >
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
                    </Col>
                    <Col xs="10">
                        <SearchBar setFilter={setFilter}/>
                    </Col>
                </Row>
                <PacmanLoader color="red" loading={loadingGames} className="mt-3" />
                <Row xs={1} lg={cardCols} className='g-4'>
                    {gameCards}
                </Row>
                {displayGames.length > 0 &&
                    <Row className="mt-3">
                        {paginationbar}
                    </Row>
                }
            </div>}
        </Container>
    </div>)
}

export default Home