import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import Loader from "react-loader-spinner";

import {fetchUsers} from '../../actions/userActions';


import BetPreview from './BetPreview';

const WeeklyBets = ({users, fetchUsers}) => {
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

  const betsWeek = users.map(user => ({
    bet: user.bets.find(bet => !bet.game.result),
    user: user
  }))

  const renderUsers = users.map(user => {
    if(user.bets.some(bet => !bet.game.result)) {
      return(
        <div key={user._id} className="card-bet green"><FontAwesomeIcon icon={faCheck} className='mr-1' />{user.pseudo}</div>
      )
    } else {
      return(
        <div key={user._id} className="card-bet red" ><FontAwesomeIcon icon={faTimes} className='mr-1'/>{user.pseudo}</div>
      )
    }
  })

  const renderBets = betsWeek.map(({bet, user}) => {
    if(bet) {
      return (
        <React.Fragment key={bet._id}>
          <h3>{user.pseudo}</h3>
          <BetPreview bet={bet} game={bet.game}/>
        </React.Fragment>
      )
    } else {
      return(
        <React.Fragment key={user._id}>
          <h3>{user.pseudo}</h3>
          <div>Il n'a pas encore fait son pari, ce feignant !</div>
        </React.Fragment>
      )
    }
  })

  const renderWeekBets = () => {
    if(isLoading) {
      return (
        <div className="container-center" style={{height: "100vh", width: "100%"}}>
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
          <div className="d-flex">
            {renderUsers}
          </div>
          {renderBets}
        </>
      )
    }
  }


  return (
    <div className="container-center">
      <h1>Les paris de la semaine</h1>
      {renderWeekBets()}
    </div>
  )
}

const mapStateToProps = ({users}) => {
  return {
    users
  }
}

export default connect(mapStateToProps, {fetchUsers})(WeeklyBets)
