'use client'
export const ProducerTableInfo = () => {
  return (
    <div className="space-y-4 text-sm mt-2">
      <div>
        <h3 className="bg-green-200 px-3 py-1 rounded-t text-gray-700 font-semibold">
          Produtos & Serviços
        </h3>
        <table className="w-full text-left border-collapse">
          <tbody>
            <tr className="border border-gray-200">
              <td className="p-2">Fruta</td>
              <td className="p-2">Banana</td>
              <td className="p-2">Prata</td>
            </tr>
            <tr className="border border-gray-200">
              <td className="p-2">Café da manhã</td>
              <td className="p-2">Café da manhã</td>
              <td className="p-2"></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <h3 className="bg-green-200 px-3 py-1 rounded-t text-gray-700 font-semibold">
          Assuntos que temos interesse
        </h3>
        <table className="w-full text-left border-collapse">
          <tbody>
            <tr className="border border-gray-200">
              <td className="p-2">Mecânica</td>
              <td className="p-2">8 Peças</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
