import React, { useContext, useEffect, useState } from 'react'
import './Home.css'
import { CoinContext } from '../../Contexts/CoinContext'
import { Link } from 'react-router-dom'

const Home = () => {

  const {allCoin, currency} = useContext(CoinContext)
  const [displayCoin, setDisplayCoin] = useState([])
  const [input, setInput] =useState('')

  useEffect(()=> {
    setDisplayCoin(allCoin)
  }, [allCoin]) 

   const inputHandler = (e) => {
    setInput(e.target.value);
    if(e.target.value === '') {
      setDisplayCoin(allCoin)
    }
  }

  const searchHandler = async (e)=> {
    e.preventDefault()
    const coins = await allCoin.filter((item)=> {
      return item.name.toLowerCase().includes(input.toLowerCase())
    })
    setDisplayCoin(coins)
  }

  return (
    <div className='home'>
      <div className="hero">
        <h1>Largest <br/> Crypto Marketplace</h1>
        <p>Welcome to the world's Largest cryptocurrency marketplace. Sign up to explore more about cryptos.</p>
        <form onSubmit={searchHandler}>
          <input onChange={inputHandler} list='coinlist' type="text" placeholder='Search Crypto' required />

          <datalist id='coinlist'>
            {allCoin.map((item, index) => (<option key={index} value={item.name}/>))}
          </datalist>


          <button type='submit'>Search</button>
        </form>
      </div>
      <div className="crypto-table">
        <div className="table-layout">
          <p>#</p>
          <p>Coins</p>
          <p>Price</p>
          <p style={{textAlign: "center"}}>24H change</p>
          <p className='market-cap' style={{textAlign: "right"}}>Market Cap</p>
        </div>
        {
          displayCoin.slice(0,10).map((item, index) => (
            <Link to={`/coin/${item.id}`} className="table-layout" key={index}>
              <p>{item.market_cap_rank}</p>
              <div>
                <img src= {item.image} alt="" />
                <p>{item.name +  ' - '  + item.symbol}</p>
              </div>
              <p>{currency.symbol} {item.current_price.toLocaleString()}</p>
              <p className={item.price_change_percentage_24h>0 ? "green" : "red"}>{Math.floor(item.price_change_percentage_24h*100)/100}</p>
              <p className='market-cap' style={{textAlign : "right"}}>{item.market_cap.toLocaleString()}</p>
            </Link>
          ))
        }
      </div>
    </div>
  )
}

export default Home