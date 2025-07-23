'use client'

export const ProducerTableInfo = () => {
  // Futuramente, esses dados podem vir de uma API/backend
  // const [products, setProducts] = React.useState([]);
  // const [interests, setInterests] = React.useState([]);

  // React.useEffect(() => {
  //   // Aqui faria fetch dos dados do backend
  //   fetch('/api/producer-info')
  //     .then(res => res.json())
  //     .then(data => {
  //       setProducts(data.products);
  //       setInterests(data.interests);
  //     });
  // }, []);

  // Dados fixos para renderizar agora
  const products = [
    { TIPO: 'Fruta', CATEGORIA: 'Banana', MODALIDADE: 'Prata' },
    { TIPO: 'Café da manhã', CATEGORIA: 'Café da manhã', MODALIDADE: ' ' },
  ];

  const interests = [
    { TIPO: 'Veiculos', CATEGORIA: 'Trator', MODALIDADE: 'Campo' },
    { TIPO: 'Bioma', CATEGORIA: 'Floresta', MODALIDADE: ' ' },
  ];

  return (
    <div className="space-y-4 text-sm mt-2">
      {/* Produtos & Serviços */}
      <div>
        <h3 className="bg-green-200 px-3 py-1 rounded-t text-gray-700 font-semibold text-center">
          Produtos & Serviços
        </h3>
        <table className="w-full text-left border border-gray-300">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="p-2 border border-gray-300">TIPO</th>
              <th className="p-2 border border-gray-300">CATEGORIA</th>
              <th className="p-2 border border-gray-300">MODALIDADE</th>
            </tr>
          </thead>
          <tbody>
            {products.map(({ TIPO, CATEGORIA, MODALIDADE }, i) => (
              <tr key={i}>
                <td className="p-2 border border-gray-300">{TIPO}</td>
                <td className="p-2 border border-gray-300">{CATEGORIA}</td>
                <td className="p-2 border border-gray-300">{MODALIDADE}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Assuntos que temos interesse */}
      <div>
        <h3 className="bg-green-200 px-3 py-1 rounded-t text-gray-700 font-semibold text-center">
          Assuntos que temos interesse
        </h3>
        <table className="w-full text-left border border-gray-300">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="p-2 border border-gray-300">TIPO</th>
              <th className="p-2 border border-gray-300">CATEGORIA</th>
              <th className="p-2 border border-gray-300">MODALIDADE</th>
            </tr>
          </thead>
          <tbody>
            {interests.map(({ TIPO, CATEGORIA, MODALIDADE }, i) => (
              <tr key={i}>
                <td className="p-2 border border-gray-300">{TIPO}</td>
                <td className="p-2 border border-gray-300">{CATEGORIA}</td>
                <td className="p-2 border border-gray-300">{MODALIDADE}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
