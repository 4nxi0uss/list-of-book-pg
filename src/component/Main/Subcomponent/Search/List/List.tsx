import * as React from 'react';
import './List.scss'

import { ReactComponent as Thumb } from '../../../../../img/thumbsUp.svg'
import { ReactComponent as Star } from '../../../../../img/star.svg'
import { useGetAuthorByNameQuery } from '../../../../../Redux/Services/Book';

const List = () => {

    const { data, error, isLoading }: any = useGetAuthorByNameQuery("")

    const readLink = (site: any) => {

        return site.resources.map((el: any) => {
            if (el.uri.includes(".htm")) {
                return <a key={el.id} href={el.uri} className='button' target="_blank " rel='noreferrar'>Read</a>
            }
        }
        );
    }

    const handleClickIconUp = (e: any) => {
        console.log(e.nativeEvent.path[1])
        console.log(e.nativeEvent.path[0])
    }

    const tableRender = () => !isLoading && data?.results?.map((el: any) => {
        return (
            <tr key={el.id}>
                <td>{el.id}</td>
                <td>{el.title}</td>
                <td>{el.agents[0].person}</td>
                <td>{readLink(el)}</td>
                <td><Thumb className='img img__up' onClick={handleClickIconUp} /><Thumb className='img img__down' /></td>
                <td><Star className='star' /></td>
            </tr>
        )
    })

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
                {tableRender()}
            </tbody>
        </table>
    );
}

export default List;