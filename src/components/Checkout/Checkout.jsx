import {useState} from "react" 
import { useCart } from "../../hooks/useCart";
import {db} from '../../services/firebase'
import  './Checkout.css'
import { addDoc, collection, documentId, getDocs, query, where, writeBatch } from "firebase/firestore";

export default function Checkout() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [phone, setPhone] = useState("");
  const [direccion, setDireccion] = useState("");
  const [orderCreated, setOrderCreated] = useState(false);

  const { cart, totalQuantity, getTotal, clearCart } = useCart();
  const total = getTotal();



  if (orderCreated) {
    return (
      <h4 style={{ color: "green", textAlign: "center" }}>
        ¡La orden fue creada correctamente!
      </h4>
    );
  }

  if (cart.length === 0) {
    return (
      <h4 style={{ color: "red", textAlign: "center" }}>
        El carrito está vacío. Agrega productos antes de continuar.
      </h4>
    );
  }

  const createOrder = async (e) => {
    e.preventDefault();

    const objOrder = {
      buyer: {
        firstName: nombre,
        lastName: apellido,
        phone: phone,
        address: direccion,
      },
      items: cart,
      totalQuantity,
      total,
      date: new Date(),
    };

    try {
      const ids = cart.map((item) => item.id);
      const productRef = collection(db, "products");

      const productsAddedFromFirestore = await getDocs(
        query(productRef, where(documentId(), "in", ids))
      );

      const { docs } = productsAddedFromFirestore;
      const outOfStock = [];
      const batch = writeBatch(db);

      docs.forEach((doc) => {
        const dataDoc = doc.data();
        const stockDb = dataDoc.stock;

        const productAddedToCart = cart.find((prod) => prod.id === doc.id);
        const prodQuantity = productAddedToCart.quantity;

        if (stockDb >= prodQuantity) {
          batch.update(doc.ref, { stock: stockDb - prodQuantity });
        } else {
          outOfStock.push({ id: doc.id, ...dataDoc });
        }
      });

      if (outOfStock.length === 0) {
        await batch.commit();
        const orderRef = collection(db, "orders");
        const orderAdded = await addDoc(orderRef, objOrder);
        console.log(`El id de su orden es ${orderAdded.id}`);
        setOrderCreated(true);
        clearCart();
      } else {
        console.log("Hay productos fuera de stock:", outOfStock);
      }
    } catch (error) {
      console.error("Error al crear la orden:", error);
    }
  };

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>
      <form>
        <label>Nombre</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <label>Apellido</label>
        <input
          type="text"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
        />
        <label>Phone</label>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <label>Direccion</label>
        <input
          type="text"
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
        />
        <button type="submit" className="btn" onClick={createOrder}>
          Generar Orden
        </button>
      </form>
      {orderCreated && (
        <h4 className="success">¡La orden fue creada correctamente!</h4>
      )}
      {cart.length === 0 && (
        <h4 className="error">El carrito está vacío. Agrega productos antes de continuar.</h4>
      )}
    </div>
  );
  
}
