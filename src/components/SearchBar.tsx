
import { FiSearch } from 'react-icons/fi'

export const SearchBar = () => {
  return (
    <div className="flex items-center gap-2 bg-gray-100 rounded-md px-3 py-2 mx-4 my-2">
      <FiSearch className="text-gray-400" />
      <input
        type="text"
        placeholder="Procurar AMIGOS pelo Nome ou Usuario GOOAGRO"
        className="bg-transparent outline-none text-sm w-full"
      />
    </div>
  )
}
