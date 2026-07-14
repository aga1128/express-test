import React, { useEffect, useRef, useState } from 'react'
import type { editor } from 'monaco-editor';
import { createDatabase } from '../../lib/database';
import SQLEditor from '../SQLEditor'
import SQLResult from '../SQLResult'

const QuestionCreate = () => {
    const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  
    const [db, setDb] = useState<any>(null);
    const [result, setResult] = useState<any[]>([]);
    const [error, setError] = useState("");

    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    useEffect(() => {
      createDatabase().then(setDb);
    }, []);

  const handleRun = () => {
    if (!db || !editorRef.current) return;

    const sql = editorRef.current.getValue();

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
              <SQLEditor editorRef={editorRef} />
            </div>
            <div className="w-1/2">
              <SQLResult result={result} />
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
            <SQLEditor editorRef={editorRef} />
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