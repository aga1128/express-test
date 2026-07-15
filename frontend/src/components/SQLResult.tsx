import type { QuestionType } from '../types/type';
type Props = {
  result: QuestionType["expected_result"] ;
};

const SQLResult = ({ result }: Props) => {
  return (
    <table>
      <thead>
        <tr className="border font-bold">
          {result.columns.map((column: string, index: number) => (
            <th key={`${index}-${column}`} className="px-4 py-2 bg-gray-100">{column}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {result.values.map((row, index: number) => (
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