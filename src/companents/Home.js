import React ,{useState ,useEffect}from 'react'

function Home({settodolist,todolist,randomtodo}) {
    const [list,setlist]=useState("")
    const [sıra,setsıra]=useState(0)
    const [ischecked,setischecked]=useState(false)
    const [uptade,setupdate]=useState("")
    const send=(e)=>{

        e.preventDefault();
        settodolist([...todolist,{ // kullanıcıdan alınan görev listeye eklendi
            userId:0,
            id:201+sıra,
            title:list,
            completed:false,
            edit:false,
        }])
        setsıra(sıra+1)
        
    }
    
    const randomtodos=()=>{ // gelen random todoyu listeye ekledik
        settodolist([...todolist, {
            userId:randomtodo.userId,
            id:randomtodo.id,
            title:randomtodo.title,
            completed:false,
            edit:false,
        }])
    }
    const handlechecked=(todo)=>{ // görevin check edip tamamlandı veya tamamlanmadı olarak değiştiriyoruz
    todo.completed = !todo.completed
    setischecked(!ischecked);
    }

    const edit=(todo)=>{ // düzenle divi açılıp kapanması için 
        todo.edit = (!todo.edit)
    }
    const uptadetodo = (todo) => (e) => {
        e.preventDefault();
        todo.title = uptade;
        setupdate(" ");
        todo.edit = false
    }
    const deletetodo=(todo)=>{
        console.log(todolist)
        var kalantodo = todolist.filter(u=>u.id !== todo.id) 
        settodolist(kalantodo)
    }
     useEffect(()=>{
        localStorage.setItem('todolist', JSON.stringify(todolist))
    },[todolist])
  return (
    <div className='kutu'>
        <h1 className='görev-listesi'>Görev Listesi</h1>
        <form onSubmit={send}>
       <div className='görev-ekle-div'>
       <input type='text' className='yazi' onChange={(e)=>setlist(e.target.value)}></input>
       <input type='submit' className='gönder' value={"Ekle"}></input> </div><br /> 
       </form>
       <input type='submit' className='rastgele' onClick={randomtodos} value={"Kararsız Mısın Tıkla Sana Özel Rastgele Görev Gelsin"}></input>
        <h2 className='görevler'>Görevler</h2>
        {
            todolist.map((todo,i,j,b)=>(
                <div key={i}>
                {
                    todo.completed ?
                    <div key={i} className='completed todo'>
                        <input type='checkbox' onChange={()=>handlechecked(todo)} checked className='tik'></input>
                        <span className='todo-ortada-kalan'>{todo.title}</span>
                        <button disabled>Düzenle</button>
                        <button disabled className='sil'>Sil</button>
                    </div> :
                    <div key={j} className='todo'>
                        <input type='checkbox' onChange={()=>handlechecked(todo)} className='tik'></input>
                        <span className='todo-ortada-kalan'>{todo.title}</span>
                        <button onClick={()=>edit(todo)}>Düzenle</button>
                        <button className='sil' onClick={()=>deletetodo(todo)}>Sil</button>

                    </div>}
                    {
                    todo.edit ?
                        <div key={b} className="editdiv">
                        <form onSubmit={uptadetodo(todo)}>
                            Yeni Giriniz  :<input type='text' className='input' onChange={(e)=>setupdate(e.target.value)}></input>
                            <input type='submit' value={"Kaydet"} className='kaydet' ></input>
                        </form>
                        </div>
                        :
                        null
                    }  
                </div>
            ))
        }
    </div>
  )
}

export default Home



  