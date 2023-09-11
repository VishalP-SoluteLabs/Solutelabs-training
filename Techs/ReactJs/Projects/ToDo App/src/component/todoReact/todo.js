import React, { useEffect, useState } from 'react'
import './style.css'

const getLocalData = () => {
    const lists = localStorage.getItem("myToDOList")

    if(lists){
        return JSON.parse(lists);
    }else {
        return [];
    }
}

const ToDo = () => {
    const [inputData, setInputData] = useState("")
    const [items, setItems] = useState(getLocalData())
    const [isEditItem, setIsEditItem] = useState("")
    const [toggleButton, setToggleButton] = useState(false)

    const addItem = () => {
        if(!inputData){
            alert("Please Enter Something")
        }else if(inputData && toggleButton){
            setItems(
                items.map((item) => {
                    if(item.id === isEditItem){
                        return {
                            ...item, name: inputData
                        }
                    }
                    return item;
                })
            )
            
        setInputData("")
        setIsEditItem(null)
        setToggleButton(false)
        }else{
            const newInputData = {
                id: new Date().getTime().toString(),
                name: inputData
            }

            setItems([...items, newInputData])
            setInputData("")
        }
    }


    const deleteItem = (id) => {
        const updatedItem = items.filter((item) => {
            return item.id!== id;
        })
        setItems(updatedItem)
    }

    const removeAll = () => {
        setItems([]);
    }

    useEffect(() => {
        localStorage.setItem('myToDOList', JSON.stringify(items))
    })

    const editItem = (id) => {
        let editItem = items.filter((item) => {
            return item.id === id
        })

        setInputData(editItem[0].name)
        setIsEditItem(id)
        setToggleButton(true)

    }


  return (
    <>
      <div className='main-div'>
         <div className='child-div'>
            <figure>
                <img src='./images/ToDo.png' alt='Todo Logo' />
                <figcaption>Add Your List Here! ✌</figcaption>
            </figure>
              <div className='addItems'>
                <input type='text' placeholder='✍ Add Items' className='form-control' value={inputData} onChange={(e) => setInputData(e.target.value)} />
                {
                    toggleButton?(<i class="far fa-edit add-btn" onClick={addItem}></i>):(<i className='fa fa-plus add-btn' onClick={addItem}></i>)
                }
                    
              </div>
              <div className='showItems'>
              {
                items.map((item) => {
                 return (<div className='eachItem' key={item.id}>
                            <h3>{item.name}</h3>
                              <div className='todo-btn'>
                              <i class="far fa-edit add-btn" onClick={() => editItem(item.id)}></i>
                              <i class="far fa-trash-alt" onClick={() => deleteItem(item.id)}></i>
                            </div>
                         </div>)
                })
              }
              </div> 



              <div className='showItems'>
                <button className='btn effect04' data-sm-link-text='Remove All' onClick={removeAll}>
                    <span>
                      Check List
                    </span>
                </button>
              </div>
         </div>
      </div>
    </>
  )
}

export default ToDo