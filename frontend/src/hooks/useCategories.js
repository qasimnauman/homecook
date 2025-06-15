import { useEffect, useState } from 'react';
import axios from 'axios';

export const useCategories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('https://www.themealdb.com/api/json/v1/1/categories.php')
            .then(res => setCategories(res.data.categories || []))
            .catch(() => setCategories([]))
            .finally(() => setLoading(false));
    }, []);

    return { categories, loading };
};