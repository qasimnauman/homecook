export default function CategorySlider({
  categories,
  selectedCategory,
  onSelect,
}) {
  return (
    <div className="flex overflow-x-auto space-x-4 pb-4">
      {categories.map((cat) => (
        <button
          key={cat.idCategory}
          onClick={() => onSelect(cat.strCategory)}
          className={`flex-shrink-0 px-4 py-2 rounded-full whitespace-nowrap font-medium transition-all border ${
            selectedCategory === cat.strCategory
              ? "bg-orange-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-orange-100"
          }`}
        >
          {cat.strCategory}
        </button>
      ))}
    </div>
  );
}
