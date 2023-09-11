import { React, useState } from 'react'
import './style.css'
import Menu from './menuApi.js'
import MenuCard from './menuCard.js'
import Navbar from './Navbar.js'

const uniqueList = [ ...new Set(Menu.map((currElem) => {
  return currElem.category
})),
'All']

const Restaurant = () => {

  const [menuData, setMenuData] = useState(Menu)
  const [menuList, setMenuList] = useState(uniqueList)
   
  const filterItem = (category) => {
    const updatedList = Menu.filter((currElem) => {
      if(category === 'All'){
        return true;
      }
      return currElem.category === category
    })

    setMenuData(updatedList)
  }

  return (
    <>
     <Navbar filterItem = { filterItem } menuList = {menuList}/>
     <MenuCard menuData = {menuData} />      
    </>
  )
}

export default Restaurant