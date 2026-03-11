import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { Link, useParams } from "react-router-dom";
import { PacmanLoader } from "react-spinners";
import AchievementCard from "../components/AchievementCard";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import SiteNavbar from "../components/Navbar";

const mainURL = 'https://retroachievements.org';
const apiKey = import.meta.env.VITE_RA_KEY;
const getGameURL = `${mainURL}/API/API_GetGameExtended.php?y=${apiKey}`;
const getHashURL = `${mainURL}/API/API_GetGameHashes.php?y=${apiKey}`;
const defaultImage = `${mainURL}/Images/000001.png`;

function GameInfo() {
    const [_error, setError] = useState(false);
    const [_hashError, setHashError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [title, setTitle] = useState("");
    const [image, setImage] = useState(defaultImage);
    const [gamePageURL, setGamePageURL] = useState("");
    const [gameConsole, setGameConsole] = useState("");
    const [releaseDate, setReleaseDate] = useState("");
    const [developer, setDeveloper] = useState("");
    const [achievements, setAchievements] = useState({});
    const [achievementsHTML, setAchievementsHTML] = useState(<></>);
    const [hashCards, setHashCards] = useState(<></>);

    const { id } = useParams();

    useEffect(() => {
        fetch(`${getGameURL}&i=${id}`)
            .then(response => response.json())
            .then(
                data => {
                    // setLoading(false);
                    setTitle(data.Title);
                    setImage(`${mainURL}${data.ImageBoxArt}`);
                    setGamePageURL(`${mainURL}/game/${id}`);
                    setGameConsole(data.ConsoleName);
                    setReleaseDate(data.Released);
                    setDeveloper(data.Developer);
                    setAchievements(data.Achievements)
                    setAchievementsHTML(Object.keys(data.Achievements).map((id) =>
                        <AchievementCard
                            id={id}
                            name={data.Achievements[id].Title}
                            description={data.Achievements[id].Description}
                            points={data.Achievements[id].Points}
                            type={data.Achievements[id].type}
                            imageID={data.Achievements[id].BadgeName}
                        />
                    ))

                    return fetch(`${getHashURL}&i=${id}`);
                },
                error => {
                    console.log(error);
                    setError(true);
                    setLoading(false);
                }
            ).then(response => response.json())
            .then(
                data => {
                    setHashCards(data.Results.map((hash) =>
                        <Card bg="secondary" text="white">
                                <Card.Body>
                                    <Row>
                                        <Card.Text>{hash.Name} {hash.PatchUrl && <a href={hash.PatchUrl}>(Patch Link)</a>}</Card.Text>
                                    </Row>
                                    <Row>
                                        <Card.Text>Hash: {hash.MD5}</Card.Text>
                                    </Row>
                                </Card.Body>
                            </Card>
                    ));
                    setLoading(false);
                },
                error => {
                    console.log(error);
                    setHashError(true);
                    setLoading(false);
                }
            )
    }, [id])

    return <Container>
        <SiteNavbar />
        <Row className="mb-4 mt-5">
            <Link to="/" >Go Back</Link>
        </Row>
        <Row>
            <PacmanLoader color="red" loading={loading} />
        </Row>
        {!loading && <div>
            <Row>
            </Row>
            <Row className="mb-5">
                <Col>
                    <img src={image} />
                </Col>
                <Col>
                    <h1>{title}</h1>
                    <p>Console: {gameConsole}</p>
                    <p>Release Date: {releaseDate}</p>
                    <p>Developer: {developer}</p>
                    <p>Number of Achievements: {Object.keys(achievements).length}</p>
                    <Button href={gamePageURL} target="_blank">Go To Game Page</Button>

                </Col>
            </Row>
            <Row lg={1}>
                {hashCards}
            </Row>
            <Row className="mt-5">
                {achievementsHTML}
            </Row>
        </div>
        }
    </Container>
}

export default GameInfo