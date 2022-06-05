import * as React from 'react';

import './Main.scss'
import List from './Subcomponent/List/List';
import Search from './Subcomponent/Search/Search';

const Main = () => {
    return (
        <main className='main'>
            <Search />
            <List />
        </main>
    )
}

export default Main;