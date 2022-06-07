import { useEffect, useState } from "react";

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
    // const [fav, setFav] = useState<boolean>(false)
    // const [like, setLike] = useState<boolean>(false)
    // const [unLike, setUnLike] = useState<boolean>(false)

    const dispach = useAppDispatch();

    const { data, langOptionStatus } = useAppSelector((state) => state.getLangOption)

    data.results?.forEach((el: any) => { !Boolean(langOptionArr.find((finEl) => finEl === el.name)) && (langOptionArr = [...langOptionArr, (el.name)]) });

    const langOptions = () => {
        const num = Math.ceil(data.count / 10);

        for (let i = 2; i <= num; i++) {
            dispach(getLangOptionData(`?page=${i}`))
        }
        flag = false
    }
    langOptionStatus === SUCCESS_STATUS && flag && langOptions()

    useEffect(() => {
        dispach(getLangOptionData(``));
    }, [])

    const handleSearch = (e: any) => {
        setSearchQ(e.target.value)
    }

    const handleSubbmit = () => {
        const prepreQuery = searchQ?.trim().replace(" ", "+")
        console.log(prepreQuery)
        dispach(setPageNumberByAmount(1))
        dispach(getBookData(`/?search=${prepreQuery}`))

    }
    const handleSubbmitKey = (e: any) => {
        if (e.keyCode === 13) {
            const prepreQuery = searchQ?.trim().replace(" ", "+")
            // console.log(prepreQuery)
            dispach(setPageNumberByAmount(1))
            dispach(getBookData(`/?search=${prepreQuery}`))
        }
    }

    const handleClear = () => {
        dispach(getBookData(``))
        setSearchQ("")
    }

    const handleLang = (e: any) => {
        setLang(e.target.value)
    }

    const handleBirthFrom = (e: any) => {
        if (e.target.value !== 0 && e.target.value <= (new Date().getFullYear()) && e.target.value >= 1) {
            setBirtgFrom(e.target.value)
        } else if (e.target.value >= (new Date().getFullYear())) {
            setBirtgFrom(new Date().getFullYear() - 1)
        } else {
            setBirtgFrom(0)
        }
    }
    const handleBirthTo = (e: any) => {
        if (e.target.value !== 0 && e.target.value <= (new Date().getFullYear()) && e.target.value >= birtgFrom) {
            setBirtgTo(e.target.value)
        } else if (e.target.value >= (new Date().getFullYear())) {
            setBirtgTo(new Date().getFullYear())
        } else {
            setBirtgTo(birtgFrom)
        }
    }
    const handleDeathFrom = (e: any) => {
        if (e.target.value !== 0 && e.target.value <= (new Date().getFullYear()) && e.target.value >= 1) {
            setDeathFrom(e.target.value)
        } else if (e.target.value >= (new Date().getFullYear())) {
            setDeathFrom(new Date().getFullYear() - 1)
        } else {
            setDeathFrom(0)
        }
    }
    const handleDeathTo = (e: any) => {
        if (e.target.value > 0 && e.target.value <= (new Date().getFullYear()) && e.target.value >= deathFrom) {
            setDeathTo(e.target.value)
        } else if (e.target.value >= (new Date().getFullYear())) {
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

        console.log(querryText)
        dispach(getBookData(querryText));
    }

    const optionList = langOptionArr.map((el) => <option key={el} value={el}>{el}</option>)

    return (
        <section className="section">
            <div className="search">
                <input type="text" className="search__input" onKeyDown={handleSubbmitKey} onChange={handleSearch} value={searchQ} />
                <button className="search__btn" onClick={handleSubbmit}>Search</button>
                <button className="search__btn" onClick={handleClear}>Clear</button>
            </div>
            <div className="filter">
                <p className="filter__title">Filter</p>

                <label >Languages<br /><select className="input" onChange={handleLang} value={lang} ><option value="every" >----</option> {optionList}</select>   </label>

                <label >Author person birth date range<br /><input type="number" className="input" onChange={handleBirthFrom} value={birtgFrom} min="1" max={new Date().getFullYear() - 1} />-<input type="number" className="input" max={new Date().getFullYear()} onChange={handleBirthTo} value={birtgTo} /></label>

                <label >Author person death date range<br /><input type="number" className="input" min="1" max={new Date().getFullYear() - 1} onChange={handleDeathFrom} value={deathFrom} />-<input type="number" className="input" max={new Date().getFullYear()} onChange={handleDeathTo} value={deathTo} /></label>

                <div>
                    <button onClick={handleFilter}>Filter</button>
                    <button>Clean</button>
                </div>
            </div>
        </section>
    );
};

export default Search;
