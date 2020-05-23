import React, { useState, useEffect, useRef } from "react";

export function Filters(props) {
  const [search, setSearch] = useState<string>("");
  const [starFilter, setStarFilter] = useState<number>();
  const [sortColumn, setSortColumn] = useState<string>("default");
  const [sortDirection, setSortDirection] = useState<string>("desc");
  const [resultsPerPage, setResultsPerPage] = useState<string>("10");

  const { current: onFiltersChanged } = useRef(props.onFiltersChanged);

  useEffect(() => {
    onFiltersChanged({
      search,
      starFilter,
      sortColumn,
      sortDirection,
      resultsPerPage: parseInt(resultsPerPage) || null,
    });
  }, [search, starFilter, sortColumn, sortDirection, resultsPerPage, onFiltersChanged]);

  const clearFilters = () => {
    setSearch("");
    setStarFilter(undefined);
    setSortColumn("date");
    setSortDirection("desc");
    setResultsPerPage("10");
  };

  return (
    <section className="filters">
      <div className="form-field">
        <label htmlFor="search">Search</label>
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Type a keyword..."
          value={search}
          onChange={(ev) => setSearch(ev.target.value)}
        />
      </div>

      <div className="form-field">
        <label>Stars</label>
        <div className="star-form">
          {[1, 2, 3, 4, 5].map((i) => (
            <span
              role="img"
              aria-label="star"
              onClick={() => setStarFilter(starFilter === i ? undefined : i)}
              key={i}
              className={(starFilter ?? 0) >= i ? "selected" : ""}
            >
              ⭐
            </span>
          ))}
        </div>
      </div>

      <div className="form-field">
        <label>Sort by</label>
        <div className="row">
          <select name="sortColumn" value={sortColumn} onChange={(ev) => setSortColumn(ev.target.value)}>
            <option value="default">Default</option>
            <option value="date">Date</option>
            <option value="stars">Stars</option>
            <option value="useful">Useful</option>
            <option value="funny">Funny</option>
            <option value="cool">Cool</option>
          </select>

          <select
            name="sortDirection"
            value={sortDirection}
            onChange={(ev) => setSortDirection(ev.target.value)}
            disabled={sortColumn === "default"}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>

      <div className="form-field">
        <label htmlFor="resultsPerPage">Results per page</label>
        <input
          type="number"
          name="resultsPerPage"
          id="resultsPerPage"
          value={resultsPerPage}
          onChange={(ev) => setResultsPerPage(ev.target.value)}
        />
      </div>

      <button onClick={clearFilters}>
        <span role="img" aria-label="broom">
          🔥
        </span>{" "}
        Clear filters
      </button>
    </section>
  );
}
