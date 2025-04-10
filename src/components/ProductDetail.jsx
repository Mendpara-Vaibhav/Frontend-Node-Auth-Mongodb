import React, { useEffect, useState } from "react";
import { getProductDetail } from "./UserApi";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Container, Row, Col, Card, Carousel } from "react-bootstrap";

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

  return (
    <>
      <Container className="my-5">
        <Card className="p-4 shadow-lg">
          <Row>
            <Col
              md={4}
              className="d-flex align-items-center justify-content-center"
            >
              <img
                src={productDetail?.product?.img}
                alt={productDetail?.product?.name}
                style={{ maxHeight: "300px", objectFit: "cover" }}
                className="img-fluid rounded"
              />
            </Col>
            <Col md={8}>
              <h2 className="mb-3">
                Product Name: {productDetail?.product?.name}
              </h2>
              <h4 className="text-muted">
                Price: ₹{productDetail?.product?.price}
              </h4>
              <h5>Qty: {productDetail?.product?.qty}</h5>
              <hr />
              <h6>
                Short Description:{" "}
                {productDetail?.product?.productDetail[0]?.shortdescription}
              </h6>
              <h6>
                Long Description:{" "}
                {productDetail?.product?.productDetail[0]?.longdescription}
              </h6>
              <h6>Color: {productDetail?.product?.productDetail[0]?.color}</h6>
              <h6>Size: {productDetail?.product?.productDetail[0]?.size}</h6>

              <Button variant="success" onClick={handleGoBack}>
                Go Back
              </Button>
            </Col>
          </Row>

          <hr />

          {productDetail?.product?.images?.length > 0 && (
            <Carousel fade variant="dark" interval={2000} pauseOnHover>
              {productDetail.product.images.map((image, index) => (
                <Carousel.Item key={index}>
                  <img
                    className="d-block w-100"
                    src={`http://localhost:8080/${image}`}
                    alt={`${productDetail.product.name} - ${index}`}
                    style={{
                      maxHeight: "400px",
                      objectFit: "contain",
                    }}
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          )}
        </Card>
      </Container>
    </>
  );
};

export default ProductDetail;
