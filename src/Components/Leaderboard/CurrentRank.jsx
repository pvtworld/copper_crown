import React from 'react';

var CurrentRank = ({rank}) => {
    var rankToDisplay = rank ? rank : 'No rank yet';
    return (
        <div>
            <p>Current rank: {rankToDisplay}</p>
        </div>
    );
};

export default CurrentRank;