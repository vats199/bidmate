import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="home">
      <div className="auctionContainer">
        <div className="playerDetailsContainer">
          <img src="https://www.thedesignwork.com/wp-content/uploads/2011/10/Random-Pictures-of-Conceptual-and-Creative-Ideas-02.jpg" />
          <div className="detailsContainer">
            <span>Vatsal Patel</span>
            <span>22 Yrs</span>
            <span>Righty</span>
            <span>Male</span>
            <span>Doubles</span>
            <span>Base Price: 22M</span>
          </div>
        </div>
        <div className="skillsContainer">
          {["Serve", "Volleys", "Slices", "Lobs", "Forehands"].map((skill) => {
            return <div className="skillChip">{skill}</div>;
          })}
        </div>
        <div style={{ fontWeight: "600" }}>Current Bid</div>
        <div
          style={{
            borderRadius: "10px",
            background: "red",
            padding: "10px",
            color: "white",
          }}
        >
          No Bids Currently
        </div>
        <div style={{ border: "1px solid lightgray" }} />
        <div style={{ fontWeight: "600" }}>Older Bids</div>
        <div className="bidsContainer">
          {[1, 2, 3, 4, 5, 6, 7].map((bid) => {
            return (
              <div
                style={{
                  borderRadius: "10px",
                  background: "rgb(223,226,234)",
                  padding: "10px",
                  color: "white",
                }}
              >
                {bid}
              </div>
            );
          })}
        </div>
      </div>
      <div className="infoContainer">
        <div className="walletContainer">
          <span style={{ fontWeight: "700" }}>Amount Left</span>
          <div className="teamBudgetContainer">
            {[1, 2, 3, 4, 5, 6].map((team) => {
              return (
                <div className="teamBudget">
                  Team{team}: {team * 1000}
                </div>
              );
            })}
          </div>
        </div>
        <div className="soldPlayersContainer">
          <span style={{ fontWeight: "700" }}>Sold Players</span>
          <div className="playersList">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 1, 2, 2, 2, 2, 2].map(
              (player) => {
                return (
                  <div className="playerChip">
                    Player -{`>`} Team ({player})
                  </div>
                );
              }
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
