import { useEffect, useState, useTransition } from "react";
import type { ChangeEvent, KeyboardEvent } from 'react'

import { useAppDispatch, useAppSelector } from "../../../../Redux/Hooks/ReduxHooks";
import { getBookData, setPageNumberByAmount } from "../../../../Redux/Slice/BookSlice";
import { getLangOptionData } from "../../../../Redux/Slice/LangOptionSlice";
import { SUCCESS_STATUS } from "../../../../Redux/Types/ReduxTypes";

import "./Search.scss";

let langOptionArr: string[] = [];
let flag = true;

const Search = () => {
    const [searchQ, setSearchQ] = useState<string>("")
    const [lang, setLang] = useState<string>("every")
    const [birtgFrom, setBirtgFrom] = useState<number>(0)
    const [birtgTo, setBirtgTo] = useState<number>(0)
    const [deathFrom, setDeathFrom] = useState<number>(0)
    const [deathTo, setDeathTo] = useState<number>(0)

    const [isPending, startTransition] = useTransition();

    const dispach = useAppDispatch();

    const { data, langOptionStatus } = useAppSelector((state) => state.getLangOption);
    const { bookStatus: isLoading } = useAppSelector((state) => state.getBook);

    //get lang from api
    const langOptions = () => {
        const num = Math.ceil(data.count / 10);

        for (let i = 2; i <= num; i++) {
            dispach(getLangOptionData(`?page=${i}`))
        }
        flag = false
    }
    // add lang to array
    data.results?.forEach((el: any) => { !Boolean(langOptionArr.find((finEl) => finEl === el.name)) && (langOptionArr = [...langOptionArr, (el.name)]) });

    if ((langOptionStatus === SUCCESS_STATUS) && flag) {
        startTransition(() => {
            langOptions()
        })
    }

    // call api query
    useEffect(() => {
        dispach(getLangOptionData(``));
    }, [])

    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchQ(event.target.value)
    }

    const handleSubbmit = () => {
        const prepreQuery = searchQ?.trim().replace(" ", "+")
        dispach(setPageNumberByAmount(1))
        dispach(getBookData(`/?search=${prepreQuery}`))
    }

    const handleSubbmitKey = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.keyCode === 13) {
            const prepreQuery = searchQ?.trim().replace(" ", "+")
            dispach(setPageNumberByAmount(1))
            dispach(getBookData(`/?search=${prepreQuery}`))
        }
    }

    const handleClear = () => {
        dispach(getBookData(``))
        setSearchQ("")
    }

    const handleLang = (event: ChangeEvent<HTMLSelectElement>) => {
        setLang(event.target.value)
    }

    const handleBirthFrom = (event: ChangeEvent<HTMLInputElement>) => {
        if (Number(event.target.value) !== 0 && Number(event.target.value) <= (new Date().getFullYear()) && Number(event.target.value) >= 1) {
            setBirtgFrom(Number(event.target.value))
        } else if (Number(event.target.value) >= (new Date().getFullYear())) {
            setBirtgFrom(new Date().getFullYear() - 1)
        } else {
            setBirtgFrom(0)
        }
    }

    const handleBirthTo = (event: ChangeEvent<HTMLInputElement>) => {
        if (Number(event.target.value) !== 0 && Number(event.target.value) <= (new Date().getFullYear()) && Number(event.target.value) >= birtgFrom) {
            setBirtgTo(Number(event.target.value))
        } else if (Number(event.target.value) >= (new Date().getFullYear())) {
            setBirtgTo(new Date().getFullYear())
        } else {
            setBirtgTo(birtgFrom)
        }
    }

    const handleDeathFrom = (event: ChangeEvent<HTMLInputElement>) => {
        if (Number(event.target.value) !== 0 && Number(event.target.value) <= (new Date().getFullYear()) && Number(event.target.value) >= 1) {
            setDeathFrom(Number(event.target.value))
        } else if (Number(event.target.value) >= (new Date().getFullYear())) {
            setDeathFrom(new Date().getFullYear() - 1)
        } else {
            setDeathFrom(0)
        }
    }

    const handleDeathTo = (event: ChangeEvent<HTMLInputElement>) => {
        if (Number(event.target.value) > 0 && Number(event.target.value) <= (new Date().getFullYear()) && Number(event.target.value) >= deathFrom) {
            setDeathTo(Number(event.target.value))
        } else if (Number(event.target.value) >= (new Date().getFullYear())) {
            setDeathTo(new Date().getFullYear())
        } else {
            setDeathTo(deathFrom)
        }
    }

    const handleFilter = () => {
        let querryText = "?"

        if (lang !== "every") {
            querryText = querryText + `languages=${lang}&`
        }
        if (birtgFrom !== 0) {
            querryText = querryText + `agent_birth_date_range_min=${birtgFrom}&`
        }
        if (birtgTo !== 0) {
            querryText = querryText + `agent_birth_date_range_max=${birtgTo}&`
        }
        if (deathFrom !== 0) {
            querryText = querryText + `agent_death_date_range_min=${deathFrom}&`
        }
        if (deathTo !== 0) {
            querryText = querryText + `agent_death_date_range_max=${deathTo}&`
        }

        dispach(getBookData(querryText));
    }

    const optionList = langOptionArr.map((el) => (el !== undefined) && <option key={`${el}`} value={el}>{el}</option>)

    return (
        <section className="section">
            <div className="search">
                <input placeholder="search by title, author..." type="text" className="search__input" onKeyDown={handleSubbmitKey} onChange={handleSearch} value={searchQ} />
                <button className="search__btn search__btn--submit" onClick={handleSubbmit}>Search</button>
                <button className=" search__btn search__btn--clear" onClick={handleClear}>Clean</button>
            </div>
            <div className="filter">
                <p className="filter__title">Filter</p>

                <label >Languages<br /><select className="input input__lang" onChange={handleLang} value={lang} >  <option key="every" value="every" >----</option> {isLoading === SUCCESS_STATUS && !isPending && optionList}</select>   </label>

                <label >Author person birth date range<br /><input type="number" className="input" onChange={handleBirthFrom} value={birtgFrom} min="1" max={new Date().getFullYear() - 1} />-<input type="number" className="input" max={new Date().getFullYear()} onChange={handleBirthTo} value={birtgTo} /></label>

                <label >Author person death date range<br /><input type="number" className="input" min="1" max={new Date().getFullYear() - 1} onChange={handleDeathFrom} value={deathFrom} />-<input type="number" className="input" max={new Date().getFullYear()} onChange={handleDeathTo} value={deathTo} /></label>

                <div className="filter-btn-section">
                    <button onClick={handleFilter} className='filter-btn-section__btn filter-btn-section__btn--filter '>Filter</button>
                    <button className="filter-btn-section__btn filter-btn-section__btn--clean">Clean</button>
                </div>
            </div>
        </section>
    );
};

export default Search;
