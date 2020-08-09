import React from 'react';

export default class CreateExercise extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      description: '',
      duration: 0,
      date: new Date(),
      users: []
    }
    this.onChangeDate = this.onChangeDate.bind(this);
  }

  onChangeUsername(event) {
    this.setState({
      username: event.target.value
    })
  }

  onChangeDescription(event) {
    this.setState({
      description: event.target.value
    })
  }

  onChangeDuration(event) {
    this.setState({
      duration: event.target.value
    })
  }

  onChangeDate(date) {
    this.setState({
      date: date
    })
  }

  onSubmit(event) {
    event.preventDefault();
    const exercise = {
      username: this.state.username,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date
    }
  }

  render() {
    return (
      <h1>Create exercises</h1>
    );
  }
}