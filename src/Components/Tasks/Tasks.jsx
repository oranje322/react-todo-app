import React, {useEffect, useState} from "react";
import './Tasks.scss'
import TaskItem from "./TaskItem";

import {useDispatch, useSelector} from "react-redux";
import {checkTask, deleteTask, editItemList, editTask, setTasks} from "../../Redux/Reducers/reducer";
import EmptyTasks from "./EmptyTasks";

const Tasks = () => {

    const [visibleInput, setVisibleInput] = useState(false)
    const [visibleAddTaskBtn, setVisibleAddTaskBtn] = useState(true)
    const [visibleSendTaskBtn, setVisibleSendTaskBtn] = useState(false)
    const [inputValue, setInputValue] = useState('')


    const dispatch = useDispatch()


    const activeListItem = useSelector(state => state.activeListItem)

    const isShowAllTasks = useSelector(state => state.isShowAllTasks)
    const allTasks = useSelector(state => state.showAllTasks)
    const sidebarList = useSelector(state => state.items)


    const tasksList = sidebarList[activeListItem] ? sidebarList[activeListItem].tasks : []
    const titleName = sidebarList[activeListItem] ? sidebarList[activeListItem].name : 'Задачи отсутствуют'

    const [titleNameInput, setTitleNameInput] = useState(titleName)
    const [visibleTitleNameInput, setVisibleTitleNameInput] = useState(false)

    useEffect(() => {
        setTitleNameInput(titleName)
    }, [titleName])


    const changeInputValue = (e) => {
        setInputValue(e.target.value)
    }

    const onClickAddTask = (obj) => {
        setVisibleInput(true)
        setVisibleAddTaskBtn(false)
        setVisibleSendTaskBtn(true)
    }

    const clickToDispatch = () => {
        if(inputValue === '') {
            alert('Заполните инпут')
            return
        }
        const obj = {
            listItem: activeListItem,
            id: tasksList.length,
            task: inputValue,
            isCompleted: false
        }
        dispatch(setTasks(obj))

        setVisibleSendTaskBtn(false)
        setVisibleAddTaskBtn(true)
        setVisibleInput(false)
        setInputValue('')

    }

    const onClickCloseBtn = () => {
        setVisibleSendTaskBtn(false)
        setVisibleAddTaskBtn(true)
        setVisibleInput(false)
    }

    const onCheckTask = (zxc) => {
        const obj = {
            taskId: zxc.id,
            activeListItem,
            wasRender: zxc.wasRender
        }
        dispatch(checkTask(obj))

    }

    const onDeleteTaskItem = (payload) => {

        dispatch(deleteTask(payload))
    }

    const onEditTask = payload => {
        dispatch(editTask(payload))
    }

    const onChangeTitleName = (e) => {
        setTitleNameInput(e.target.value)
    }

    const openTitleNameInput = () => {
        setVisibleTitleNameInput(true)
    }

    const sendTitleNameInputToRedux = () => {
        const payload = {
            id: sidebarList[activeListItem].id,
            name: titleNameInput,
            color: sidebarList[activeListItem].color,
            tasks: sidebarList[activeListItem].tasks
        }
        console.log(payload)

        dispatch(editItemList(payload))
        setVisibleTitleNameInput(false)
    }



    return (
        <div className={'todo__tasks'}>

            <div className="tasks__title">
                { (visibleTitleNameInput &&
                    <input value={titleNameInput} onChange={(e) => onChangeTitleName(e)} onBlur={sendTitleNameInputToRedux} className={'changeTaskInput'} autoFocus type="text"/>) ||
                <h2>{titleName}</h2>
                }
                { (activeListItem !== 0) &&
                    <div onClick={openTitleNameInput}>
                        <svg onClick={openTitleNameInput} width="15" height="15" viewBox="0 0 15 15" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M0 12.0504V14.5834C0 14.8167 0.183308 15 0.41661 15H2.9496C3.05792 15 3.16624 14.9583 3.24123 14.875L12.34 5.78458L9.21542 2.66001L0.124983 11.7504C0.0416611 11.8338 0 11.9338 0 12.0504ZM14.7563 3.36825C14.8336 3.29116 14.8949 3.1996 14.9367 3.0988C14.9785 2.99801 15 2.88995 15 2.78083C15 2.6717 14.9785 2.56365 14.9367 2.46285C14.8949 2.36205 14.8336 2.27049 14.7563 2.19341L12.8066 0.24367C12.7295 0.166428 12.6379 0.105146 12.5372 0.0633343C12.4364 0.021522 12.3283 0 12.2192 0C12.1101 0 12.002 0.021522 11.9012 0.0633343C11.8004 0.105146 11.7088 0.166428 11.6318 0.24367L10.107 1.76846L13.2315 4.89304L14.7563 3.36825Z"/>
                        </svg>
                    </div>
                }



            </div>

            <div className="tasks__list">

                {  (isShowAllTasks && allTasks.length >= 1) ? allTasks.map((task, index) => <TaskItem data={task} key={'task_'+ index}
                                                                               onCheckTask={onCheckTask} wasRender={task.listItem}
                                                                                                      onDeleteTaskItem={onDeleteTaskItem}
                                                                                                      onEditTask={onEditTask}/>) :

                    (tasksList.length >= 1) ? tasksList.map((task, index) => <TaskItem data={task} key={'task_'+ index}
                                                              onCheckTask={onCheckTask} wasRender={task.listItem}
                                                                                       onDeleteTaskItem={onDeleteTaskItem}
                                                                                       onEditTask={onEditTask}/>) :
                     <EmptyTasks/>
                }


                { (visibleInput && activeListItem !== 0) &&
                    <input onChange={ (e) => changeInputValue(e)} value={inputValue} className={'field newTaskInput'} type="text" placeholder={'Текст задачи'}/>
                }
            </div>
            <div className="newTask">
                { (visibleAddTaskBtn && sidebarList.length >1 && activeListItem !== 0) &&
                    <button onClick={onClickAddTask}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 1V15" stroke="#B4B4B4" strokeWidth="2" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                            <path d="M1 8H15" stroke="#B4B4B4" strokeWidth="2" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                        </svg>
                        <p>Новая задача</p>
                    </button>
                }
                {
                    (visibleSendTaskBtn && activeListItem !== 0) &&
                        <div className={'sendTaskBtn'}>
                            <button onClick={clickToDispatch} className={'greenBtn'}>Добавить задачу</button>
                            <button onClick={onClickCloseBtn} className={'grayBtn'}>Отмена</button>
                        </div>
                }


            </div>
        </div>
    )
}

export default Tasks