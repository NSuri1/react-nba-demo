import React from 'react';
import './App.css';
import DatePicker from 'react-datepicker';
import { addDays } from 'date-fns';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Scoreboard from './components/scoreboard';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(Date.now() - 86400000),
    };
  }

  render() {
    const { date } = this.state;
    return (
      <div>
        <Jumbotron fluid>
          <Container className="title">
            <h1>NBA Scoreboard Demo</h1>
            <p>
                This is a small react demo that allows you to pick the date
                and see the scores of NBA games on that date!
            </p>

            <DatePicker
              selected={date}
              onChange={(newDate) => {
                this.setState({ date: newDate });
              }}
              maxDate={addDays(new Date(), -1)}
              placeholderText="Select a date before yesterady"
            />
          </Container>
        </Jumbotron>
        <Scoreboard date={date} />
      </div>

    );
  }
}

export default App;
