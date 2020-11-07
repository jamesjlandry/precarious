import React from 'react'
import { Provider, Route } from '@triframe/designer'
import { MainPage } from './views/MainPage'

export default () => (
    <Provider url={process.env.REACT_APP_BACKEND_URL}>
        <Route path="/" component={MainPage} />
    </Provider>
)