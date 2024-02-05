

import { useState,useEffect } from "react";
import "./App.css";

import {format} from "date-fns"
import CurrencyInput from "./CurrencyInput";
import axios from "axios";
const KEY = "b7357b5fa7ef9142861808cc319aa140";

const url = `https://api.forexrateapi.com/v1/latest?base=USD&api_key=${KEY}`;
function App() {
  const[amountOne, setAmountOne] =useState(1)
  const[amountTwo, setAmountTwo] =useState(1)
  const[currencyOne, setCurrencyOne] =useState("AED")
  const [currencyTwo, setCurrencyTwo] = useState("BRL");
  const [currencyRates, setCurrencyRates] = useState([]);

  // useEffect(() => {
  //   axios.get(url)
  //     .then((response) => setCurrencyRates(response.data.rates))
  //     .catch((err) => {
  //       console.log(err)
  //       setCurrencyRates(null)

  //   })
  // }, [])
  useEffect(() => {
    try {
      // declare the data fetching function
      const fetchData = async () => {
        const { data } = await axios.get(url);
        console.log(data);
        // setCurrencyOne(data.base)
        setCurrencyRates(data.rates);
      };
      // call the function
      fetchData();
    }
    catch (error) {
      console.log(error)
      setCurrencyRates(null)
    }
  }, []);

  const handleAmountOne = (amountOne) => {
    setAmountTwo(
      formatCurrency((amountOne * currencyRates[currencyTwo]) /
        currencyRates[currencyOne]
    ));
    setAmountOne(amountOne)
  }
  useEffect(() => {
    if (!currencyRates) {
      handleAmountOne(1);
    }
  }, [currencyRates]);

  const formatCurrency = (number) => {
    return number.toFixed(2)
  }
  const handleAmountTwo = (amountTwo) => {
    setAmountOne(
      formatCurrency((amountTwo * currencyRates[currencyOne.base]) /
        currencyRates[currencyTwo]
    ));
    setAmountTwo(amountTwo);
  }

  const handleCurrencyOne = (currencyOne) => {
    setAmountTwo(
      formatCurrency((amountOne * currencyRates[currencyTwo]) /
        currencyRates[currencyOne]
    ));
    setCurrencyOne(currencyOne)
  }
  const handleCurrencyTwo = (currencyTwo) => {
      setAmountTwo(
        formatCurrency((amountOne * currencyRates[currencyOne]) /
          currencyRates[currencyTwo]
      ));
      setCurrencyTwo(currencyTwo);
    };
   if(!currencyRates) return <p> something went wrong .......</p>; 
  if (currencyRates.length === 0) {
    return <p>Loading ...!</p>
  }
  return (
    <div className="App">
      <h1>Currency converter</h1>
      <p className="oneCurrencyText">1 {currencyOne} equals </p>
      <p className="rateText">
        {formatCurrency(amountTwo / amountOne)} {currencyTwo}
      </p>
      <p className="date">{format(new Date(), "dd/MM/yyyy h:mm")}</p>
      <CurrencyInput
        amount={amountOne}
        currency={currencyOne}
        currencies={Object.keys(currencyRates)}
        onAmountChange={handleAmountOne}
        onCurrencyChange={handleCurrencyOne}
      />
      <CurrencyInput
        amount={amountTwo}
        currency={currencyTwo}
        currencies={Object.keys(currencyRates)}
        onAmountChange={handleAmountTwo}
        onCurrencyChange={handleCurrencyTwo}
      />
    </div>
  );
}

export default App;
