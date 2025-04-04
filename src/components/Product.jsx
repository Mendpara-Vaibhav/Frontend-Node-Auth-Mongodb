import { useEffect, useState } from "react";
import { deleteProduct, getProduct, getProductDetail } from "./UserApi";
import ProductForm from "./ProductForm";
import Table from "react-bootstrap/Table";
import { NavLink } from "react-router-dom";

const Product = () => {
  const [data, setData] = useState([]);
  const [updateProduct, setUpdateProduct] = useState({});
  const [show, setShow] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handleShow = () => {
    setShow(true);
  };

  const getData = async () => {
    const res = await getProduct(page, 3);
    // console.log(res.data.list);
    setData(res.data.list);
    setTotalPages(res.data.totalPages);
  };

  const handleDelete = async (id) => {
    try {
      const res = await deleteProduct(id);
      console.log(res);
      if (res.status === 200) {
        // setData(data.filter((curProduct) => curProduct._id !== id));
        getData();
      } else {
        console.log("Failed to delete the post:", res.status);
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleEdit = async (id) => {
    const res = await getProductDetail(id);
    const product = res.data.product;
    console.log(product);
    // console.log("edit product", id);
    setUpdateProduct(product);
    setShow(true);
  };

  const handleClose = () => {
    setUpdateProduct({});
    setShow(false);
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
      <Table bordered variant="info">
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
                <td>
                  <NavLink to={`/productDetail/${product._id}`}>
                    {product.name}
                  </NavLink>
                </td>
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
                    onClick={() => handleEdit(product._id)}
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

      {/* Pagination Controls */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          margin: "1rem 0",
        }}
      >
        <button disabled={page <= 1} onClick={() => setPage(page - 1)}>
          Prev
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button disabled={page >= totalPages} onClick={() => setPage(page + 1)}>
          Next
        </button>
      </div>
    </>
  );
};

export default Product;
