import React from 'react';
import './scoreboard.css';
import axios from 'axios';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import DatePicker from 'react-datepicker';
import { addDays } from 'date-fns';
import Scorecard from '../scorecard';
import 'react-datepicker/dist/react-datepicker.css';

class Scoreboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scores: [],
      date: new Date(Date.now() - 86400000),
    };
  }

  componentDidMount() {
    this.fetchScores();
  }

  fetchScores() {
    this.setState({ scores: [] });
    const { date } = this.state;
    axios.get(`${process.env.REACT_APP_SERVER_URL}/nba/scoreboard/${date.toISOString()}`)
      .then((scheduleRes) => {
        const scores = scheduleRes.data;
        this.setState({ scores });
      });
  }

  render() {
    const { date, scores } = this.state;
    const lineScore = scores.lineScore || [];
    const scorecards = [];

    for (let i = 0; i < lineScore.length / 2; i += 1) {
      scorecards.push(
        <Scorecard
          team1LineScore={lineScore[i * 2]}
          team2LineScore={lineScore[(i * 2) + 1]}
          key={i}
        />,
      );
    }

    let displayElements = scorecards;

    if (scores.length === 0) {
      displayElements = <Spinner animation="grow" />;
    } else if (scorecards.length === 0) {
      displayElements = (
        <div>
          {`No games were played on ${date.toLocaleDateString()}.`}
        </div>
      );
    }

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
                this.setState({ date: newDate }, this.fetchScores);
              }}
              maxDate={addDays(new Date(), -1)}
              placeholderText="Select a date before yesterady"
            />
          </Container>
        </Jumbotron>
        <div className="scorecards">
          {displayElements}
        </div>
      </div>

    );
  }
}

Scoreboard.propTypes = {};

export default Scoreboard;
