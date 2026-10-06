export const matchesProperty = (property, filters) => {
    if (filters.type && filters.type !== "all" && property.type !== filters.type) return false;
    if (filters.status && filters.status !== "all" && property.status !== filters.status) return false;
    const location = filters.location?.trim().toLowerCase();
    if (location && !property.location?.toLowerCase().includes(location)) return false;
    const range = filters.priceRange;
    if (range && range !== "all") {
        const match = /^(\d+)(?:-(\d+)|(\+))$/.exec(range);
        if (match) {
            if (property.price == null || property.price === "") return false;
            const price = Number(property.price);
            if (!Number.isFinite(price) || price < Number(match[1])) return false;
            if (match[2] && price >= Number(match[2])) return false;
        }
    }
    return true;
};
