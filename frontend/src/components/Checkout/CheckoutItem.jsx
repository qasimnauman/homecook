export default function CheckoutItem({ item }) {
  const price = item.price || 500;
  const quantity = item.quantity || 1;
  const total = quantity * price;

  return (
    <div className="flex items-center justify-between bg-white p-4 rounded shadow-sm">
      <div className="flex items-center gap-4">
        <img
          src={item.strMealThumb}
          alt={item.strMeal}
          className="w-16 h-16 object-cover rounded"
        />
        <div>
          <h4 className="text-md font-semibold">{item.strMeal}</h4>
          <p className="text-sm text-gray-600">Qty: {quantity}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-sm text-gray-700">Rs {price} each</p>
        <p className="text-sm font-bold">Total: Rs {total}</p>
      </div>
    </div>
  );
}
