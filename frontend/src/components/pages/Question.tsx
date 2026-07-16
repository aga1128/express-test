import React, { useRef, useState } from 'react'
import { useQuery } from '@tanstack/react-query';
import { useParams } from "react-router-dom";
import type { QuestionType } from '../../types/type';
import type { editor } from 'monaco-editor';
import { createDatabase } from '../../lib/database';
import SQLEditor from '../SQLEditor';
import SQLResult from '../SQLResult';
import { isSameObj } from '../../lib/utils';
import type { Database, QueryExecResult } from 'sql.js';

const Question = () => {
  const answerRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const { id } = useParams();

  const [db, setDb] = useState<Database | null>(null);
  const [tables, setTables] = useState<{ tableName: string, tableData: QueryExecResult }[]>();
  const [isCorrect, setCorrect] = useState<boolean | null>(null);
  const [activeTab, setActiveTab] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState("");

  const { data, status, isLoading, isError, error } = useQuery({
    queryKey: ["questions"],
    queryFn: async() => {
      const response = await fetch(`http://localhost:3000/questions/${id}`);
      if(!response.ok){
        throw new Error('Failed to fetch');
      } 
      const data: QuestionType = await response.json();
      const initialDb = await createDatabase(data.setup_sql);
      
      const tableNames = initialDb.exec(`
        SELECT name
        FROM sqlite_master
        WHERE type = 'table'
          AND name NOT LIKE 'sqlite_%';
      `);

      const initialTables = tableNames[0].values.map((tName) => {
          const result = initialDb.exec(`SELECT * FROM "${tName}";`);
          const tableName: string = String(tName[0]);
          return {
            tableName,
            tableData: result[0],
          };
      })

      setDb(initialDb);
      setTables(initialTables);

      return data
    }
  })

  const handleAnswer = () => {
    if(!db || !answerRef.current || !data) return;
    const sql = answerRef.current.getValue();

    try {
      //初期化
      setCorrect(null);
      setErrorMessage("");

      const result = db.exec(sql);
      setCorrect(isSameObj(result[0], data.expected_result));
    } catch (e) {
      setErrorMessage((e as Error).message);
    }
  }

  return (
    <>
      <div>
        {status === "pending" ? (
          <div>読み込み中...</div>
        ): (
          <div>
            <div>{data?.title}</div>
            <div>
              {data?.description}
            </div>
            {errorMessage && <span className="text-red-400">{errorMessage}</span>}
            <div className="flex">
              <div className="w-1/2">
                <SQLEditor editorRef={answerRef} />
                <button
                  type="button"
                  onClick={handleAnswer}
                  className="px-4 py-2 rounded bg-red-400 cursor-pointer"
                >
                  解答する
                </button>
                {isCorrect != null && (
                  isCorrect ? <p>正解です</p>
                  :
                  <p>結果が一致しません</p>
                )}
              </div>
              <div className="w-1/2">
                {tables && (
                  <div className="flex border-b">
                    {tables.map((table, index) => (
                      <button
                        key={table.tableName}
                        type="button"
                        onClick={() => setActiveTab(index)}
                        className={`px-4 py-2 ${
                          activeTab === index
                            ? "border-b-2 border-blue-500 font-bold"
                            : ""
                        }`}
                      >
                        {table.tableName}
                      </button>
                    ))}
                  </div>
                )}
                {tables && (
                  <SQLResult table={tables[activeTab].tableData} />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default Question