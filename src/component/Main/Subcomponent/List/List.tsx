import './List.scss'

import star from '../../../../img/star1.png'
import starActive from '../../../../img/star1-gold.png'
import thumbUp from '../../../../img/thumb-up.png'
import thumbDown from '../../../../img/thumb-down.png'
import thumbUpActive from '../../../../img/thumb-up-active.png'
import thumbDownActive from '../../../../img/thumb-down-active.png'

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../Redux/Hooks/ReduxHooks';
import { decrementPageNumber, getBookData, incrementPageNumber, setPageNumberByAmount } from '../../../../Redux/Slice/BookSlice';
import { SUCCESS_STATUS } from '../../../../Redux/Types/ReduxTypes';

const List = () => {
    const { error, bookStatus: isLoading, data, pageNumber } = useAppSelector((state) => state.getBook)

    const dispach = useAppDispatch();

    // console.log(data)

    useEffect(() => {
        dispach(getBookData(``))
    }, [])

    const readLink = (site: any) => site.resources.map((el: any) => (el.uri.includes(".htm")) && (<a key={el.id} href={el.uri} className='button' target="_blank " rel='noreferrar'>Read</a>));

    let favArr: any[] = [];
    let thumbUpArr: any[] = [];
    let thumbDownArr: any[] = [];

    try {
        thumbUpArr = [...JSON.parse(String(window.localStorage.getItem("thumbUP")))];
        thumbDownArr = [...JSON.parse(String(window.localStorage.getItem("thumbDown")))];
        favArr = [...JSON.parse(String(window.localStorage.getItem("fav")))];
    } catch (error) {
        console.warn(error);
    }

    const handleFavBook = (e: any, id: number) => {
        if (Boolean(favArr.find((favEl) => favEl === id))) {

            e.target.src = star;

            const lastInd = favArr.findIndex((s) => s === id);
            favArr.splice(lastInd, 1);

            favArr = [...favArr];

            window.localStorage.setItem("fav", JSON.stringify(favArr));
        } else {
            e.target.src = starActive;
            favArr = [...favArr, id];

            window.localStorage.setItem("fav", JSON.stringify(favArr));
        }
    }

    const handleUp = (e: any, id: number) => {
        console.log(Boolean(thumbUpArr.find((upEl) => upEl === id)))
        console.log(Boolean(thumbDownArr.find((downEl) => downEl === id)))
        console.log(" --- ")

        if (Boolean(thumbUpArr.find((upEl) => upEl === id)) /*&& !Boolean(thumbDownArr.find((downEl) => downEl === id))*/) {

            e.target.src = thumbUp;
            const lastInd = thumbUpArr.findIndex((s) => s === id);
            thumbUpArr.splice(lastInd, 1);

            thumbUpArr = [...thumbUpArr];

            // console.log(e)
            window.localStorage.setItem("thumbUP", JSON.stringify(thumbUpArr));
        } else /*if (Boolean(thumbUpArr.find((upEl) => upEl === id)) && Boolean(thumbDownArr.find((downEl) => downEl === id)))*/ {

            e.target.src = thumbUpActive;
            thumbDownArr.filter((downEL) => { (downEL === id) && thumbDownArr.splice(thumbDownArr.indexOf(id), 1) })

            console.log(thumbDownArr.splice(thumbDownArr.indexOf(id), 1))
            console.log(thumbDownArr)
            thumbUpArr = [...thumbUpArr, id];

            // console.log(e)
            window.localStorage.setItem("thumbUP", JSON.stringify(thumbUpArr));
        }
    }

    const handleDown = (e: any, id: number) => {
        if (Boolean(thumbDownArr.find((downEl) => downEl === id))) {
            console.log(e)
            e.target.src = thumbDown;

            const lastInd = thumbDownArr.findIndex((s) => s === id);
            thumbDownArr.splice(lastInd, 1);

            thumbDownArr = [...thumbDownArr];

            window.localStorage.setItem("thumbDown", JSON.stringify(thumbDownArr));
        } else {
            console.log(e)
            e.target.src = thumbDownActive;
            thumbDownArr = [...thumbDownArr, id];

            window.localStorage.setItem("thumbDown", JSON.stringify(thumbDownArr));
        }
    }

    const handleNextSite = () => {
        dispach(incrementPageNumber())
        const ser = data.next.slice(data.next.indexOf('?'), data.next.length)
        console.log(ser)
        console.log(ser.slice(ser.lastIndexOf("=") + 1, ser.length))
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
    const numberOfSites = Math.ceil(data.count / 10)

    const tableRender = () => (isLoading === SUCCESS_STATUS) && data?.results?.map((el: any) => {
        return (
            <tr key={el.id}>
                <td>{el.title}</td>
                <td>{el?.agents[0]?.person}</td>
                <td>{readLink(el)}</td>
                {/* <td>
                    <img src={Boolean(thumbUpArr.find((upEl) => upEl === el.id)) ? thumbUpActive : thumbUp} className='img img__up' alt='thumb up' onClick={(e) => { handleUp(e, el.id) }} />
                    <img src={Boolean(thumbDownArr.find((downEl) => downEl === el.id)) ? thumbDownActive : thumbDown} className='img img__down' alt='thumb down' onClick={(e) => { handleDown(e, el.id) }} />
                </td> */}
                <td>
                    <img src={Boolean(favArr.find((favEl) => favEl === el.id)) ? starActive : star} alt='empty star' className='star' onClick={(e) => { handleFavBook(e, el.id) }} />
                </td>
            </tr>
        )
    })

    const handleSiteInput = (e: any) => {
        if (!(Number(e.target.value) <= 1) && e.target.value <= (numberOfSites)) {
            dispach(setPageNumberByAmount(Number(e.target.value)))
        } else if (e.target.value >= (numberOfSites)) {
            dispach(setPageNumberByAmount(numberOfSites))
        } else {
            dispach(setPageNumberByAmount(1))
        }
    }

    const handleSiteInputOnKeyDown = (e: any) => {
        if (e.keyCode === 13 && !(Number(e.target.value) <= 1)) {
            dispach(setPageNumberByAmount(Number(e.target.value)))
            dispach(getBookData(`?page=${e.target.value}${(data.next.slice(data.next.indexOf("&"), data.next.length - 1).length <= 10 ? "  " : data.next.slice(data.next.indexOf('&'), data.next.length))}`));
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
                        {/* <th>Opinion</th> */}
                        <th>Favourite</th>
                    </tr>
                </thead>
                <tbody>
                    {(isLoading === SUCCESS_STATUS) ? tableRender() : (<tr className='waiter'><td><div>{" "}</div></td></tr>)}
                </tbody>
            </table>
            <div className='div-pagination'>
                <button onClick={() => { isLoading === SUCCESS_STATUS && handlePrevSite() }}>Prev</button>
                <input type="number" onKeyDown={handleSiteInputOnKeyDown} onChange={handleSiteInput} value={pageNumber} max={numberOfSites} /> <span>/{numberOfSites}</span>
                <button onClick={() => { isLoading === SUCCESS_STATUS && !(data.next === null) && handleNextSite() }}>Next</button>
            </div>
        </>
    );
}

export default List;