import Item from "../Item/Item"
import "./ItemList.css";

function ItemList({products}) {
  return (
    <div className="item-grid">
        {products.map( product => <Item key={product.id} product={product} />)}
    </div>
  )
}

export default ItemList
