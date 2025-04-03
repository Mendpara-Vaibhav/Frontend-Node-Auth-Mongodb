import { useEffect, useState } from "react";
import { deleteProduct, getProduct } from "./UserApi";
import ProductForm from "./ProductForm";
import Table from "react-bootstrap/Table";

const Product = () => {
  const [data, setData] = useState();
  const [updateProduct, setUpdateProduct] = useState({});
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setUpdateProduct({});
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };

  const getData = async () => {
    const res = await getProduct();
    // console.log(res.data.list);
    setData(res.data.list);
  };

  const handleDelete = async (id) => {
    try {
      const res = await deleteProduct(id);
      console.log(res);
      if (res.status === 200) {
        setData(data.filter((curProduct) => curProduct._id !== id));
      } else {
        console.log("Failed to delete the post:", res.status);
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleEdit = (product) => {
    setUpdateProduct(product);
    handleShow(); // Open modal for editing
  };

  useEffect(() => {
    getData();
  }, [data]);

  return (
    <>
      <ProductForm
        data={data}
        setData={setData}
        updateProduct={updateProduct}
        setUpdateProduct={setUpdateProduct}
        show={show}
        handleShow={handleShow}
        handleClose={handleClose}
      />
      <Table bordered hover variant="info">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Image</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((product) => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.qty}</td>
                <td>
                  <img
                    src={product.img}
                    alt={product.name}
                    width="100"
                    height="150"
                  />
                </td>
                <td>
                  <button
                    onClick={() => handleEdit(product)}
                    className="btn-edit"
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="btn-delete"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  );
};

export default Product;
