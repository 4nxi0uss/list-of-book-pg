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
        setBirtgFrom(Number(event.target.value))
    }

    const handleBirthTo = (event: ChangeEvent<HTMLInputElement>) => {
        setBirtgTo(Number(event.target.value))
    }

    const handleDeathFrom = (event: ChangeEvent<HTMLInputElement>) => {
        setDeathFrom(Number(event.target.value))
    }

    const handleDeathTo = (event: ChangeEvent<HTMLInputElement>) => {
        setDeathTo(Number(event.target.value))
    }

    const handleFilter = () => {
        let querryText = "?"

        if (lang !== "every") {
            querryText = querryText + `languages=${lang === "every" ? "" : lang}&`
        }
        if (birtgFrom !== 0) {
            querryText = querryText + `agent_birth_date_range_min=${birtgFrom === 0 ? "" : birtgFrom}&`
        }
        if (birtgTo !== 0) {
            querryText = querryText + `agent_birth_date_range_max=${birtgTo === 0 ? "" : birtgTo}&`
        }
        if (deathFrom !== 0) {
            querryText = querryText + `agent_death_date_range_min=${deathFrom === 0 ? "" : deathFrom}&`
        }
        if (deathTo !== 0) {
            querryText = querryText + `agent_death_date_range_max=${deathTo === 0 ? "" : deathTo}&`
        }
        console.log(querryText)
        dispach(getBookData(querryText));
    }

    const handleCleanFinter = () => {
        setLang("every");
        setBirtgFrom(0);
        setBirtgTo(0);
        setDeathFrom(0);
        setDeathTo(0);
    }

    const optionList = langOptionArr.map((el) => (el !== undefined) && <option key={`${el}`} value={el}>{el}</option>)

    return (
        <section className="section">
            <div className="search">
                <input placeholder="search by title, author..." type="text" className="search__input" onKeyDown={handleSubbmitKey} onChange={handleSearch} value={searchQ} />
                <div >
                    <button className="search__btn search__btn--submit" onClick={handleSubbmit}>Search</button>
                    <button className=" search__btn search__btn--clean" onClick={handleClear}>Clean</button>
                </div>
            </div>
            <div className="filter">
                <p className="filter__title">Filter</p>

                <label >Languages<br /><select className="input input__lang" onChange={handleLang} value={lang} >  <option key="every" value="every" >----</option> {isLoading === SUCCESS_STATUS && !isPending && optionList}</select>   </label>

                <label >Author person birth date range<br /><input placeholder="from..." type="number" className="input" onFocus={(e) => { e.target.value = '' }} onChange={handleBirthFrom} value={birtgFrom} min="1" max={new Date().getFullYear() - 1} />-<input placeholder="to" type="number " className="input" max={new Date().getFullYear()} onFocus={(e) => { e.target.value = '' }} onChange={handleBirthTo} value={birtgTo} /></label>

                <label >Author person death date range<br /><input placeholder="from..." type="number" className="input" min="1" max={new Date().getFullYear() - 1} onFocus={(e) => { e.target.value = '' }} onChange={handleDeathFrom} value={deathFrom} />-<input placeholder="to" type="number" className="input" max={new Date().getFullYear()} onFocus={(e) => { e.target.value = '' }} onChange={handleDeathTo} value={deathTo} /></label>

                <div className="filter-btn-section">
                    <button className='filter-btn-section__btn filter-btn-section__btn--filter' onClick={handleFilter}>Filter</button>
                    <button className="filter-btn-section__btn filter-btn-section__btn--clean" onClick={handleCleanFinter}>Clean</button>
                </div>
            </div>
        </section>
    );
};

export default Search;
