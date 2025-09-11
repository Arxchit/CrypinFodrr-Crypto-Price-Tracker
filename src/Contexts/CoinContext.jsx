import { createContext, useEffect, useState } from "react";

export const CoinContext = createContext()

const CoinContextProvider = (props) => {

    const [allCoin, setAllCoin] = useState([]);
    const [currency, setCurrency] = useState({
        name: "USD",
        symbol: "$"
    })
    const fetchAllCoin = async () => {
        fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`, {
            method: "GET",
            headers: { accept: "application/json" }
        })
            .then(res => {
                console.log("HTTP status:", res.status);
                return res.json();
            })
            .then(data => {
                console.log("Response JSON:", data);
                setAllCoin(Array.isArray(data) ? data : []);
            })
            .catch(err => console.error("Fetch error:", err));
    };

    useEffect(() => {
        fetchAllCoin()
    }, [currency])

    const contextValue = {
        allCoin, currency, setCurrency
    }

    return (
        <CoinContext.Provider value={contextValue}>
            {props.children}
        </CoinContext.Provider>
    )
}

export default CoinContextProvider