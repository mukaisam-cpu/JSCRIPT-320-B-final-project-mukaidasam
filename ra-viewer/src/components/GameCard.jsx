import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

function GameCard({ id, title, image, numAchievements, points }) {
    return <Card>
        <Row>
            <Col md={2}>
                <Card.Img 
                src={`https://retroachievements.org${image}`}
                ></Card.Img>
            </Col>
            <Col>
                <Link to={`/gameInfo/${id}`}>{title}</Link>
                <Card.Text> 
                    <b>{numAchievements}</b> achievements worth <b>{points}</b> points
                </Card.Text>
            </Col>
        </Row>
    </Card>
}

export default GameCard