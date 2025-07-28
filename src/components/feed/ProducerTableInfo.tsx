'use client'

export const ProducerTableInfo = () => {
  // Dados mockados com nomes reais
  const products = [
    { TIPO: 'Fruta', CATEGORIA: 'Banana', MODALIDADE: 'Prata' },
    { TIPO: 'Café da Manhã', CATEGORIA: 'Alimenento', MODALIDADE: 'Café' },
    { TIPO: ' ', CATEGORIA: ' ', MODALIDADE: ' ' },
    { TIPO: ' ', CATEGORIA: ' ', MODALIDADE: ' ' },
    { TIPO: 'Verdura', CATEGORIA: 'Alface', MODALIDADE: 'Americana' },
    { TIPO: 'Grão', CATEGORIA: 'Arroz', MODALIDADE: 'Integral' },
    { TIPO: 'Legume', CATEGORIA: 'Cenoura', MODALIDADE: 'Orgânica' },
    { TIPO: 'Fruta', CATEGORIA: 'Abacaxi', MODALIDADE: 'Pérola' },
    { TIPO: 'Laticínio', CATEGORIA: 'Leite', MODALIDADE: 'Desnatado' },
    { TIPO: 'Carne', CATEGORIA: 'Bovina', MODALIDADE: 'Angus' },
    { TIPO: 'Cereal', CATEGORIA: 'Milho', MODALIDADE: 'Doce' },
  ]

  const interests = [
    { TIPO: 'Máquina', CATEGORIA: 'Trator', MODALIDADE: 'Agrícola' },
    { TIPO: 'Insumo', CATEGORIA: 'Adubo', MODALIDADE: 'Orgânico' },
    { TIPO: 'Tecnologia', CATEGORIA: 'Irrigação', MODALIDADE: 'Automática' },
    { TIPO: 'Transporte', CATEGORIA: 'Caminhão', MODALIDADE: 'Refrigerado' },
    { TIPO: 'Serviço', CATEGORIA: 'Consultoria', MODALIDADE: 'Agronômica' },
    { TIPO: 'Equipamento', CATEGORIA: 'Drone', MODALIDADE: 'Pulverização' },
    { TIPO: 'Bioma', CATEGORIA: 'Floresta', MODALIDADE: 'Amazônica' },
    { TIPO: 'Semente', CATEGORIA: 'Soja', MODALIDADE: 'Transgênica' },
    { TIPO: 'Veículo', CATEGORIA: 'Colheitadeira', MODALIDADE: 'Automática' },
    { TIPO: 'Ferramenta', CATEGORIA: 'Roçadeira', MODALIDADE: 'Manual' },
  ]

  return (
    <div className="space-y-4 text-sm mt-2">
      {/* Produtos & Serviços */}
      <div>
        <h3 className="bg-green-200 px-3 py-1 rounded-t text-gray-700 font-semibold text-center">
          Produtos & Serviços
        </h3>
        <div className="max-h-36 overflow-y-auto scrollbar-thin scrollbar-thumb-green-600 scrollbar-track-gray-100">
          <table className="w-full text-left border border-gray-300">
            <thead>
              <tr className="bg-gray-100 text-gray-700 text-center">
                <th className="p-2 border border-gray-300">TIPO</th>
                <th className="p-2 border border-gray-300">CATEGORIA</th>
                <th className="p-2 border border-gray-300">MODALIDADE</th>
              </tr>
            </thead>
            <tbody>
              {products.map(({ TIPO, CATEGORIA, MODALIDADE }, i) => (
                <tr key={i} className="bg-green-100 text-gray-700">
                  <td className="p-2 border border-gray-300">{TIPO}</td>
                  <td className="p-2 border border-gray-300">{CATEGORIA}</td>
                  <td className="p-2 border border-gray-300">{MODALIDADE}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Assuntos que temos interesse */}
      <div>
        <h3 className="bg-green-200 px-3 py-1 rounded-t text-gray-700 font-semibold text-center">
          Assuntos que temos interesse
        </h3>
        <div className="max-h-36 overflow-y-auto scrollbar-thin scrollbar-thumb-green-600 scrollbar-track-gray-100">
          <table className="w-full text-left border border-gray-300">
            <thead>
              <tr className="bg-gray-100 text-gray-700 text-center">
                <th className="p-2 border border-gray-300">TIPO</th>
                <th className="p-2 border border-gray-300">CATEGORIA</th>
                <th className="p-2 border border-gray-300">MODALIDADE</th>
              </tr>
            </thead>
            <tbody>
              {interests.map(({ TIPO, CATEGORIA, MODALIDADE }, i) => (
                <tr key={i} className="bg-green-100 text-gray-700">
                  <td className="p-2 border border-gray-300">{TIPO}</td>
                  <td className="p-2 border border-gray-300">{CATEGORIA}</td>
                  <td className="p-2 border border-gray-300">{MODALIDADE}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
