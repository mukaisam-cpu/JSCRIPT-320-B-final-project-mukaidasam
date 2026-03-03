import Container from "react-bootstrap/Container"
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function SiteNavbar() {
    return (
        <Navbar expand="lg" className="bg-body-tertiary" fixed="top">
            <Container className="ms-5">
                <Navbar.Brand >
                    <img 
                    src="https://static.retroachievements.org/assets/images/ra-icon.webp"
                    height="30"
                    className="me-2"
                    />
                    RetroAchievements Viewer
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/saved">Saved Games</Nav.Link>
                        <Nav.Link href="/">About</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default SiteNavbar