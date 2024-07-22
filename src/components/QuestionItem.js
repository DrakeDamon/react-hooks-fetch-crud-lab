import React from "react";

function QuestionItem({ question, setQuestions }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = (answers || []).map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function handleCorrectAnswerChange(event) {
    const newCorrectIndex = parseInt(event.target.value);
    
    // Update on server
    console.log(id);
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex: newCorrectIndex }),
    })
    .then(response => response.json())
    .then((data) => {
      console.log(data);
      // Update local state
      setQuestions(prevQuestions => 
        prevQuestions.map(q => 
          q.id === id ? { ...q, correctIndex: newCorrectIndex } : q
        )
      );
    })
    .catch(error => console.error("Error:", error));
  }

  function handleDelete() {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
    .then(() => {
      setQuestions(prevQuestions => 
        prevQuestions.filter(q => q.id !== id)
      );
    })
    .catch(error => console.error("Error:", error));
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select 
          defaultValue={correctIndex} 
          onChange={handleCorrectAnswerChange}
        >
          {options}
        </select>
      </label>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
