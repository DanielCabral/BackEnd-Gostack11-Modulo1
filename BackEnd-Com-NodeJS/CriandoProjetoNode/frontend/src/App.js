import React, {useState,useEffect} from 'react';
import api from './services/api';

//CSS's
import './App.css';

//Arquivos
import background from './assets/imagem.jpg';

//Componentes
import Header from './components/Header';


function App(){
const [projects,setProjects]=useState([]);

useEffect(()=>{
  api.get('projects')
  .then(response => {
    setProjects(response.data);
  });
},
[]);

async function handleProject() {

  const response= await api.post('projects',{
    title: `Novo projeto ${Date.now()}`,
	  owner: "Daniel Cabral"
  });
  const project=response.data;
  setProjects([...projects, project]);
}

 return  (
   <div>
    <Header title='Homepage' / >
    <img width="200" src={background} alt=""/>
      <ul>
        {projects.map(project=><li key={project.id}>{project.title}</li>)}
      </ul>
   <button onClick={handleProject}>Adicionar</button>
 </div>
 );

};
export default App;