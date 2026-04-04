import { useState, useEffect, useRef } from "react";
import {
    collection,
    query,
    where,
    orderBy,
    limit,
    startAfter,
    getDocs,
    addDoc,
    serverTimestamp,
} from "firebase/firestore";
import { db } from "../backend/firebase.config";

const PAGE_SIZE = 9;

export const useProperties = (filters = {}) => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [lastDoc, setLastDoc] = useState(null);
    const [hasMore, setHasMore] = useState(true);
    const lastDocRef = useRef(null);

    const buildQuery = (cursor = null) => {
        const constraints = [];

        if (filters.type && filters.type !== "all") {
            constraints.push(where("type", "==", filters.type));
        }
        if (filters.status && filters.status !== "all") {
            constraints.push(where("status", "==", filters.status));
        }

        constraints.push(orderBy("createdAt", "desc"));
        constraints.push(limit(PAGE_SIZE));

        if (cursor) {
            constraints.push(startAfter(cursor));
        }

        return query(collection(db, "properties"), ...constraints);
    };

    // Reset and fetch fresh when filters change
    useEffect(() => {
        let cancelled = false;

        const fetch = async () => {
            setLoading(true);
            setProperties([]);
            lastDocRef.current = null;

            try {
                // Fetch all (up to PAGE_SIZE * 3 to account for client-side filtering)
                const q = query(
                    collection(db, "properties"),
                    orderBy("createdAt", "desc"),
                    limit(PAGE_SIZE * 5)
                );
                const snap = await getDocs(q);

                if (cancelled) return;

                let docs = snap.docs.map((d) => ({ id: d.id, ...d.data() }));

                // Client-side filtering — reliable regardless of Firestore indexes
                if (filters.type && filters.type !== "all") {
                    docs = docs.filter((d) => d.type === filters.type);
                }
                if (filters.status && filters.status !== "all") {
                    docs = docs.filter((d) => d.status === filters.status);
                }
                if (filters.location) {
                    docs = docs.filter((d) =>
                        d.location?.toLowerCase().includes(filters.location.toLowerCase())
                    );
                }

                setProperties(docs);
                setHasMore(false); // pagination handled by the large fetch above
            } catch (err) {
                console.error("Error fetching properties:", err);
            } finally {
                if (!cancelled) setLoading(false);
            }
        };

        fetch();
        return () => { cancelled = true; };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters.type, filters.status, filters.location]);

    const loadMore = async () => {
        if (loading || !hasMore || !lastDocRef.current) return;
        setLoading(true);
        try {
            const q = buildQuery(lastDocRef.current);
            const snap = await getDocs(q);
            let docs = snap.docs.map((d) => ({ id: d.id, ...d.data() }));

            if (filters.type && filters.type !== "all") {
                docs = docs.filter((d) => d.type === filters.type);
            }
            if (filters.status && filters.status !== "all") {
                docs = docs.filter((d) => d.status === filters.status);
            }

            setProperties((prev) => [...prev, ...docs]);
            const lastSnap = snap.docs[snap.docs.length - 1] || null;
            setLastDoc(lastSnap);
            lastDocRef.current = lastSnap;
            setHasMore(snap.docs.length === PAGE_SIZE);
        } catch (err) {
            console.error("Error loading more:", err);
        } finally {
            setLoading(false);
        }
    };

    return { properties, loading, hasMore, loadMore };
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
    const [submitting, setSubmitting] = useState(false);

    const submit = async (data) => {
        setSubmitting(true);
        try {
            await addDoc(collection(db, "inquiries"), {
                ...data,
                createdAt: serverTimestamp(),
                status: "new",
            });
            return { success: true };
        } catch (err) {
            console.error("Inquiry error:", err);
            return { success: false, error: err.message };
        } finally {
            setSubmitting(false);
        }
    };

    return { submit, submitting };
};
