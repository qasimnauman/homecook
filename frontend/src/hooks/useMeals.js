import { useEffect, useState } from 'react';
import axios from 'axios';

export const useMeals = (category) => {
    const [meals, setMeals] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!category) return;
        setLoading(true);
        axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
            .then(res => setMeals(res.data.meals || []))
            .catch(() => setMeals([]))
            .finally(() => setLoading(false));
    }, [category]);

    return { meals, loading };
};