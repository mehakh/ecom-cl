import { React, useEffect, useState } from "react";
import classes from "./Products.module.css";
import Product from "./Product/Product";
import axios from "axios";

const products = [
  {
    id: 1,
    name: "1984",
    category: "Books",
    photo: "https://images-na.ssl-images-amazon.com/images/I/91SZSW8qSsL.jpg",
    price: "12",
  },
  {
    id: 2,
    name: "Iphone",
    category: "Phones",
    photo:
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-family-select-2021?wid=940&hei=1112&fmt=jpeg&qlt=80&.v=1617135051000",
    price: "1100",
  },
  {
    id: 3,
    name: "Airmax",
    category: "Sneakers",
    photo:
      "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/lddanijntooidcnakfzc/air-max-excee-shoe-ftKSvH.png",
    price: "140",
  },
  {
    id: 4,
    name: "Macbook",
    category: "Laptops",
    photo:
      "https://istore.lt/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/m/a/macbook-pro-13-m1-space-gray-3_2.jpg",
    price: "2100",
  },
  {
    id: 5,
    name: "Airpods",
    category: "Headphones",
    photo:
      "https://istore.lt/media/catalog/product/cache/1/image/800x/602f0fa2c1f0d1ba5e241f914e856ff9/a/p/apple-airpods-mmef2.jpg",
    price: "130",
  },
  {
    id: 6,
    name: "Table",
    category: "Furniture",
    photo:
      "https://www.ikea.com/ph/en/images/products/moerbylanga-table-oak-veneer-brown-stained__0737108_pe740890_s5.jpg",
    price: "70",
  },
  {
    id: 7,
    name: "Rotring",
    category: "Pencils",
    photo:
      "https://artsavingsclub.co.za/wp-content/uploads/2017/09/Rotring_800MechanicalPencil_Black_05.jpg",
    price: "35",
  },
  {
    id: 8,
    name: "Iwatch",
    category: "Watches",
    photo:
      "https://www.sirvintuppt.lt/Silm-dir%C5%BEu-apple-watch-band-44mm-40mm-iwatch-juosta-1/pic_186324-thumbs.jpg",
    price: "370",
  },
  {
    id: 9,
    name: "Imac",
    category: "Computers",
    photo: "https://www.ideal.lt/media/catalog/category/iMac-category3.png",
    price: "8000",
  },
  {
    id: 10,
    name: "Airtag",
    category: "utility",
    photo:
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airtag-double-select-202104_FMT_WHH?wid=2000&hei=2000&fmt=jpeg&qlt=80&.v=1617761672000",
    price: "25",
  },
];

function Products() {
  const [prods, setProds] = useState([]);

  useEffect(() => {
    axios
      .get("https://localhost:5000/api/products")
      .then((response) => {
        setProds(response.data.products);
        console.log(response.data.products);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className={classes.Products}>
      {products.map((product) => {
        return <Product key={product.id} product={product} />;
      })}
    </div>
  );
}

export default Products;
