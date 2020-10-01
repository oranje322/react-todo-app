import React, {useState} from "react";
import ListItem from "./List";
import './List.scss'
import AddNewButtonList from "./AddNewButtonList";
import {deleteItemsList, setItemsList, setActiveItemList, showAllTasks} from "../../Redux/Reducers/reducer";

import {useDispatch, useSelector} from "react-redux";

const Sidebar = () => {
    const [visiblePopup, setVisiblePop] = useState(false);


    const dispatch = useDispatch();

    const sidebarItems = useSelector(state => state.items)
    const activeListItem = useSelector(state => state.activeListItem)



    const onClickListItem = (index) => {
        dispatch(setActiveItemList(index))

    }

    const onClickAddNewFolder = () => {
        setVisiblePop(true)
    }

    const onClickClosePopup = () => {
        setVisiblePop(false)
    }

    const clickAllTasks = () => {
        dispatch(showAllTasks())
    }

    const onAddNewItemList = (obj) => {
        if(obj.name === '' || obj.color === undefined) {
            alert('Введите название папки и цвет');
            return
        }
        dispatch(setItemsList(obj))

    }

    const onDeleteItemList = (id) => {
        dispatch(deleteItemsList(id))
    }



    return (
        <div className={'todo__sidebar'}>
            <div className="list">
                <div className="list__body">
                    {
                        sidebarItems.map((list, index) => <ListItem index={index}
                                                            onClickListItem={onClickListItem}
                                                            name={list.name}
                                                            color={list.color}
                                                            id={list.id}
                                                            key={'list_'+index}
                        isActive={activeListItem === index}
                                                            onDeleteItemList={onDeleteItemList}
                                                                    clickAllTasks={clickAllTasks}/>)
                    }
                </div>
                <div className="list__footer">
                    <button onClick={onClickAddNewFolder}>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 1V11" stroke="#868686" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M1 6H11" stroke="#868686" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <p className="list__footerText">Добавить папку</p>
                    </button>

                    {
                        visiblePopup && <AddNewButtonList onClickClosePopup={onClickClosePopup} onAddNewItemList={onAddNewItemList} itemsLength={sidebarItems.length}  />
                    }



                </div>
            </div>



        </div>
    )
}

export default Sidebar