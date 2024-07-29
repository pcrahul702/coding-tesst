import React from "react";
import { useGetCall } from "../Utility";
import { useSelector, useDispatch } from "react-redux";
export const Home = () => {
  const data1 = useSelector((state) => state.adddata.value);
  const { data, loading } = useGetCall("https://fakestoreapi.com/products/");
  console.log(data1)
  if (loading) {
    return <h1>Loading......</h1>;
  }
  return (
    <div>
      {data1?.map((item, index) => {
        return (
          <div key={index} style={{ border: "1px solid black" }}>
            <h3>{item.title}</h3>
            <p>{item.category}</p>
            <p>$ {item.price}</p>
          </div>
        );
      })}
    </div>
  );
};
