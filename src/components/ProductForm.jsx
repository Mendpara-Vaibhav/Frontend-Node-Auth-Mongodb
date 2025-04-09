import { useEffect, useState } from "react";
import { FormControl } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { postProduct, updatesProduct } from "./UserApi";

function ProductForm({
  updateProduct,
  setUpdateProduct,
  show,
  handleShow,
  handleClose,
  getData,
}) {
  const [addData, setAddData] = useState({
    name: "",
    price: "",
    qty: "",
    img: "",
    images: [],
    shortdescription: "",
    longdescription: "",
    color: "",
    size: "",
  });

  useEffect(() => {
    if (updateProduct._id) {
      setAddData({
        name: updateProduct?.name || "",
        price: updateProduct?.price || "",
        qty: updateProduct?.qty || "",
        img: updateProduct?.img || "",
        images: Array.isArray(updateProduct?.images)
          ? updateProduct.images
          : [],
        shortdescription:
          updateProduct?.productDetail[0]?.shortdescription || "",
        longdescription: updateProduct?.productDetail[0]?.longdescription || "",
        color: updateProduct?.productDetail[0]?.color || "",
        size: updateProduct.productDetail[0]?.size || "",
      });
    } else {
      setAddData({
        name: "",
        price: "",
        qty: "",
        img: "",
        images: [],
        shortdescription: "",
        longdescription: "",
        color: "",
        size: "",
      });
    }
  }, [updateProduct]);

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setAddData((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputImages = (e) => {
    const files = Array.from(e.target.files);
    setAddData((prev) => ({ ...prev, images: [...prev.images, ...files] }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", addData.name);
    formData.append("price", addData.price);
    formData.append("qty", addData.qty);
    formData.append("img", addData.img);

    addData.images.forEach((file) => {
      formData.append("images", file);
    });

    formData.append("shortdescription", addData.shortdescription);
    formData.append("longdescription", addData.longdescription);
    formData.append("color", JSON.stringify(addData.color));
    formData.append("size", JSON.stringify(addData.size));

    let res;
    if (updateProduct._id) {
      res = await updatesProduct(updateProduct._id, formData);
      console.log("update res:", res);
    } else {
      res = await postProduct(formData);
      console.log("add res:", res);
    }

    if (res.status === 200) {
      getData();
      handleClose();
      setUpdateProduct({});
      setAddData({
        name: "",
        price: "",
        qty: "",
        img: "",
        images: [],
        shortdescription: "",
        longdescription: "",
        color: "",
        size: "",
      });
    }
  };

  return (
    <>
      <Button variant="primary" size="lg" onClick={handleShow}>
        Add Product
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Fill Product Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                id="name"
                name="name"
                placeholder="product name"
                value={addData.name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                id="price"
                name="price"
                min="0"
                value={addData.price}
                onChange={handleInputChange}
                required
                placeholder="how much"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                id="qty"
                name="qty"
                min="1"
                step="1"
                value={addData.qty}
                onChange={handleInputChange}
                required
                placeholder="how many"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Image</Form.Label>
              <FormControl
                type="url"
                id="img"
                name="img"
                value={addData.img}
                onChange={handleInputChange}
                required
                placeholder="enter image url"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Add More Images</Form.Label>
              <FormControl
                type="file"
                id="images"
                name="images"
                onChange={handleInputImages}
                multiple
                accept="image/*"
              />
            </Form.Group>

            {/* Preview selected images */}
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {addData.images &&
                addData.images.map((file, index) => {
                  const src =
                    typeof file === "string"
                      ? `http://localhost:8080/${file}` // or your deployed base URL
                      : URL.createObjectURL(file);

                  return (
                    <img
                      key={index}
                      src={src}
                      alt={`preview-${index}`}
                      width={100}
                      height={100}
                      style={{ objectFit: "cover", borderRadius: "4px" }}
                    />
                  );
                })}
            </div>

            <Form.Group className="mb-3">
              <Form.Label>Short Description</Form.Label>
              <FormControl
                type="text"
                id="shortdescription"
                name="shortdescription"
                value={addData.shortdescription}
                onChange={handleInputChange}
                required
                placeholder="enter short description"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Long Description</Form.Label>
              <FormControl
                type="text"
                id="longdescription"
                name="longdescription"
                value={addData.longdescription}
                onChange={handleInputChange}
                required
                placeholder="enter long description"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Color</Form.Label>
              <FormControl
                type="text"
                id="color"
                name="color"
                value={addData.color}
                onChange={handleInputChange}
                required
                placeholder="enter multiple color"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Size</Form.Label>
              <FormControl
                type="text"
                id="size"
                name="size"
                value={addData.size}
                onChange={handleInputChange}
                required
                placeholder="enter multiple size"
              />
            </Form.Group>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" type="submit">
                {updateProduct._id ? "Update Product" : "Save Product"}
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ProductForm;
