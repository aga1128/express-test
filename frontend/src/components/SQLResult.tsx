type Props = {
  result: any[];
};

const SQLResult = ({ result }: Props) => {
  if (result.length === 0) return null;

  return (
    <table>
      <thead>
        <tr className="border font-bold">
          {result[0].columns.map((column: string, index: number) => (
            <th key={`${index}-${column}`} className="px-4 py-2 bg-gray-100">{column}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {result[0].values.map((row: any[], index: number) => (
          <tr key={index} className="border">
            {row.map((value, i) => (
              <td key={i} className="px-4 py-2">{value}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default SQLResult