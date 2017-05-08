import React from 'react';
import LeaderboardItem from './LeaderboardItem';

const LeaderboardList = (props) => {
    var {listItems} = props;
    var renderList = () => {
        return (
            listItems.map((item) => {
                return <LeaderboardItem key={item.pos} {...item} />;
            })
        );
    };
    return(
        <div>
            {renderList()}
        </div>
    );
};

export default LeaderboardList;

