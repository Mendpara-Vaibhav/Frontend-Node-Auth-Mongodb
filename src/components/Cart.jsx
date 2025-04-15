import { useDispatch, useSelector } from "react-redux";
import { clearCart, decrementQty, incrementQty } from "./cartSlice";
import { Button, Container, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { userOrder } from "./UserApi";
import { toast } from "react-toastify";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  console.log(cartItems);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handlePay = async () => {
    try {
      if (cartItems.length === 0) {
        toast.error("Cart is empty");
        return;
      }

      const products = cartItems.map((item) => ({
        productId: item.id,
        qty: item.qty,
        totalPrice: item.qty * item.price,
      }));

      const totalAmount = products.reduce(
        (sum, item) => sum + item.totalPrice,
        0
      );

      const response = await userOrder({ products, totalAmount });
      console.log("Order API response:", response.data);
      toast.success("Order placed successfully!");

      dispatch(clearCart());
    } catch (err) {
      console.error("Error placing order:", err);
      toast.error("Failed to place order");
    }
  };

  return (
    <>
      <div className="text-center">
        <h1>Cart</h1>
        <Button className="me-3" variant="danger" onClick={handleClearCart}>
          Clear Cart
        </Button>
        <Button className="me-3" variant="success" onClick={handleGoBack}>
          Go Back
        </Button>
        <Button variant="warning" onClick={handlePay}>
          Pay
        </Button>
      </div>

      {cartItems.length === 0 ? (
        <h1 className="text-center">Cart is empty. Add Items to the cart!</h1>
      ) : (
        cartItems.map((item) => (
          <Container key={item.id} className="my-5">
            <Card className="p-4 shadow-lg">
              <Row>
                <Col
                  md={4}
                  className="d-flex align-items-center justify-content-center"
                >
                  <img
                    src={item.img}
                    alt={item.name}
                    style={{ maxHeight: "300px", objectFit: "cover" }}
                    className="img-fluid rounded"
                  />
                </Col>
                <Col md={8}>
                  <h2 className="mb-3">Product Name: {item.name}</h2>
                  <h4 className="text-muted">Price: ₹{item.price}</h4>
                  <h5>Stock Qty: {item.stockQty}</h5>
                  <hr />
                  <h6>Short Description: {item.details?.shortdescription}</h6>
                  <h6>Long Description: {item.details?.longdescription}</h6>
                  <h6>Color: {item.details?.color}</h6>
                  <h6>Size: {item.details?.size}</h6>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => dispatch(decrementQty(item.id))}
                  >
                    -
                  </Button>

                  <span className="mx-3 fs-5">{item.qty}</span>

                  <Button
                    variant="success"
                    size="sm"
                    onClick={() => dispatch(incrementQty(item.id))}
                    disabled={item.qty >= item.stockQty}
                  >
                    +
                  </Button>
                  {item.qty >= item.stockQty && (
                    <small className="text-danger ms-2">
                      Max stock reached
                    </small>
                  )}
                </Col>
              </Row>
            </Card>
          </Container>
        ))
      )}
    </>
  );
};

export default Cart;
