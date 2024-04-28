import React, { useState } from "react";

export function AddTransactionForm() {
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");

  function handleSubmit(e) {
    e.preventDefault(); 

    fetch("http://localhost:3000/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        date: date,
        description: description,
        category: category,
        amount: amount
      })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
  
        console.log("Transaction added successfully:", data);
        alert("Transaction added successfully");
      })
      .catch(error => {
      
        console.error('There was a problem with the fetch operation:', error);
        alert("There was an error while adding the transaction. Please try again later.");
      });
  }

  return (
    <div className="ui segment">
      <form onSubmit={handleSubmit} className="ui form">
        <div className="inline fields">
          <input
            value={date}
            onChange={(e) => setDate(e.target.value)}
            type="date"
            name="date" />
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            type="text"
            name="description"
            placeholder="Description" />
          <input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            type="text"
            name="category"
            placeholder="Category" />
          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            type="number"
            name="amount"
            placeholder="Amount"
            step="0.01" />
        </div>
        <button className="ui button" type="submit">
          Add Transaction
        </button>
      </form>
    </div>
  );
}
export default AddTransactionForm