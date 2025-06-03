import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [form, setForm] = useState({ title: '', ingredients: '', instructions: '', author: '' });

  useEffect(() => {
    axios.get('http://localhost:5000/recipes').then(res => setRecipes(res.data));
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await axios.post('http://localhost:5000/recipes', form);
    setRecipes([...recipes, res.data]);
    setForm({ title: '', ingredients: '', instructions: '', author: '' });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Recipe Sharing Platform</h1>
      <form onSubmit={handleSubmit} className="my-4">
        <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="block mb-2" required />
        <input name="ingredients" value={form.ingredients} onChange={handleChange} placeholder="Ingredients" className="block mb-2" required />
        <textarea name="instructions" value={form.instructions} onChange={handleChange} placeholder="Instructions" className="block mb-2" required />
        <input name="author" value={form.author} onChange={handleChange} placeholder="Author" className="block mb-2" required />
        <button type="submit">Add Recipe</button>
      </form>
      <div>
        {recipes.map((r, i) => (
          <div key={i} className="border p-2 my-2">
            <h2 className="text-xl font-semibold">{r.title}</h2>
            <p><strong>Ingredients:</strong> {r.ingredients}</p>
            <p><strong>Instructions:</strong> {r.instructions}</p>
            <p><em>By {r.author}</em></p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
