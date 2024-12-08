import { useParams } from "react-router-dom"
import ItemList from "../ItemList/ItemList"


import { getProducts } from "../../services/firebase/firestore/products"
import { useAsync } from "../../hooks/useAsync"



function ItemListContainer({greetings}) {
    const {categoryId} = useParams()
   
    const  asyncFunction = () => getProducts(categoryId)
    
    const {data: products, loading, error} = useAsync(asyncFunction)


    if (loading) {
      return (
        <h4
          className="text-center"
          style={{ backgroundColor: "red", color: "white", padding: "10px" }}
        >
          Loading...
        </h4>
      );
    }

    if (error) {
      return (
        <h4
          style={{
            color: "white",
            backgroundColor: "#d68fff",
            textAlign: "center",
          }}
        >
          Error al cargar los productos
        </h4>
      );
    }
   

  return (
    <div className="container">
        <h2 className="text-center">{greetings}</h2>
        <ItemList products={products} />
    </div>
  )
}

export default ItemListContainer