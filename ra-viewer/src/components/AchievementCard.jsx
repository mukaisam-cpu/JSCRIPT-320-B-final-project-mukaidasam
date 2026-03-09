import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Link } from 'react-router-dom'

function AchievementCard({id, name, description, points, type, imageID}) {
    console.log(id);
    return <Card bg="primary" text="white">
        <Row>
            <Col xs={2}>
                <Card.Img src={`https://retroachievements.org/Badge/${imageID}.png`}></Card.Img>
            </Col>
            <Col>
                <Card.Title>{name} - {points} Points</Card.Title>
                <Card.Body>{description}</Card.Body>
            </Col>
        </Row>
    </Card>
}

export default AchievementCard