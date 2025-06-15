import { useEffect, useState } from "react";

const useMenuInfo = () => {
    const [menuInfo, setMenuInfo] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("/data/menu.json");
                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
                // Optionally fetch the second API if needed
                const response = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const responseData = await response.json();
                console.log("Fetched menu info successfully", responseData);
                const data = await res.json();
                setMenuInfo(data);
            } catch (err) {
                console.error("Error fetching menu info:", err);
            }
        };
        fetchData();
    }, []);

    return menuInfo;
};

export default useMenuInfo;
