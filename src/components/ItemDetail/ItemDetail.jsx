import { Link } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import ItemCount from "../ItemCount/ItemCount";

function ItemDetail({id, name, img, summary, platform, price, stock }) {
  
  const { addItem, isInCart } = useCart();
  const handleAdd = (count) => {
    const productToAdd = {
      id, name, price, quantity: count
    }
    addItem(productToAdd)
  }

  return (
    <div className="container">
      <h2>{name}</h2>
      <div className="card">
        <img
          src={img}
          style={{ width: 300 }}
          className="card-img-top"
          alt={name}
        />
        <div className="card-body">
          <p className="card-text">{summary}</p>
          <p className="card-text">Categoria: {platform}</p>
          <h2 className="card-text">Precio: $ {price}</h2>
          <h2 className="card-text">Disponible - {stock}</h2>
        </div>
      </div>

      {
        isInCart(id) ? (
          <Link to="/cart">Ir al carrito</Link>
        ):
        (
          <ItemCount stock={stock} onAdd={ handleAdd } />
        )
      }

    </div>
  );
}

export default ItemDetail
