import { useEffect, useState } from 'react'
import logo from './logo.svg'
import './App.css'
import { collection, getDocs } from 'firebase/firestore'
import { firestore } from './firebase'

function App() {
  const [currentAuction, setCurrentAuction] = useState({})
  const [teams, setTeams] = useState([])
  const [players, setPlayers] = useState([])
  const [wallets, setWallets] = useState({})
  const [soldPlayers, setSoldPlayers] = useState([])
  const [unsoldPlayers, setUnsoldPlayers] = useState([])
  const [remainingPlayers, setRemainingPlayers] = useState([])

  const fetchCurrentAuctionDetails = async () => {
    await getDocs(collection(firestore, 'app')).then((querySnapshot) => {
      querySnapshot.docs.map((doc) => {
        setCurrentAuction(doc.data())
      })
    })
  }

  const fetchPlayers = async () => {
    await getDocs(collection(firestore, 'players')).then((querySnapshot) => {
      let PLAYERS = []
      querySnapshot.docs.map((player) => {
        PLAYERS.push({
          age: player.data()?.age,
          bids: player.data()?.bids,
          dominantPlayingHand: player.data()?.dominantPlayingHand,
          gender: player.data()?.gender,
          mobileNumber: player.data()?.mobileNumber,
          name: player.data()?.name,
          photo: player.data()?.photo,
          preferredGame: player.data()?.preferredGame,
          skills: player.data()?.skills,
          sold: player.data()?.sold,
          team: player.data()?.team,
          uid: player.data()?.uid,
          basePrice: player.data()?.basePrice,
        })
        setPlayers(PLAYERS)
      })
    })
  }

  const fetchTeams = async () => {
    await getDocs(collection(firestore, 'users')).then((querySnapshot) => {
      let TEAMS = []
      querySnapshot.docs.map((player) => {
        if (player.data()?.role === 'team') {
          TEAMS.push({
            ...player.data(),
          })
        }
        setTeams(TEAMS)
      })
    })
  }

  const fetchWallets = async () => {
    await getDocs(collection(firestore, 'wallets')).then((querySnapshot) => {
      let WALLETS = {}
      querySnapshot.docs.map((wallet) => {
        if (wallet.data()?.role === 'team') {
          WALLETS[wallet.data()?.userId] = {
            ...wallet.data(),
          }
        }
        setWallets(WALLETS)
      })
    })
  }

  useEffect(() => {
    fetchCurrentAuctionDetails()
    fetchPlayers()
    fetchTeams()
    fetchWallets()
  }, [])

  useEffect(() => {
    setSoldPlayers(players.filter((p) => p.sold && p.team))
    setUnsoldPlayers(players.filter((p) => p.sold && !p.team))
    setRemainingPlayers(players.filter((p) => !p.sold))
  }, [players])

  // console.log(
  //   currentAuction,
  //   players,
  //   soldPlayers,
  //   unsoldPlayers,
  //   remainingPlayers,
  // )

  return (
    <div className="home">
      <div className="auctionContainer">
        <div className="playerDetailsContainer">
          <img
            src={
              currentAuction?.current_auction?.photo ||
              'https://www.exscribe.com/wp-content/uploads/2021/08/placeholder-image-person-jpg.jpg'
            }
          />
          <div className="detailsContainer">
            <span style={{ fontSize: '22px' }}>
              {currentAuction?.current_auction?.name || '-'}
            </span>
            <span>{currentAuction?.current_auction?.age || '-'} Yrs</span>
            <span>
              {currentAuction?.current_auction?.dominantPlayingHand
                ? currentAuction?.current_auction?.dominantPlayingHand ===
                  'left'
                  ? 'Lefty'
                  : 'Righty'
                : '-'}
            </span>
            <span>
              {currentAuction?.current_auction?.gender
                ? currentAuction?.current_auction?.gender === 'male'
                  ? 'Male'
                  : 'Female'
                : '-'}
            </span>
            <span>
              {currentAuction?.current_auction?.preferredGame
                ? currentAuction?.current_auction?.preferredGame === 'single'
                  ? 'Singles'
                  : 'Doubles'
                : '-'}
            </span>
            <span>
              Base Price: {currentAuction?.current_auction?.basePrice || '-'}
            </span>
          </div>
        </div>
        <div className="skillsContainer">
          {currentAuction?.current_auction?.skills.length > 0 &&
            currentAuction?.current_auction?.skills.map((skill) => {
              return <div className="skillChip">{skill}</div>
            })}
        </div>
        <div style={{ fontWeight: '600' }}>Current Bid</div>
        <div
          style={{
            borderRadius: '10px',
            background: true ? 'rgb(223,226,234)' : 'rgb(104, 88, 122)',
            padding: '10px',
            color: true ? 'black' : 'white',
          }}
        >
          No Bids Currently
        </div>
        <div style={{ border: '1px solid lightgray' }} />
        <div style={{ fontWeight: '600' }}>Older Bids</div>
        <div className="bidsContainer">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((bid) => {
            return (
              <div
                style={{
                  borderRadius: '10px',
                  background: 'rgb(223,226,234)',
                  padding: '10px',
                  color: 'black',
                }}
              >
                {bid}
              </div>
            )
          })}
        </div>
      </div>
      <div className="infoContainer">
        <div className="walletContainer">
          <span style={{ fontWeight: '700' }}>Amount Left</span>
          <div className="teamBudgetContainer">
            {teams &&
              teams?.length > 0 &&
              teams?.map((team) => {
                return (
                  <div className="teamBudget">
                    Team{team?.name}: {wallets[team?.uid]?.wallet}
                  </div>
                )
              })}
          </div>
        </div>
        <div className="soldPlayersContainer">
          <span style={{ fontWeight: '700' }}>Sold Players</span>
          <div className="playersList">
            {soldPlayers &&
              soldPlayers?.length > 0 &&
              soldPlayers?.map((player) => {
                return (
                  <div className="playerChip">
                    {player?.name} -{`>`} {player?.team} (
                    {player?.bids[0]?.value})
                  </div>
                )
              })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
