export const SortSelector = () => {
  return (
    <div className="px-4 text-sm text-gray-500">
      <select className="bg-white border border-green-400 rounded-md px-2 py-1 shadow-sm">
        <option>Mais recentes</option>
        <option>Mais relevantes</option>
        <option>Nome (A-Z)</option>
        <option>Nome (Z-A)</option>
      </select>
    </div>
  )
}
