import StatCalculator from './statCalculator'
import StatCalculatorUserBets from './statCalculatorUserBets'

export default class StatCalculatorUsers extends StatCalculator {

  constructor({ users }) {
    super()
    this.users = users
  }

  get usersPseudo() { return this.users.map(user => user.pseudo) }

  get earningsReparition() { return (this.users.map((user) => {
    return (user.bets.reduce((sum, bet) => {
    if (bet.game.result === bet.choice) {
      return sum + this.betOdd(bet) * 2
    }
    return sum
  }, 0)).toFixed(2)})) }

  get usersAvgOddLoose() { return ( this.users.map((user) => {
    return new StatCalculatorUserBets({userBets: user.bets}).averageOddLoose
  })) }

  get usersAvgOddWin() { return ( this.users.map((user) => {
    return new StatCalculatorUserBets({userBets: user.bets}).averageOddWin
  })) }

  get earningsEvolutionByUsers() {
    return this.users.map((user) => {
      return {
        label: user.pseudo,
        data: new StatCalculatorUserBets({userBets: user.bets}).tableEarnings.map((earning, index) => {
          return earning + new StatCalculatorUserBets({userBets: user.bets}).tableEarnings.slice(0, index).reduce((sum, acc) => sum + acc, 0)
          }),
        fill: false,
        backgroundColor: user.color || 'rgb(255, 99, 132)',
        borderColor: user.color || 'rgba(255, 99, 132, 0.2)',
      }
    })
  }
}