import useCounter from "../../hooks/useCounter";
import './ItemCount.css'

function ItemCount({ initialValue = 1, stock, onAdd }) {
  const { increment, decrement, valor: count } = useCounter(initialValue);

  return (
    <div className="item-count">
      <h1>{count}</h1>
      <button onClick={decrement}>Decrementar</button>
      <button onClick={() => onAdd(count)}>Agregar al carrito</button>
      <button onClick={increment}>Incrementar</button>
    </div>
  );
}

export default ItemCount;
