import { useCallback, useEffect, useState } from "react";
import { getProduct } from "./UserApi";
import { Card, Button, Container, Row, Col } from "react-bootstrap";

const ProductCardList = () => {
  const [card, setCard] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState();

  const getList = useCallback(async () => {
    const res = await getProduct(page, total);
    const list = res.data.list;
    console.log(list);
    setCard(list);
    setTotal(res.data.total);
  }, [page, total]);

  useEffect(() => {
    getList();
  }, [getList]);

  return (
    <>
      <Container className="my-4">
        <Row xs={1} md={3} className="g-4">
          {card.map((product, index) => (
            <Col key={index}>
              <Card>
                <Card.Img
                  variant="top"
                  src={product?.img}
                  alt={product?.name}
                  style={{ height: "200px", objectFit: "contain" }}
                />
                <Card.Body>
                  <Card.Title className="fs-3">{product?.name}</Card.Title>
                  <Card.Text className="text-black fs-5">
                    <strong>Price:</strong> ${product?.price} <br />
                    <strong>Quantity:</strong> {product?.qty}
                  </Card.Text>
                  <Button variant="primary">View Details</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default ProductCardList;
