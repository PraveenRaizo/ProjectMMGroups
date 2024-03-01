import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import RoutesComponent from 'routes'

function App(): JSX.Element {

    return (
        <BrowserRouter>
            <RoutesComponent/>
        </BrowserRouter>
    )
}

export default App;