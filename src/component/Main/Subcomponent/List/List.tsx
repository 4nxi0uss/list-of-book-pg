import type { ChangeEvent, MouseEvent } from 'react'

import './List.scss'

import star from '../../../../img/star1.png'
import starActive from '../../../../img/star1-gold.png'

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../Redux/Hooks/ReduxHooks';
import { decrementPageNumber, getBookData, incrementPageNumber, setPageNumberByAmount } from '../../../../Redux/Slice/BookSlice';
import { SUCCESS_STATUS } from '../../../../Redux/Types/ReduxTypes';

const List = () => {
    const { error, bookStatus: isLoading, data, pageNumber } = useAppSelector((state) => state.getBook)

    const dispach = useAppDispatch();

    //call api query
    useEffect(() => {
        dispach(getBookData(``))
    }, [])

    // check error
    error !== "err" && console.warn(error)

    // creat read btn
    const readLink = (site: any) => site.resources.map((el: any) => (el.uri.includes(".htm")) && (<a key={el.id} href={el.uri} className='button' target="_blank " rel='noreferrar'>Read</a>));

    let favArr: any[] = [];

    // add fav to array 
    try {
        favArr = [...JSON.parse(String(window.localStorage.getItem("fav")))];
    } catch (error) {
        console.warn(error);
    }

    const handleFavBook = (event: any, id: number) => {
        if (Boolean(favArr.find((favEl) => favEl === id))) {

            event.target.src = star;

            const lastInd = favArr.findIndex((s) => s === id);
            favArr.splice(lastInd, 1);

            favArr = [...favArr];

            window.localStorage.setItem("fav", JSON.stringify(favArr));
        } else {
            event.target.src = starActive;
            favArr = [...favArr, id];

            window.localStorage.setItem("fav", JSON.stringify(favArr));
        }
    }

    const handleNextSite = () => {
        dispach(incrementPageNumber())
        dispach(getBookData(`${data.next.slice(data.next.indexOf('?'), data.next.length) ?? " "}`));
    }

    const handlePrevSite = () => {
        if (pageNumber === 1) {
            dispach(setPageNumberByAmount(1))
        } else {
            dispach(getBookData(`${data.previous.slice(data.previous.indexOf('?'), data.previous.length)}`));
            dispach(decrementPageNumber())
        }
    }

    // count number of sites 
    const numberOfSites = Math.ceil(data.count / 10)

    // create a table with data from api
    const tableRender = () => (isLoading === SUCCESS_STATUS) && data?.results?.map((el: any) => {
        return (
            <tr key={el.id}>
                <td>{el.title}</td>
                <td>{el?.agents[0]?.person}</td>
                <td>{readLink(el)}</td>
                <td>
                    <img src={Boolean(favArr.find((favEl) => favEl === el.id)) ? starActive : star} alt='empty star' className='star' onClick={(e: MouseEvent<HTMLImageElement>) => { handleFavBook(e, el.id) }} />
                </td>
            </tr>
        )
    })

    const handleSiteInput = (event: ChangeEvent<HTMLInputElement>) => {
        if (!(Number(event.target.value) <= 1) && Number(event.target.value) <= (numberOfSites)) {
            dispach(setPageNumberByAmount(Number(event.target.value)))
        } else if (Number(event.target.value) >= (numberOfSites)) {
            dispach(setPageNumberByAmount(numberOfSites))
        } else {
            dispach(setPageNumberByAmount(1))
        }
    }

    const handleSiteInputOnKeyDown = (e: any) => {
        if (e.keyCode === 13 && !(Number(e.target.value) <= 1)) {
            dispach(setPageNumberByAmount(Number(e.target.value)))
            dispach(getBookData(`?page=${e.target.value}${(data.next.slice(data.next.indexOf("&"), data.next.length - 1).length <= 10 ? "  " : data.next.slice(data.next.indexOf('&'), data.next.length ?? " ")) ?? " "}`));
        } else if (e.keyCode === 13) {
            dispach(setPageNumberByAmount(1))
        }
    }

    return (
        <>
            <table>
                <thead >
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Read</th>
                        <th>Favourite</th>
                    </tr>
                </thead>
                <tbody>
                    {(isLoading === SUCCESS_STATUS) ? tableRender() : (<tr className='waiter'><td><div className='spinner'>{" "}</div></td></tr>)}
                </tbody>
            </table>
            <div className='div-pagination'>
                <button onClick={() => { isLoading === SUCCESS_STATUS && handlePrevSite() }}>Prev</button>

                <input type="number" className='div-pagination__page-input' onKeyDown={handleSiteInputOnKeyDown} onChange={handleSiteInput} value={pageNumber} max={numberOfSites} />

                <span className='div-pagination__number-of-page'> /{numberOfSites}</span>

                <button onClick={() => { isLoading === SUCCESS_STATUS && !(data.next === null) && handleNextSite() }}>Next</button>
            </div>
        </>
    );
}

export default List;