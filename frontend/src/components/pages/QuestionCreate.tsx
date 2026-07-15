import React, { useEffect, useRef, useState } from 'react'
import type { editor } from 'monaco-editor';
import { createDatabase } from '../../lib/database';
import SQLEditor from '../SQLEditor'
import SQLResult from '../SQLResult'

const QuestionCreate = () => {
    const questionRef = useRef<editor.IStandaloneCodeEditor | null>(null);
    const answerRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  
    const [db, setDb] = useState<any>(null);
    const [result, setResult] = useState<any[]>([]);
    const [error, setError] = useState("");

    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");

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
    if (!db || !questionRef.current) return;

    const sql = questionRef.current.getValue();

    try {
      const result = db.exec(sql);

      setResult(result);
      console.log("result:", result);
      setError("");
    } catch (e) {
      setError((e as Error).message);
      setResult([]);
    }
  };

    const handleSubmit = () => {

    }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-1">
          <label htmlFor="title">タイトル</label>
          <input type="text" id="title" value={title} className="border" />
          <label htmlFor="description">問題</label>
          <input type="text" id="description" value={description} className="border" />
          <p>問題用テーブル</p>
          <div className="flex w-full gap-1">
            <div className="w-1/2">
              <SQLEditor editorRef={questionRef} />
            </div>
            <div className="w-1/2">
            {result && (
              <SQLResult result={result[0]} />
            )}
            </div>
          </div>
          <button
            type="button"
            onClick={handleRun}
            className="px-4 py-2 bg-red-400 rounded cursor-pointer"
          >
            デモ実行
          </button>
          <p>解答</p>
          <div>
            <SQLEditor editorRef={answerRef} />
          </div>
          <label htmlFor=""></label>
          <input type="text" className="border" />
          <label htmlFor=""></label>
          <input type="text" className="border" />
          <label htmlFor=""></label>
          <input type="text" className="border" />
        </div>
      </form>
    </>
  )
}

export default QuestionCreate