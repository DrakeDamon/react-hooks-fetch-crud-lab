import { useEffect, useState } from "react";
import React from "react";
import QuestionItem from "./QuestionItem";
import QuestionForm from "./QuestionForm";
function QuestionList() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/questions')
      .then(response => response.json())
      .then(data => setQuestions(data))
      .catch(error => console.error(error));
  }, []);

  return (
    <section>
      <h1>Quiz Questions</h1>
      {/* <QuestionForm setQuestions={setQuestions} /> */}
      <ul>
        {questions.map((question) => (
          <QuestionItem key={question.id} question={question} setQuestions={setQuestions}  />
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;
