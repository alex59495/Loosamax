import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import Loader from "react-loader-spinner";

import UserStats from './UserStats';
import DoughnutGraph from './DoughnutGraph';
import RadarGraph from './RadarGraph';
import LineGraph from './LineGraph';

import {fetchUsers} from '../../actions/userActions';
import StatCalculatorUsers from '../../utils/stats/statCalculatorUsers';
import StatCalculatorUserBets from '../../utils/stats/statCalculatorUserBets';

const GlobalStats = ({users, fetchUsers}) => {

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true
      async function fetchData() {
        await fetchUsers()
        if(isMounted) setIsLoading(false)
      }
      fetchData();
      return () => { isMounted = false };
  }, [])

  const usersSorted = users.sort((userA, userB) => {
    return new StatCalculatorUserBets({userBets: userB.bets}).globalEarning - new StatCalculatorUserBets({userBets: userA.bets}).globalEarning 
  })

  const renderRanking = () => {
    return usersSorted.map((user, index) => {
      return (
        <tr key={user._id}>
          <td>{index + 1}.</td>
          <td>{user.pseudo}</td>
        </tr>
      )
    })
  }

  const renderStatPerUser = () => {
    return usersSorted.map(user => {
      return (
        <UserStats key={user._id} user={user}/>
      )
    })
  }

  const renderStatsGraph = () => {
    const statCalculatorUsers = new StatCalculatorUsers({users})

    if (statCalculatorUsers.usersMadeBets) {
      return (
        <p className="text-comment">
          Il n'y a même pas encore de paris, t'as cru qu'on allait bosser et faire des jolis graphs ?
        </p>
      )
    } else {
      return (
        <>
          <div className="grid_wrap">
            <DoughnutGraph users={users}/>
            <RadarGraph title="Moyenne côtes réussies" users={users} avgType="usersAvgOddWin"/>
            <RadarGraph title="Moyenne côtes ratées" users={users} avgType="usersAvgOddLoose"/>
          </div>
          <LineGraph users={users}/>  
        </>
      )
    }
  }

  const renderStats = () => {
    if(isLoading){
      return(
      <div className="container-center margin-auto">
        <Loader
          type="BallTriangle"
          color="#00BFFF"
          height={100}
          width={100}
        />
      </div>
      )
    } else {
      return (
        <>
          {renderStatPerUser()}
          <h3>Graphs</h3>
          {renderStatsGraph()}
        </>
      )
    }
  }

  return (
    <div className="container-center inherit-min-height">
      <h1>Les Stats des champions</h1>
      <table>
        <thead>
            <tr>
                <th colSpan="2">Le classement</th>
            </tr>
        </thead>
        <tbody>
          {renderRanking()}
        </tbody>
      </table>
      <h2>Les stats en détails</h2>
      {renderStats()}
    </div>
  )
}

const mapStateToProps = ({users}) => {
  return {
    users
  }
}

export default connect(mapStateToProps, {fetchUsers})(GlobalStats)
