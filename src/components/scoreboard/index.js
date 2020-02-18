import React from 'react';
import './scoreboard.css';
import axios from 'axios';
import PropTypes from 'prop-types';
import Spinner from 'react-bootstrap/Spinner';
import Scorecard from '../scorecard';
import 'react-datepicker/dist/react-datepicker.css';

class Scoreboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scores: [],
    };
  }

  componentDidMount() {
    this.fetchScores();
  }

  componentDidUpdate(newProps) {
    const { date } = this.props;
    if (newProps.date !== date) {
      this.fetchScores();
    }
  }

  fetchScores() {
    this.setState({ scores: [] });
    const { date } = this.props;
    axios.get(`${process.env.REACT_APP_SERVER_URL}/nba/scoreboard/${date.toISOString()}`)
      .then((scheduleRes) => {
        const scores = scheduleRes.data;
        this.setState({ scores });
      });
  }

  render() {
    const { date } = this.props;
    const { scores } = this.state;
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
      <div className="scorecards">
        {displayElements}
      </div>

    );
  }
}

Scoreboard.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
};

export default Scoreboard;
