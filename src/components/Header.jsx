import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useSelector } from "react-redux";

const Header = () => {
  const cartItems = useSelector((store) => store.cart.items);
  console.log(cartItems);

  return (
    <Navbar bg="light" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand href="/">Shop Now</Navbar.Brand>
        <Nav className="ms-auto gap-3">
          <Nav.Link as={Link} className="fw-bold" to="/">
            Home
          </Nav.Link>
          <Nav.Link as={Link} className="fw-bold" to="/cart">
            Cart - ({cartItems.length} items)
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
