import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";

const renderSortIcon = (column: string, sortBy: string, order: string) => {
    if (sortBy !== column) return <FaSort className="text-xs" />;
    if (order === "asc") return <FaSortUp className="text-xs" />;
    return <FaSortDown className="text-xs" />;
};
export default renderSortIcon