import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FaTimes, FaSlidersH } from "react-icons/fa";
import AmiNavbar from "../../components/AmiNavbar";
import AmiFooter from "../../components/AmiFooter";
import SearchBar from "../../components/SearchBar";
import PropertyCard from "../../components/PropertyCard";
import { useProperties } from "../../hooks/use-properties";
import "./AmiProperties.css";

const TYPES = ["all", "house", "apartment", "land", "commercial"];
const STATUSES = ["all", "sale", "rent"];

const AmiProperties = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [showFilters, setShowFilters] = useState(false);

    const filters = {
        type: TYPES.includes(searchParams.get("type")) ? searchParams.get("type") : "all",
        status: STATUSES.includes(searchParams.get("status")) ? searchParams.get("status") : "all",
        location: searchParams.get("location") || "",
        priceRange: searchParams.get("price") || "all",
    };
    const setFilters = (next) => {
        const values = typeof next === "function" ? next(filters) : next;
        const params = new URLSearchParams();
        if (values.type !== "all") params.set("type", values.type);
        if (values.status !== "all") params.set("status", values.status);
        if (values.location) params.set("location", values.location);
        if (values.priceRange && values.priceRange !== "all") params.set("price", values.priceRange);
        setSearchParams(params);
    };
    const { properties, loading, error, hasMore, loadMore } = useProperties(filters);

    const handleSearch = (f) => {
        setFilters({
            type: f.type || "all",
            status: f.status || "all",
            location: f.location || "",
            priceRange: f.priceRange || "all",
        });
    };

    const clearFilters = () => setFilters({ type: "all", status: "all", location: "", priceRange: "all" });

    const activeFilterCount = [
        filters.type !== "all",
        filters.status !== "all",
        !!filters.location,
        filters.priceRange !== "all",
    ].filter(Boolean).length;

    return (
        <div className="ami-page ami-properties-page">
            <AmiNavbar />

            {/* Page header */}
            <div className="ami-properties-page__header">
                <div className="ami-container">
                    <h1 className="ami-properties-page__title">
                        {filters.status === "rent" ? "Properties for Rent" :
                            filters.status === "sale" ? "Properties for Sale" :
                                "All Properties"}
                    </h1>
                    <p className="ami-properties-page__sub">
                        {filters.location ? `in ${filters.location}` : "Across Nigeria"}
                    </p>
                    <div className="ami-properties-page__search">
                        <SearchBar key={searchParams.toString()} initialFilters={filters} onSearch={handleSearch} compact />
                    </div>
                </div>
            </div>

            <div className="ami-container ami-properties-page__body">
                {/* Filter bar */}
                <div className="ami-filter-bar">
                    <div className="ami-filter-bar__left">
                        <button
                            className={`ami-filter-bar__toggle ${showFilters ? "active" : ""}`}
                            onClick={() => setShowFilters(!showFilters)}
                            aria-expanded={showFilters}
                            aria-controls="property-filter-panel"
                        >
                            <FaSlidersH />
                            Filters
                            {activeFilterCount > 0 && (
                                <span className="ami-filter-bar__count">{activeFilterCount}</span>
                            )}
                        </button>

                        {/* Type pills */}
                        <div className="ami-filter-pills">
                            {TYPES.map((t) => (
                                <button
                                    key={t}
                                    className={`ami-filter-pill ${filters.type === t ? "active" : ""}`}
                                    onClick={() => setFilters((f) => ({ ...f, type: t }))}
                                >
                                    {t === "all" ? "All Types" : t.charAt(0).toUpperCase() + t.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="ami-filter-bar__right">
                        {/* Status pills */}
                        <div className="ami-filter-pills">
                            {STATUSES.map((s) => (
                                <button
                                    key={s}
                                    className={`ami-filter-pill ${filters.status === s ? "active" : ""}`}
                                    onClick={() => setFilters((f) => ({ ...f, status: s }))}
                                >
                                    {s === "all" ? "Buy & Rent" : s === "sale" ? "For Sale" : "For Rent"}
                                </button>
                            ))}
                        </div>

                        {activeFilterCount > 0 && (
                            <button className="ami-filter-bar__clear" onClick={clearFilters}>
                                <FaTimes /> Clear
                            </button>
                        )}
                    </div>
                </div>

                {showFilters && (
                    <div id="property-filter-panel" className="ami-filter-panel">
                        <label htmlFor="filter-location">Location</label>
                        <input id="filter-location" value={filters.location} placeholder="City or neighbourhood"
                            onChange={(e) => setFilters((f) => ({ ...f, location: e.target.value }))} />
                        <p>Use the search bar above to choose a price range.</p>
                    </div>
                )}
                {error && <p role="alert" className="ami-results-error">{error} <button onClick={loadMore}>Try again</button></p>}
                {/* Results count */}
                <div className="ami-properties-page__count">
                    {loading ? "Loading..." : `${properties.length} propert${properties.length !== 1 ? "ies" : "y"} found`}
                </div>

                {/* Grid */}
                <div className="ami-properties-grid">
                    {loading && properties.length === 0
                        ? Array.from({ length: 9 }).map((_, i) => <PropertyCard key={i} skeleton />)
                        : properties.length > 0
                            ? properties.map((p) => <PropertyCard key={p.id} property={p} />)
                            : (
                                <div className="ami-properties-page__empty">
                                    <span>🏠</span>
                                    <p>{error ? "Properties are temporarily unavailable" : "No properties match your filters"}</p>
                                    <button className="ami-btn-outline" onClick={clearFilters}>Clear filters</button>
                                </div>
                            )}
                </div>

                {/* Load more */}
                {hasMore && !loading && (
                    <div className="ami-properties-page__load-more">
                        <button className="ami-btn-outline" onClick={loadMore}>
                            Load More Properties
                        </button>
                    </div>
                )}

                {loading && properties.length > 0 && (
                    <div className="ami-properties-page__load-more">
                        <div className="ami-loading-spinner" />
                    </div>
                )}
            </div>

            <AmiFooter />
        </div>
    );
};

export default AmiProperties;
