import {useEffect, useState} from "react"
import { useParams } from "react-router-dom"

import './ItemDetailContainer.css'


import ItemDetail from "../ItemDetail/ItemDetail"
import { doc, getDoc } from "firebase/firestore"
import { db } from "../../services/firebase"

function ItemDetailContainer() {
  const [product, setProduct] = useState({});
  const [loader, setLoader] = useState(false);
  const { productId } = useParams();

  useEffect(() => {
    setLoader(true);
    getDoc(doc(db, "products", productId))
      .then((querySnapshot) => {
        const prod = { id: querySnapshot.id, ...querySnapshot.data() };
        setProduct(prod);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoader(false);
      });
  }, [productId]);

  return (
    <>
      {loader ? (
        <div className="loader-container">
          <div>
            <div className="loader">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <p className="loader-text">Cargando producto...</p>
          </div>
        </div>
      ) : (
        <ItemDetail {...product} />
      )}
    </>
  );
}

export default ItemDetailContainer;
