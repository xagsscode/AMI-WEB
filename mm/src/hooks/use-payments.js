import { useState, useEffect } from "react";
import {
    collection,
    query,
    where,
    orderBy,
    getDocs,
    addDoc,
    serverTimestamp,
} from "firebase/firestore";
import { db } from "../backend/firebase.config";

export const useRevenue = () => {
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [monthlyData, setMonthlyData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetch = async () => {
            try {
                const q = query(
                    collection(db, "payments"),
                    where("status", "==", "paid"),
                    orderBy("createdAt", "desc")
                );
                const snap = await getDocs(q);
                const payments = snap.docs.map((d) => ({ id: d.id, ...d.data() }));

                // Total revenue
                const total = payments.reduce((sum, p) => sum + (p.amount || 0), 0);
                setTotalRevenue(total);

                // Group by month
                const byMonth = {};
                payments.forEach((p) => {
                    if (!p.createdAt) return;
                    const date = p.createdAt.toDate ? p.createdAt.toDate() : new Date(p.createdAt);
                    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
                    byMonth[key] = (byMonth[key] || 0) + (p.amount || 0);
                });

                const months = Object.entries(byMonth)
                    .sort(([a], [b]) => a.localeCompare(b))
                    .slice(-12)
                    .map(([month, amount]) => ({
                        month: new Date(month + "-01").toLocaleString("default", {
                            month: "short",
                            year: "2-digit",
                        }),
                        amount,
                    }));

                setMonthlyData(months);
            } catch (err) {
                console.error("Revenue fetch error:", err);
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, []);

    return { totalRevenue, monthlyData, loading };
};

export const useCreatePayment = () => {
    const create = async ({ amount, type, userId, propertyId, metadata = {} }) => {
        return addDoc(collection(db, "payments"), {
            amount,
            type, // listing_fee | featured | subscription
            status: "pending",
            userId: userId || null,
            propertyId: propertyId || null,
            metadata,
            createdAt: serverTimestamp(),
        });
    };
    return { create };
};
