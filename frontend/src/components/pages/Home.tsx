import React, { useEffect, useRef,useState } from 'react'
import type { editor } from "monaco-editor";
import { createDatabase } from "../../lib/database";
import SQLEditor from '../SQLEditor'
import SQLResult from '../SQLResult'

const Home = () => {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

  const [db, setDb] = useState<any>(null);
  const [result, setResult] = useState<any[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    createDatabase().then(setDb);
  }, []);

  const handleRun = () => {
    if (!db || !editorRef.current) return;

    const sql = editorRef.current.getValue();

    try {
      const result = db.exec(sql);

      setResult(result);
      setError("");
    } catch (e) {
      setError((e as Error).message);
      setResult([]);
    }
  };

  return (
    <>
      <div className="flex justify-center">問題</div>
      {error && <p>{error}</p>}
      <button onClick={handleRun}>
        実行
      </button>
      <div className="flex w-full">
        <div className="w-1/2"><SQLEditor editorRef={editorRef} /></div>
        <div className="w-1/2"><SQLResult result={result} /></div>
      </div>

    </>
  )
}

export default Home