import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setDatainRedux } from "../Redux/Slices/dataSlice";
export const useGetCall = (url) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const dispatch=useDispatch()
  useEffect(() => {
    const apicall = async (url) => {
      try {
        const res = await axios.get(url);
        setData(res.data);
        console.log(res.data)
        dispatch(setDatainRedux(res.data));
        setLoading(false);
      } catch (err) {
        setLoading(false)
        console.log("erro", err);
      }
    };
    apicall(url);
  }, url);

  return { data, loading };
};
