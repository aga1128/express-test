import React, { useRef } from 'react'
import { useQuery } from '@tanstack/react-query';
import { useParams } from "react-router-dom";
import type { QuestionType } from '../../types/type';
import type { editor } from 'monaco-editor';
import { createDatabase } from '../../lib/database';
import SQLEditor from '../SQLEditor';
import SQLResult from '../SQLResult';

const Question = () => {
  const questionRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const { id } = useParams();
  const { data, status, isLoading, isError, error } = useQuery({
    queryKey: ["questions"],
    queryFn: async() => {
      const response = await fetch(`http://localhost:3000/questions/${id}`)
      if(!response.ok){
        throw new Error('Failed to fetch')
      } 
      const data: QuestionType = await response.json();
      await createDatabase(data.setup_sql);
      console.log(data);
      return data
    }
  })

  return (
    <>
      <div>
        {status === "pending" ? (
          <div>読み込み中...</div>
        ): (
          <div className="flex">
            <div className="w-1/2">
              <SQLEditor editorRef={questionRef} />
            </div>
            <div className="w-1/2">
              {data && (
                <SQLResult result={data.expected_result} />
              )}
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default Question