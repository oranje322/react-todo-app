import React, {useState} from "react";
import './Tasks.scss'
import TaskItem from "./TaskItem";

import {useDispatch, useSelector} from "react-redux";
import {checkTask, setTasks, showAllTasks} from "../../Redux/Reducers/reducer";

const Tasks = () => {

    const [visibleInput, setVisibleInput] = useState(false)
    const [visibleAddTaskBtn, setVisibleAddTaskBtn] = useState(true)
    const [visibleSendTaskBtn, setVisibleSendTaskBtn] = useState(false)
    const [inputValue, setInputValue] = useState('')


    const dispatch = useDispatch()
    const activeListItem = useSelector(state => state.activeListItem)

    const tasksItems = useSelector(state => state.items[activeListItem].tasks)

    const isShowAllTasks = useSelector(state => state.isShowAllTasks)

    const showAllTasks = useSelector(state => state.showAllTasks)

    // const sidebarList = useSelector(state => state.items)
    //
    // const tasksLength = sidebarList.length === 0 ? false : true


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
            id: tasksItems.length,
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

    const onCheckTask = (id) => {
        const obj = {
            taskId: id,
            activeListItem
        }
        dispatch(checkTask(obj))

    }




    return (
        <div className={'todo__tasks'}>
            <div className="tasks__title">
                <h2>Покупки</h2>
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 12.0504V14.5834C0 14.8167 0.183308 15 0.41661 15H2.9496C3.05792 15 3.16624 14.9583 3.24123 14.875L12.34 5.78458L9.21542 2.66001L0.124983 11.7504C0.0416611 11.8338 0 11.9338 0 12.0504ZM14.7563 3.36825C14.8336 3.29116 14.8949 3.1996 14.9367 3.0988C14.9785 2.99801 15 2.88995 15 2.78083C15 2.6717 14.9785 2.56365 14.9367 2.46285C14.8949 2.36205 14.8336 2.27049 14.7563 2.19341L12.8066 0.24367C12.7295 0.166428 12.6379 0.105146 12.5372 0.0633343C12.4364 0.021522 12.3283 0 12.2192 0C12.1101 0 12.002 0.021522 11.9012 0.0633343C11.8004 0.105146 11.7088 0.166428 11.6318 0.24367L10.107 1.76846L13.2315 4.89304L14.7563 3.36825Z"/>
                </svg>


            </div>

            <div className="tasks__list">

                {  isShowAllTasks ? showAllTasks.map((task, index) => <TaskItem data={task} key={'task_'+ index}
                                                                               onCheckTask={onCheckTask}/>)
                    :
                    tasksItems.map((task, index) => <TaskItem data={task} key={'task_'+ index}
                                                              onCheckTask={onCheckTask}/>)}


                { visibleInput &&
                    <input onChange={ (e) => changeInputValue(e)} value={inputValue} className={'field'} type="text" placeholder={'Текст задачи'}/>
                }
            </div>
            <div className="newTask">
                { visibleAddTaskBtn &&
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
                    visibleSendTaskBtn &&
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