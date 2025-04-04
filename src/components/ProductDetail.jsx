import React, { useEffect, useState } from "react";
import { getProductDetail } from "./UserApi";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Container, Row, Col, Card } from "react-bootstrap";

const ProductDetail = () => {
  const [productDetail, setProductDetail] = useState();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchDetail = async () => {
      const response = await getProductDetail(id);
      console.log(response.data);
      setProductDetail(response.data);
    };
    if (id) {
      fetchDetail();
    }
  }, [id]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const product = productDetail?.product;
  const detail = product?.productDetail?.[0];

  return (
    <>
      {/* <section>
        <h2>Product Name: {productDetail?.product?.name}</h2>
        <h3>Price: {productDetail?.product?.price}</h3>
        <h3>Qty: {productDetail?.product?.qty}</h3>
        <h6>
          <img
            src={productDetail?.product?.img}
            alt=""
            height={150}
            width={100}
          />
        </h6>
        <h3>
          Short Description:{" "}
          {productDetail?.product?.productDetail[0]?.shortdescription}
        </h3>
        <h3>
          Long Description:{" "}
          {productDetail?.product?.productDetail[0]?.longdescription}
        </h3>
        <h3>Color: {productDetail?.product?.productDetail[0]?.color}</h3>
        <h3>Size: {productDetail?.product?.productDetail[0]?.size}</h3>

        <Button variant="success" onClick={handleGoBack}>
          Go Back
        </Button>
      </section> */}

      <Container className="my-5">
        <Card className="p-4 shadow-lg">
          <Row>
            {/* Left column: Image */}
            <Col
              md={4}
              className="d-flex align-items-center justify-content-center"
            >
              <img
                src={product?.img}
                alt={product?.name}
                className="img-fluid rounded"
                style={{ maxHeight: "300px", objectFit: "cover" }}
              />
            </Col>

            {/* Right column: Details */}
            <Col md={8}>
              <h2 className="mb-3">Product Name: {product?.name}</h2>
              <h4 className="text-muted">Price: ₹{product?.price}</h4>
              <h5>Quantity: {product?.qty}</h5>

              <hr />

              <p>
                <strong>Short Description:</strong> {detail?.shortdescription}
              </p>
              <p>
                <strong>Long Description:</strong> {detail?.longdescription}
              </p>
              <p>
                <strong>Color:</strong> {detail?.color}
              </p>
              <p>
                <strong>Size:</strong> {detail?.size}
              </p>

              <Button variant="success" onClick={handleGoBack} className="mt-3">
                Go Back
              </Button>
            </Col>
          </Row>
        </Card>
      </Container>
    </>
  );
};

export default ProductDetail;
