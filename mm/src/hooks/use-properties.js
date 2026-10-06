import { PUBLIC_PROPERTIES } from "../data/developments";
import { matchesProperty } from "../utils/propertyFilters";
import { useState, useEffect, useRef } from "react";
import {
    collection,
    query,
    where,
    orderBy,
    limit,
    startAfter,
    getDocs,
} from "firebase/firestore";
import { db } from "../backend/firebase.config";

const PAGE_SIZE = 9;

export const useProperties = (filters = {}) => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [hasMore, setHasMore] = useState(false);
    const [page, setPage] = useState(0);
    const cursor = useRef(null);
    const generation = useRef(0);
    const filterKey = JSON.stringify([filters.type, filters.status, filters.location, filters.priceRange]);
    const previousKey = useRef(filterKey);

    useEffect(() => {
        const requestId = ++generation.current;
        const changed = previousKey.current !== filterKey;
        previousKey.current = filterKey;
        if (changed) cursor.current = null;
        let cancelled = false;
        const fetchPage = async () => {
            setLoading(true);
            setError("");
            if (changed) setProperties([]);
            try {
                if (!db) {
                    setProperties(PUBLIC_PROPERTIES.filter((property) => matchesProperty(property, filters)));
                    setHasMore(false);
                    return;
                }
                const constraints = [orderBy("createdAt", "desc"), limit(PAGE_SIZE * 5)];
                if (cursor.current) constraints.push(startAfter(cursor.current));
                const snap = await getDocs(query(collection(db, "properties"), ...constraints));
                if (cancelled || requestId !== generation.current) return;
                const docs = snap.docs.map((d) => ({ ...d.data(), id: d.id })).filter((d) => matchesProperty(d, filters));
                const append = !changed && !!cursor.current;
                cursor.current = snap.docs.at(-1) || null;
                setProperties((prev) => append ? [...prev, ...docs] : docs);
                setHasMore(snap.docs.length === PAGE_SIZE * 5);
            } catch (err) {
                if (!cancelled) {
                    console.error("Error fetching properties:", err);
                    setProperties(PUBLIC_PROPERTIES.filter((property) => matchesProperty(property, filters)));
                    setError("Live listings are unavailable. Browse our developments below or contact our team for current availability.");
                    setHasMore(false);
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        };
        fetchPage();
        return () => { cancelled = true; };
        // Filter values are fully represented by filterKey.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterKey, page]);

    const loadMore = () => { if (!loading) setPage((value) => value + 1); };
    return { properties, loading, error, hasMore, loadMore };
};

export const useFeaturedProperties = (count = 6) => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetch = async () => {
            try {
                const q = query(
                    collection(db, "properties"),
                    where("featured", "==", true),
                    orderBy("createdAt", "desc"),
                    limit(count)
                );
                const snap = await getDocs(q);
                if (snap.empty) {
                    // fallback: just get latest
                    const fallback = query(
                        collection(db, "properties"),
                        orderBy("createdAt", "desc"),
                        limit(count)
                    );
                    const fb = await getDocs(fallback);
                    setProperties(fb.docs.map((d) => ({ id: d.id, ...d.data() })));
                } else {
                    setProperties(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
                }
            } catch (err) {
                console.error("Error fetching featured properties:", err);
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, [count]);

    return { properties, loading };
};

export const useSubmitInquiry = () => {
    const submit = async (data) => {
        const subject = `Property inquiry: ${data.propertyTitle || "AMI Smart Homes"}`;
        const body = `Name: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone || ""}\n\n${data.message || "Please send me details about this property."}\n\nProperty: ${window.location.href}`;
        window.location.href = `mailto:info@amismarthomes.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        return { success: true };
    };
    return { submit, submitting: false };
};
