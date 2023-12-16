import React, { useEffect, useState } from "react";
import mailSvg from "./assets/mail.svg";
import womanSvg from "./assets/woman.svg";
import womanAgeSvg from "./assets/growing-up-woman.svg";
import mapSvg from "./assets/map.svg";
import phoneSvg from "./assets/phone.svg";
import padlockSvg from "./assets/padlock.svg";
import axios from "axios"
import {FaDeleteLeft } from "react-icons/fa6";
import { FcPrevious } from "react-icons/fc";
import { FcNext } from "react-icons/fc";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';


function App() {

const url = "https://randomuser.me/api/";


// data state//
const [users,setUsers] = useState({
  name: {first:"" ,last:""}
})

//getusers
const handleClick =() => {
  axios.get(url).then((res) => setUsers(res.data.results[0]))
}


const [hover,setHover ]= useState(false)

const buttonHover =(label) => {
  setHover(label)
}

//default users
useEffect (()=> {
  handleClick()
},[])



const [adduser,SetAddUser] = useState([])

const [page,setPage] = useState(1)

//pagination
const perItem = 5;
const lastIndex = perItem * page; //     5
const firstIndex =  lastIndex - perItem;  // 0
const sliceData = adduser.slice(firstIndex,lastIndex)


const prevPage = () => {
    setPage(prev => prev > 1 ? prev - 1 : prev)
}

const nextPage = () => {
  const maxPage = Math.ceil(adduser.length / perItem)
  setPage(next => next < maxPage ? next + 1 : next)
}

//adduser
const addUser = (id) => {
  const filteredData = adduser.find((item) => {
    return item.id?.value === id
  })
  if(filteredData) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong!",
    });
  }else{
    const updateUser = [...adduser,users] 
    SetAddUser(updateUser)
    localStorage.setItem("adduser",JSON.stringify(updateUser))
  }
}




//removeuser
const removeUser = (id) => {
  const filteredRemove = adduser.filter((item) => item.id?.value !== id)
  SetAddUser(filteredRemove)
  localStorage.setItem("adduser",JSON.stringify(filteredRemove))

  
  //important..
  const maxPage = Math.ceil(filteredRemove.length / perItem) 
  if(page > maxPage && maxPage) {
    setPage(maxPage)
  }
}

//getadduser localstorage
useEffect(() => {
  const localData = localStorage.getItem("adduser");
  if (localData) {
    SetAddUser(JSON.parse(localData));
  }
}, []);



const {
  name: { first, last },
  email,
  dob,
  location,
  phone,
  login,
  picture,
  id
} = users;




  return (
    <main>
      <div className="block bcg-orange">
      </div>
      <div className="block">
        <div className="container">
          <img src={picture?.large} className="user-img" />
    
          {!hover && (
            <>
          <p className="user-title">My name is {first} {last}</p>
          <p className="user-value"></p>
            </>
          )}
          {hover === "name" && (
            <>
              <p className="user-title">My name is {first} {last} </p>
              <p className="user-value">
              </p>
            </>
          )} 
             {hover === "email" && (
            <>
              <p className="user-title">My email is {email}  </p>
              <p className="user-value">
              </p>
            </>
          )} 
             {hover === "age" && (
            <>
              <p className="user-title">My age is {dob?.age}  </p>
              <p className="user-value">
              </p>
            </>
          )} 
            {hover === "street" && (
            <>
              <p className="user-title">My street is {location?.state} </p>
              <p className="user-value">
              </p>
            </>
          )}  
            {hover === "phone" && (
            <>
              <p className="user-title">My Phone is {phone} </p>
              <p className="user-value">
              </p>
            </>
          )}  
            {hover === "password" && (
            <>
              <p className="user-title">My Password is {login?.password} </p>
              <p className="user-value">
              </p>
            </>
          )}  
          <div className="values-list">
            <button className="icon" data-label="name" >
              <img src={womanSvg} alt="user" id="iconImg" onMouseOver={()=> buttonHover("name")} />
            </button>
            <button className="icon" data-label="email" >
              <img src={mailSvg} alt="mail" id="iconImg" onMouseOver={() => buttonHover("email")} />
            </button>
            <button className="icon" data-label="age">
              <img src={womanAgeSvg} alt="age" id="iconImg" onMouseOver={()=> buttonHover("age")} />
            </button>
            <button className="icon" data-label="street">
              <img src={mapSvg} alt="map" id="iconImg" onMouseOver={() => buttonHover("street")} />
            </button>
            <button className="icon" data-label="phone">
              <img src={phoneSvg} alt="phone" id="iconImg" onMouseOver={() => buttonHover("phone")}/>
            </button>
            <button className="icon" data-label="password">
              <img src={padlockSvg} alt="lock" id="iconImg" onMouseOver={() => buttonHover("password")} />
            </button>
          </div>
          <div className="btn-group">
            <button className="btn" type="button" onClick={handleClick}>
              new user
            </button>
            <button className="btn" type="button" onClick={() => addUser(id?.value)}>
              add user
            </button>
          </div>

          {/* add user */}
          { sliceData.length > 0 && (
  <table className="table table-responsive">
    <thead>
      <tr className="head-tr">
        <th className="th">Firstname</th>
        <th className="th">Email</th>
        <th className="th">Phone</th>
        <th className="th">Age</th>
        <th className="th">C</th>
      </tr>
    </thead>
    <tbody>
      {sliceData.map((user) => (
        <tr key={user.id?.value} className="body-tr">
          <td>{user.name.first}</td>
          <td>{user.email}</td>
          <td>{user.phone}</td>
          <td>{user.dob?.age}</td>
          <td>
            <FaDeleteLeft id="deleteIcon" onClick={() => removeUser(user.id?.value)}/>
          </td>
        </tr>
      ))}
    </tbody>
    <tfoot>
      <tr>
        <td colSpan="5">
          <div className="pagination">
            <FcPrevious onClick={prevPage} />
            <p>{page}</p>
            <FcNext onClick={nextPage}/>
          </div>
        </td>
      </tr>
    </tfoot>
  </table>
)
}
        </div>
      </div>
    </main>
  );
}

export default App;
