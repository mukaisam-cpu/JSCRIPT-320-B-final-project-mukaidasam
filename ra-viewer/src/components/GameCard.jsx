import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'

function GameCard({ id, title, image }) {
    return <Card>
        <Card.Img src={`https://retroachievements.org${image}`}></Card.Img>
        <Link to={`/gameInfo/${id}`}>{title}</Link>
    </Card>
}

export default GameCard