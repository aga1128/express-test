type Props = {
  result: any[];
};

export default function SQLResult({ result }: Props) {
  if (result.length === 0) return null;

  return (
    <table>
      <thead>
        <tr>
          {result[0].columns.map((column: string) => (
            <th key={column}>{column}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {result[0].values.map((row: any[], index: number) => (
          <tr key={index}>
            {row.map((value, i) => (
              <td key={i}>{value}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}