import React, { useState } from 'react'
import contextHook from '../../Hooks/contextHook'
import { URL, sample_todo } from '../../constants'
import axios from 'axios'

const List = ({editAble}) => {
    const {todo, setTodo} = contextHook();
    const [message, setMessage] = useState();
    const delete_todo = async(id)=> {
      const config = {
        headers:{
          "authorization":`Bearer ${localStorage.getItem('token')}`
        }
      }
      console.log(id);
      try{
        const {data} = await axios.delete(URL+'todo/'+id,{
          headers:{
            authorization:`Bearer ${localStorage.getItem('token')}`
          }
        })
        setTodo((old_todo)=>{
          return old_todo.filter(todo=>todo._id!=id)
        })
        setMessage("Deleted")
      }catch({response}){
        setMessage(response.data.message);
      }
    }
  return (
    <div>
    {message}
      <table className='table'>
        <thead className=''>
          <tr>
              <th className=' px-4 py-2'>index</th>
              <th>name</th>
              <th>status</th>
              <th>operations</th>
          </tr>
        </thead>
        <tbody className=''>
          {todo.map((data, index)=>{
            console.log(data)
            return(<tr>
              <td className=' px-4 py-2'>{index+1}</td>
              <td className=' px-4 py-2'>{data.name}</td>
              <td className=' px-4 py-2'>{data.status}</td>
              <td className=' px-4 py-2'><button className=' px-3 py-1 bg-blue-500 text-white m-1'>view</button>{editAble?(<><button className=' px-3 py-1 bg-blue-500 text-white m-1'>Edit</button><button onClick={()=>{delete_todo(data._id)}} className=' px-3 py-1 bg-red-500 text-white m-1'>delete</button></>):""}</td>
          </tr>)
          })}
        </tbody>
      </table>
    </div>
  )
}

export default List
