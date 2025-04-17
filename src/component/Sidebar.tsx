import React from 'react'

export default function Sidebar() {
  return (
    <div className='sidebar'>
      <input type="text" placeholder='Поиск' />
      <hr />
      <div className='sidebar-item'>Приемка</div>
      <div className='sidebar-item'>Отгрузка</div>
      <div className='sidebar-item'>Операции</div>
      <div className='sidebar-item'>Управление ресурсами</div>
      <div className='sidebar-item'>Управление двором</div>
      <div className='sidebar-item'>Настройка склада и операций</div>
      <div className='sidebar-item'>Нормативно справочная информация</div>
      <div className='sidebar-item'>Биллинг</div>
      <div className='sidebar-item'>Органайзер</div>
      <hr />
      <div className='client-description'>
        made by <a href="https://t.me/nokisssev">nokisssev</a>
      </div>
    </div>
  )
}
