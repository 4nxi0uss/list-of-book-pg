import * as React from "react";

import "./Search.scss";

const Search = () => {
    return (
        <section className="section">
            <div className="search">
                <input type="text" className="search__input" />
                <button className="search__btn">Search</button>
            </div>
            <div className="filter">
                <p className="filter__title">Filter</p>
                <label htmlFor="">Genre<br /><input type="text" className="input" /></label>
                <label htmlFor="">Year of publication<br /><input type="number" className="input input__years" />-<input type="number" className="input input__years" /></label>
                <label htmlFor="">Book type<br /><input type="text" className="input" /></label>
                <label htmlFor="">Favorites<br /><input type="text" className="input" /></label>

            </div>
        </section>
    );
};

export default Search;
