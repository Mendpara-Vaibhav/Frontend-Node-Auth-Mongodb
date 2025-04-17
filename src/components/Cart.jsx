import { useDispatch, useSelector } from "react-redux";
import { clearCart, decrementQty, incrementQty } from "./cartSlice";
import { Button, Container, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { createRazorpayOrder, userOrder } from "./UserApi";
import { toast } from "react-toastify";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  console.log(cartItems);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const MAX_RAZORPAY_LIMIT = 500000;

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleRazorpayPayment = async () => {
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

      if (totalAmount > MAX_RAZORPAY_LIMIT) {
        toast.error(
          "Amount exceeds ₹5,00,000 – cannot proceed with Razorpay payment."
        );
        return;
      }

      // console.log("Amount to send to Razorpay:", totalAmount);
      const razorpayResponse = await createRazorpayOrder(totalAmount * 100);
      console.log("Razorpay API Response:", razorpayResponse.data);

      const { id: order_id, amount, currency } = razorpayResponse.data;

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount,
        currency,
        order_id,
        name: "Shop Now",
        description: "Test Transaction",
        handler: async function (response) {
          // console.log("Payment successful:", response);
          const paymentInfo = {
            id: response.razorpay_payment_id,
            order_id: response.razorpay_order_id,
            signature: response.razorpay_signature,
            amount,
            currency,
            status: "created",
            receipt: order_id,
            createdAt: new Date().toISOString(),
          };

          // Save order to DB after successful payment
          const confirmOrder = await userOrder({
            products,
            totalAmount,
            paymentInfo,
          });
          console.log("Order API response:", confirmOrder.data);
          toast.success("Order placed successfully!");
          dispatch(clearCart());
        },
        prefill: {
          name: "Test User",
          email: "test@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment error:", err);
      toast.error("Payment failed");
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
        <Button variant="warning" onClick={handleRazorpayPayment}>
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
