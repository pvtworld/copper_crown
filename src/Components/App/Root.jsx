import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import router from './Router'

const Root = ({ store }) => (
    <Provider store={store}>
        {router}
    </Provider>
);

Root.propTypes = {
    store: PropTypes.object.isRequired,
};

export default Root;