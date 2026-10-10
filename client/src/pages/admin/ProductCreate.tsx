import ProductForm from "../../components/admin/ProductForm";

function ProductCreate() {
  const onSubmit = (data: unknown) => {
    console.log("Product Create Data : ", data);
  };

  const isLoading = false;

  return (
    <div>
      <ProductForm onSubmit={onSubmit} isLoading={isLoading} />
    </div>
  );
}

export default ProductCreate;
