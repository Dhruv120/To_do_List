import React ,{useState,useEffect} from "react";
import "./style.css";

// ----------------------------------------------------------------------------
// Get local storage data back
const getLocalData = () =>{
  const lists = localStorage.getItem("mytodolist");

  if (lists){
    return JSON.parse(lists);
  }
  else
  {
    return [];
  }
}

// ----------------------------------------------------------------------------


const Todo = () => {

  const [inputdata, setinputdata] = useState("");
  const [items, setitems] = useState(getLocalData());
  const [isEditItem,setEditItem] = useState("");
  const [toggle, settoggle] = useState(false);

{/*----------------------------------------------------------------------------*/}

  const  addItem = () => {
    if (!inputdata)
    {
      alert('plz fill the data')
    }
    else if (inputdata && toggle)
    {
      setitems(
        items.map((curElem)=>{
            if(curElem.id === isEditItem)
            {
              return {...curElem,name:inputdata}
            }
            return curElem;
        })
      );
      setinputdata([]);
      setEditItem(null);
      settoggle(false);
    }
    else
    {
      const myNewTnputData = {
        id: new Date().getTime().toString(),
        name:inputdata,
      };
      setitems([...items,myNewTnputData]);
      setinputdata("")
    }
  }

{/*----------------------------------------------------------------------------*/}

const editItem = (index) =>{
  const item_todo_edited = items.find((curElem) => {
    return curElem.id === index;
  })
  setinputdata(item_todo_edited.name);
  setEditItem(index);
  settoggle(true);
}

{/*----------------------------------------------------------------------------*/}

const deleteItem = (index) => {
  const updatedItem = items.filter((curElem)=>{
    return curElem.id !== index;

  })

  setitems(updatedItem)
}  

{/*----------------------------------------------------------------------------*/}

const deleteAll = () =>{
  setitems([]);
}

{/*----------------------------------------------------------------------------*/}

{/*Adding to local storage*/}
// it means that after rendering items , new data will be added to local storage

useEffect(() => {
  localStorage.setItem("mytodolist",JSON.stringify(items))
}, [items])


{/*----------------------------------------------------------------------------*/}

  return (
    <div>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src="./images/logo2.png" alt="todologo" />
            <figcaption > 🟩 To Do List 🟩 </figcaption>
          </figure>

{/*----------------------------------------------------------------------------*/ }

          <div className="addItems">
            <input
              className="form-control"
              type="text"
              placeholder="✍️ Add task"
              value={inputdata}
              onChange={(event)=>setinputdata(event.target.value)}
            />
            {toggle?(<i className="far fa-edit add-btn" onClick={addItem}></i>) : (<i className="fa fa-plus add-btn" onClick={addItem}></i>) }
            
          </div>

{/*----------------------------------------------------------------------------*/ }
          <div className="showItems">

            {items.map((curElem,index) => {
              return (
                <div className="eachItem" key={curElem.id}>
                  <h3>{curElem.name}</h3>
                  <div className="todo-btn">
                    <i className="far fa-edit add-btn" onClick={() => editItem(curElem.id)}></i>
                    <i className="far fa-trash-alt add-btn" onClick={()=>deleteItem(curElem.id)}></i>
                  </div>
                </div>
              );
            })}
          
          </div>

{/*----------------------------------------------------------------------------*/ }
          <div className="showItems">
            <button onClick={deleteAll} className="btn effect04" data-sm-link-text="Remove All">
              <span>Check List</span>
            </button>
          </div>


{/*----------------------------------------------------------------------------*/ }
        </div>


      </div>
    </div>
  );
};

export default Todo;
