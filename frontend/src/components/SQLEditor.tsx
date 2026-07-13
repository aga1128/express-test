import React from 'react'
import { Editor, type OnMount, type BeforeMount } from "@monaco-editor/react";
import type { editor } from "monaco-editor";

type Props = {
  editorRef: React.RefObject<editor.IStandaloneCodeEditor | null>;
};

const SQLEditor = ({ editorRef }: Props) => {
  const handleEditorDidMount: OnMount = (editor) => {
    editorRef.current = editor;
  };
  const handleEditorWillMount: BeforeMount = (monaco) => {
    monaco.languages.register({ id: "simple-sql" });
    monaco.languages.setMonarchTokensProvider("simple-sql", {
      tokenizer: {
        root: [
          // SQLキーワード
          [
            /\b(SELECT|DISTINCT|FROM|WHERE|AS|JOIN|INNER|LEFT|RIGHT|FULL|OUTER|CROSS|ON|USING|GROUP|BY|HAVING|ORDER|LIMIT|OFFSET|INSERT|INTO|VALUES|UPDATE|SET|DELETE|CREATE|TABLE|VIEW|INDEX|ALTER|ADD|DROP|COLUMN|CONSTRAINT|DATABASE|SCHEMA|WITH|RECURSIVE|UNION|ALL|INTERSECT|EXCEPT|AND|OR|NOT|IN|BETWEEN|LIKE|ILIKE|IS|EXISTS|ANY|CASE|WHEN|THEN|ELSE|END|ASC|DESC)\b/i,
            "keyword",
          ],

          // 関数
          [
            /\b(COUNT|SUM|AVG|MIN|MAX|NOW|CURRENT_DATE|CURRENT_TIME|CURRENT_TIMESTAMP|COALESCE|ROUND|UPPER|LOWER|LENGTH|SUBSTRING|TRIM|CAST)\b/i,
            "function",
          ],

          // データ型
          [
            /\b(INTEGER|INT|BIGINT|SMALLINT|SERIAL|BIGSERIAL|DECIMAL|NUMERIC|REAL|DOUBLE|FLOAT|BOOLEAN|BOOL|CHAR|VARCHAR|TEXT|DATE|TIME|TIMESTAMP|JSON|JSONB|UUID)\b/i,
            "type",
          ],

          // 定数
          [
            /\b(TRUE|FALSE|NULL)\b/i,
            "constant",
          ],

          // 数値
          [/\d+/, "number"],

          // 文字列
          [/'.*?'/, "string"],

          // 識別子（テーブル名・カラム名）
          [/[a-zA-Z_][\w]*/, "identifier"],
        ],
      },
    });
    monaco.editor.defineTheme("simple-sql-theme", {
      base: "vs-dark",
      inherit: true,
      rules: [
        { token: "keyword", foreground: "569CD6" },
        { token: "function", foreground: "DCDCAA" },
        { token: "type", foreground: "4EC9B0" },
        { token: "constant", foreground: "C586C0" },
        { token: "string", foreground: "CE9178" },
        { token: "number", foreground: "B5CEA8" },
      ],
      colors: {},
    });
  }
  return (
    <Editor
      height="500px"
      defaultLanguage="simple-sql"
      defaultValue="SELECT * FROM users;"
      theme="simple-sql-theme"
      beforeMount={handleEditorWillMount}
      onMount={handleEditorDidMount}
    />
  );
}

export default SQLEditor