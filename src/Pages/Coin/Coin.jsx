import React, { useContext, useEffect, useState } from 'react'
import './Coin.css'
import { useParams } from 'react-router-dom'
import { CoinContext } from '../../Contexts/CoinContext'
import LineChart from '../../Components/LineChart/LineChart'

const Coin = () => {

  const { coinId } = useParams()
  const [coinData, setCoinData] = useState()
  const [historicalData, setHistoricalData] = useState()
  const { currency } = useContext(CoinContext)

  const fetchHistoricalData = async () => {
    const url = `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      setHistoricalData(data);
    } catch (error) {
      console.error(error);
    }
  }

  const fetchCoinData = async () => {
    const url = `https://api.coingecko.com/api/v3/coins/${coinId}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      setCoinData(data)
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchHistoricalData()
    fetchCoinData()
  }, [currency, coinId])

  if (coinData && historicalData) {
    // Debug: log available currencies and selected currency
    console.log('Available prices:', coinData.market_data?.current_price);
    console.log('Selected currency:', currency.name);
    const price = coinData.market_data?.current_price?.[currency.name] ?? coinData.market_data?.current_price?.usd;
    return (
      <div className="coin">
      <div className="coin-name">
      <img src={coinData.image?.large} alt="" />
      <p><b>{coinData.name} ({coinData.symbol?.toUpperCase()})</b></p>
      </div>
      <div className="coin-chart">
      <LineChart historicalData={historicalData} />
      </div>
      <div className="coin-info">
      <ul>
      <li>Crypto Market Rank</li>
      <li>{coinData.market_cap_rank}</li>
      </ul>
      <ul>
      <li>Current Price</li>
      <li>{currency.symbol}{price?.toLocaleString()}</li>
      </ul>
      <ul>
      <li>Market Cap</li>
      <li>
        {currency.symbol}
        {coinData.market_data?.market_cap?.[currency.name]?.toLocaleString() ??
        coinData.market_data?.market_cap?.usd?.toLocaleString()}
      </li>
      </ul>
       <ul>
        <li>24 Hour High</li>
        <li>
          {currency.symbol}
          {coinData.market_data?.high_24h?.[currency.name]?.toLocaleString() ??
          coinData.market_data?.high_24h?.usd?.toLocaleString()}
        </li>
        </ul>
        <ul>
        <li>24 Hour Low</li>
        <li>
          {currency.symbol}
          {coinData.market_data?.low_24h?.[currency.name]?.toLocaleString() ??
          coinData.market_data?.low_24h?.usd?.toLocaleString()}
        </li>
      </ul>
      </div>
      </div>
    )
  } else {
    return (
      <div className="spinner">
        <div className="spin">

        </div>
      </div>
    )
  }
}

export default Coin