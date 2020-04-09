import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      id: "123",
      url: "https://github.com/josepholiveira",
      title: "Desafio ReactJS",
      techs: ["React", "Node.js"]
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id, index) {
    await api.delete(`repositories/${id}`);

    /* const repositoryIndex = repositories.findIndex(item => item.id === id);
    const newArray = repositories.map(item => item);

    newArray.splice(repositoryIndex, 1);

    setRepositories(newArray); */

    const newArray = repositories.map(item => item);
    newArray.splice(index, 1);

    setRepositories(newArray);    
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(({id, title}, index) => 
          <li key={id}> 
            {title}
            <button onClick={() => handleRemoveRepository(id, index)}>
              Remover
            </button>
          </li>
        )}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
