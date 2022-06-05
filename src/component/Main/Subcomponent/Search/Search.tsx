import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../../../Redux/Hooks/ReduxHooks";
import { getBookData } from "../../../../Redux/Slice/BookSlice";
import { getLangOptionData } from "../../../../Redux/Slice/LangOptionSlice";
import { IDLE_STATUS, SUCCESS_STATUS } from "../../../../Redux/Types/ReduxTypes";

import "./Search.scss";

console.log("Peter Pan")

let langOptionArr: string[] = [];
let flag = true;
const Search = () => {

    const [searchQ, setSearchQ] = useState<string>("")
    const [lan, setLang] = useState<string>("en")

    const { data, langOptionStatus } = useAppSelector((state) => state.getLangOption)

    const dispach = useAppDispatch();

    data.results?.forEach((el: any) => { !Boolean(langOptionArr.find((finEl) => finEl === el.name)) && (langOptionArr = [...langOptionArr, (el.name)]) });

    const laa = () => {
        const num = Math.ceil(data.count / 10);

        for (let i = 2; i <= num; i++) {
            dispach(getLangOptionData(`?page=${i}`))
        }
        flag = false
    }
    // console.log(flag)
    langOptionStatus === SUCCESS_STATUS && flag && laa()

    // console.log(langOptionArr)

    useEffect(() => {
        dispach(getLangOptionData(``));
    }, [])


    const handleSearch = (e: any) => {
        setSearchQ(e.target.value)
    }

    const handleSubbmit = () => {
        const prepreQuery = searchQ?.trim().replace(" ", "+")
        console.log(prepreQuery)
        dispach(getBookData(`/?search=${prepreQuery}`))
    }

    const handleClear = () => {
        dispach(getBookData(``))
        setSearchQ("")
    }

    const handleLang = (e: any) => {
        setLang(e.target.value)
    }

    const optionList = langOptionArr.map((el) => <option key={el} value={el}>{el}</option>)

    return (
        <section className="section">
            <div className="search">
                <input type="text" className="search__input" onChange={handleSearch} value={searchQ} />
                <button className="search__btn" onClick={handleSubbmit}>Search</button>
                <button className="search__btn" onClick={handleClear}>Clear</button>
            </div>
            <div className="filter">
                <p className="filter__title">Filter</p>
                <div className="filter__check">
                    <label ><input type="checkbox" className="input" />Favorites</label><br />
                    <label ><input type="checkbox" className="input" />Like</label><br />
                    <label ><input type="checkbox" className="input" />Unlike</label><br />
                </div>
                <label >Languages<br /><select className="input" onChange={handleLang} value={lan} >{optionList}</select>   </label>
                <label >Author person birth date range<br /><input type="text" className="input" />-<input type="text" className="input" /></label>
                <label >Author person death date range<br /><input type="text" className="input" />-<input type="text" className="input" /></label>

            </div>
        </section>
    );
};

export default Search;
