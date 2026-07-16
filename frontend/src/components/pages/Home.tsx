import React, { useEffect, useRef,useState } from 'react'
import type { editor } from "monaco-editor";
import { createDatabase } from "../../lib/database";
import SQLEditor from '../SQLEditor'
import SQLResult from '../SQLResult'
import type { QuestionType } from '../../types/type';

const Home = () => {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

  const [db, setDb] = useState<any>(null);
  const [result, setResult] = useState<QuestionType["expected_result"][] | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    createDatabase(`
    CREATE TABLE users(
      id SERIAL PRIMARY KEY,
      name TEXT,
      department_id INTEGER,
      FOREIGN KEY(department_id) REFERENCES departments(id)
    );

    CREATE TABLE departments(
      id SERIAL PRIMARY KEY,
      name TEXT
    );

    INSERT INTO users VALUES
    (1, '田中', 1),
    (2, '佐藤', 3),
    (3, '鈴木', null);

    INSERT INTO departments VALUES
    (1, '営業課'),
    (2, '総務課'),
    (3, '情報サービス課');
  `).then(setDb);
  }, []);

  const handleRun = () => {
    if (!db || !editorRef.current) return;

    const sql = editorRef.current.getValue();

    console.log(sql);

    try {
      const result = db.exec(sql);

      setResult(result);
      console.log("result:", result);
      setError("");
    } catch (e) {
      setError((e as Error).message);
      setResult(null);
    }
  };

  return (
    <>
      <div className="flex justify-center">問題</div>
      {error && <p>{error}</p>}
      <button onClick={handleRun} className="px-4 py-2 bg-red-400 rounded cursor-pointer">
        実行
      </button>
      <div className="flex w-full gap-1">
        <div className="w-1/2">
          <SQLEditor editorRef={editorRef} />
        </div>
        <div className="w-1/2">
        {result && (
          <SQLResult table={result[0]} />
        )}
        </div>
      </div>
    </>
  )
}

export default Home