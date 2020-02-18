import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import './scorecard.css';

const Scorecard = ({ team1LineScore, team2LineScore }) => (
  <Card className="scorecard">
    <Card.Body>
      <Card.Title>{`${team1LineScore.teamCityName} vs. ${team2LineScore.teamCityName}`}</Card.Title>
      <Card.Subtitle className="mb-2 text-muted">
        {`${team1LineScore.teamAbbreviation} (${team1LineScore.teamWinsLosses}) vs. ${team2LineScore.teamAbbreviation} (${team2LineScore.teamWinsLosses})`}
      </Card.Subtitle>
      <Card.Text>
        <span className={team1LineScore.pts > team2LineScore.pts ? 'bold' : ''}>{`${team1LineScore.pts}`}</span>
        {' '}
        -
        {' '}
        <span className={team1LineScore.pts > team2LineScore.pts ? '' : 'bold'}>{`${team2LineScore.pts}`}</span>
      </Card.Text>
    </Card.Body>
  </Card>
);

const lineScoreShape = {
  teamAbbreviation: PropTypes.string,
  teamCityName: PropTypes.string,
  teamWinsLosses: PropTypes.string,
  pts: PropTypes.number,
};

Scorecard.propTypes = {
  team1LineScore: PropTypes.shape(lineScoreShape).isRequired,
  team2LineScore: PropTypes.shape(lineScoreShape).isRequired,
};

export default Scorecard;
