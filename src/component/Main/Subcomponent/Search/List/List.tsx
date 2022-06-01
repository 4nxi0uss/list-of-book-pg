import * as React from 'react';
import './List.scss'

import { ReactComponent as Thumb } from '../../../../../img/thumbsUp.svg'
import { ReactComponent as Star } from '../../../../../img/star.svg'
const List = () => {

    return (
        <table>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Read</th>
                    <th>Opinion</th>
                    <th>Favourite</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>Title1</td>
                    <td>Author1</td>
                    <td><button>Read</button></td>
                    <td><Thumb className='img img__up img__up--active' /><Thumb className='img img__down img__down--active' /></td>
                    <td><Star className='star  ' /></td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>Title2</td>
                    <td>Author3</td>
                    <td><button>Read</button></td>
                    <td><Thumb className='img img__up img__up--active' /><Thumb className='img img__down img__down--active' /></td>
                    <td><Star className='star  ' /></td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>Title1</td>
                    <td>Author1</td>
                    <td><button>Read</button></td>
                    <td><Thumb className='img img__up img__up--active' /><Thumb className='img img__down img__down--active' /></td>
                    <td><Star className='star  ' /></td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>Title2</td>
                    <td>Author3</td>
                    <td><button>Read</button></td>
                    <td><Thumb className='img img__up img__up--active' /><Thumb className='img img__down img__down--active' /></td>
                    <td><Star className='star  ' /></td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>Title1</td>
                    <td>Author1</td>
                    <td><button>Read</button></td>
                    <td><Thumb className='img img__up img__up--active' /><Thumb className='img img__down img__down--active' /></td>
                    <td><Star className='star  ' /></td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>Title2</td>
                    <td>Author3</td>
                    <td><button>Read</button></td>
                    <td><Thumb className='img img__up img__up--active' /><Thumb className='img img__down img__down--active' /></td>
                    <td><Star className='star  ' /></td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>Title1</td>
                    <td>Author1</td>
                    <td><button>Read</button></td>
                    <td><Thumb className='img img__up img__up--active' /><Thumb className='img img__down img__down--active' /></td>
                    <td><Star className='star  ' /></td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>Title2</td>
                    <td>Author3</td>
                    <td><button>Read</button></td>
                    <td><Thumb className='img img__up img__up--active' /><Thumb className='img img__down img__down--active' /></td>
                    <td><Star className='star  ' /></td>
                </tr>
            </tbody>
        </table>
    );
}

export default List;