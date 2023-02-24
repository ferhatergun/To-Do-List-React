import './App.css';
import { React, useState ,useEffect} from 'react';
import {Route,Routes} from 'react-router-dom'
import Home from './companents/Home';

function App() {

  const [todolist,settodolist] =useState(JSON.parse(localStorage.getItem('todolist'))??[]); // localstorage boşşa boş dizi oluşturur eğer doluysa varolan itemleri kullanır
  const [randomtodo,setrandomtodo] =useState("")

  const randomNumber=()=> { // random olarak 200-1 arasında sayı oluşturur random todo alabilmek için
    return Math.floor(Math.random() * 200) + 1;
  }
  
   useEffect(()=>{
    const number = randomNumber()
    fetch(`https://jsonplaceholder.typicode.com/todos/${number}`) // 200-1 arasında rastgele todo getirir
      .then(response => response.json())
      .then(json => setrandomtodo(json))
      .catch(e=>console.log(" "+e))
  })
  return (
    <div className="App">
    <Routes>
      <Route path='/' element={<Home settodolist={settodolist}   todolist={todolist}  randomtodo={randomtodo}/>}></Route>
    </Routes>

    </div>
  );
}
export default App;
