import logo from './logo.svg'
import './App.css'

function App() {
  return (
    <div className="home">
      <div className="auctionContainer">
        <div className="playerDetailsContainer">
          <img src="https://www.thedesignwork.com/wp-content/uploads/2011/10/Random-Pictures-of-Conceptual-and-Creative-Ideas-02.jpg" />
          <div className="detailsContainer">
            <span>Name</span>
            <span>Age</span>
            <span>Hand</span>
            <span>Gender</span>
            <span>Type</span>
            <span>Base Price</span>
          </div>
        </div>
        <div>Skills</div>
        <div className="bidsContainer">
          <div>Current</div>
          <div>Older</div>
        </div>
      </div>
      <div className="infoContainer">
        <div className="walletContainer">Wallet</div>
        <div className="soldPlayersContainer">Sold Players</div>
      </div>
    </div>
  )
}

export default App
