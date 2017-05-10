import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import routes from './Routes'

const Root = ({ store }) => (
    <Provider store={store}>
        {routes}
    </Provider>
);

Root.propTypes = {
    store: PropTypes.object.isRequired,
};

export default Root;