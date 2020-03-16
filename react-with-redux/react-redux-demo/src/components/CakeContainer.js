import React, { Component } from 'react'
import { connect } from 'react-redux'
import { buyCake } from '../redux'

class CakeContainer extends Component {
  render() {
    return (
      <div>
        <h2>Number of cakes: {this.props.numOfCakes}</h2>
        <button onClick={this.props.buyCake}>Buy Cake</button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    numOfCakes: state.numOfCakes
  }
}

const mapDispatchToProps = dispatch => {
  return {
    buyCake: () => dispatch(buyCake())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CakeContainer)

