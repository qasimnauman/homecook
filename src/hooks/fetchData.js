import { useEffect, useState } from "react";

const useMenuInfo = () => {
    const [menuInfo, setMenuInfo] = useState([]);

    useEffect(() => {
        fetch("/data/menu.json")
            .then(res => {
                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
                return res.json();
            })
            .then(data => setMenuInfo(data))
            .catch(err => console.error("Error fetching menu info:", err));
    }, []);

    return menuInfo;
};

export default useMenuInfo;
