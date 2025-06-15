import React, { useState } from "react";
import { useOrder } from "../../hooks/orderContext.jsx";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineRoundedIcon from "@mui/icons-material/RemoveCircleOutlineRounded";

export default function MenuItem({ item }) {
  const { addToCart, cart } = useOrder();
  const existing = cart.find((i) => i.id === item.id);
  const [persons, setPersons] = useState(existing?.persons || item.serves);

  const handleAdd = () => {
    addToCart(item, persons);
  };

  return (
    <div className="flex flex-row justify-between items-center p-4 bg-amber-100 rounded-lg shadow-md mb-4 gap-5">
      <img
        className="h-32 w-32 object-cover rounded-lg"
        src={item.image}
        alt={`${item.name} image`}
      />
      <div className="flex flex-col flex-grow gap-2">
        <h2 className="text-xl font-semibold">{item.name}</h2>
        <p className="text-gray-700">{item.description}</p>
        <p className="text-green-800 font-bold">Price: Rs{item.price}</p>
        <p className="text-sm text-gray-600">
          Serves {item.serves} person(s) per serving
        </p>

        <div className="flex items-center gap-2 mt-2">
          <RemoveCircleOutlineRoundedIcon
            onClick={() => setPersons((p) => Math.max(item.serves, p - 1))}
            className={`cursor-pointer ${
              persons <= item.serves
                ? "text-gray-400"
                : "text-red-600 hover:text-red-800"
            }`}
          />
          <input
            type="number"
            min={item.serves}
            value={persons}
            onChange={(e) => {
              const val = parseInt(e.target.value, 10) || item.serves;
              setPersons(Math.max(item.serves, val));
            }}
            className="w-16 text-center border rounded"
          />
          <AddCircleOutlineIcon
            onClick={() => setPersons((p) => p + 1)}
            className="text-green-600 cursor-pointer hover:text-green-800"
          />
        </div>

        <button
          onClick={handleAdd}
          className="mt-2 bg-orange-700 text-white rounded-lg px-4 py-2 hover:bg-orange-800 transition duration-300"
        >
          Add for {persons} person(s)
        </button>
      </div>
    </div>
  );
}
