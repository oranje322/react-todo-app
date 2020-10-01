const SET_ITEMS_LIST = 'SET_ITEMS_LIST'
const EDIT_ITEM_LIST = 'EDIT_ITEM_LIST'
const DELETE_ITEM_LIST = 'DELETE_ITEM_LIST'
const SET_ACTIVE_ITEM_LIST = 'SET_ACTIVE_ITEM_LIST'

const SET_TASKS = 'SET_TASKS'
const EDIT_TASK = 'EDIT_TASK'
const DELETE_TASK = 'DELETE_TASK'
const CHECK_TASK = 'CHECK_TASK'

const SHOW_ALL_TASKS = 'SHOW_ALL_TASKS'

const initialState = {
    items: [{id: 0, name: 'Все задачи', color: '', tasks: []},
        {id: 1, name: 'Покупки', color: 'green', tasks: [
            {listItem: 1, id: 0, task: 'Купить колбасы', isCompleted: true},
            {listItem: 1, id: 1, task: 'Купить молока', isCompleted: false}
        ]},
        {id: 2, name: 'Книги', color: 'orange', tasks: [
                {listItem: 2, id: 0, task: 'Прочитать Гарри Поттера', isCompleted: true}
            ]},
        {id: 3, name: 'Сериалы', color: 'red', tasks : [
                {listItem: 3, id: 0, task: 'Посмотреть House M.D.', isCompleted: false}
            ]},
        {id: 4, name: 'Учеба', color: 'blue', tasks: [
                {listItem: 4, id: 0, task: 'Выучить JS', isCompleted: true},
                {listItem: 4, id: 1, task: 'Выучить React', isCompleted: true},
            ]},
        {id: 5, name: 'Разное', color: 'indigo', tasks: [
                {listItem: 5, id: 0, task: 'Убраться в комнате', isCompleted: false},
            ]}],
    activeListItem: 1,
    isShowAllTasks: false,
    showAllTasks: [{listItem: 1, id: 0, task: "Купить колбасы", isCompleted: true},
{listItem: 1, id: 1, task: "Купить молока", isCompleted: false},
{listItem: 2, id: 0, task: "Прочитать Гарри Поттера", isCompleted: true},
{listItem: 3, id: 0, task: "Посмотреть House M.D.", isCompleted: false},
{listItem: 4, id: 0, task: "Выучить JS", isCompleted: true},
{listItem: 4, id: 1, task: "Выучить React", isCompleted: true},
{listItem: 5, id: 0, task: "Убраться в комнате", isCompleted: false}]
}


export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ITEMS_LIST:
            return {
                ...state,
                items: [...state.items, action.payload]
            }
        case EDIT_ITEM_LIST:
        return  {
            ...state,
            items: state.items.map(item => {
                    if(item.id === action.payload.id) {
                        const newItem = {
                            id: action.payload.id,
                            name: action.payload.name,
                            color: action.payload.color,
                            tasks: action.payload.tasks
                        }
                        return newItem
                    } else {
                        return item
                    }
                }
            )
        }

        case DELETE_ITEM_LIST: {
            let newItems = state.items.filter(obj => obj.id !== action.payload)


            return {
                ...state,
                items: newItems,
                showAllTasks: [...newItems.map(task => task.tasks)].flat()
            }
        }
        case SET_ACTIVE_ITEM_LIST:

            return {
                ...state,
                activeListItem: action.payload,
                isShowAllTasks: action.payload === 0 ? true : false


            }
        case SET_TASKS: {
            const oldTasksMass = [...state.items[action.payload.listItem].tasks]
            const newTasksMass = [...oldTasksMass, action.payload]

            return {
                ...state,
                items: state.items.map(item => {
                    if(item.id !== action.payload.listItem) {
                        return item
                    } else {
                        const newItem = {...item, tasks: newTasksMass};
                        return newItem
                    }
                })
            }
        }

        case EDIT_TASK: {
            const newItemsMass = state.items.map(item => {
                if (item.id !== action.payload.listItem) {
                    return item
                } else {
                    const newItem = {
                        id: item.id,
                        name: item.name,
                        color: item.color,
                        tasks: item.tasks.map(task => {
                            if(task.id === action.payload.id) {
                                const newTask = {
                                    id: action.payload.id,
                                    listItem: action.payload.listItem,
                                    isCompleted: action.payload.isCompleted,
                                    task: action.payload.task
                                }
                                return newTask
                            } else {
                                return task
                            }
                        })
                    }
                    return newItem
                }
            })

            return {
                ...state,
                items: newItemsMass,
                showAllTasks: [...newItemsMass.map(task => task.tasks)].flat()
            }
        }

        case DELETE_TASK: {

            const newItemsMass = state.items.map(item => {
                if(item.id !== action.payload.listItem) {
                    return item
                } else {
                    const newItem = {
                        id: item.id,
                        name: item.name,
                        color: item.color,
                        tasks: item.tasks.filter(task => task.id !== action.payload.id)

                    }
                    return newItem

                }
            })

            return {
                ...state,
                items: newItemsMass,
                showAllTasks: [...newItemsMass.map(task => task.tasks)].flat()
            }
        }


        case CHECK_TASK: {

            const newItemsMass = state.items.map(item => {
                if(item.id !== action.payload.wasRender) {
                    return item
                } else {
                    const newTasksMass = item.tasks.map(task => {
                        if(task.id === action.payload.taskId) {
                            return {
                                listItem: action.payload.wasRender,
                                id: task.id,
                                task: task.task,
                                isCompleted: !task.isCompleted
                            }
                        } else {
                            return task
                        }
                    })

                    const newItem =  {...item, tasks: [...newTasksMass]}

                    return newItem

                }
            })

            return {
                ...state,
                items: newItemsMass,
                showAllTasks: [...newItemsMass.map(task => task.tasks)].flat()

            }}
        case SHOW_ALL_TASKS:
            return {
                ...state,
                isShowAllTasks: true,
                showAllTasks: [...state.items.map(task => task.tasks)].flat(),
            }

        default:
            return state

    }
}

export const setItemsList = (payload) => ({type: SET_ITEMS_LIST, payload})
export const editItemList = payload => ({type: EDIT_ITEM_LIST, payload})
export const deleteItemsList = payload => ({type: DELETE_ITEM_LIST, payload})
export const setActiveItemList = payload => ({type: SET_ACTIVE_ITEM_LIST, payload})

export const setTasks = (payload) => ({type:SET_TASKS, payload})
export const editTask = payload => ({type:EDIT_TASK, payload})
export const deleteTask = payload => ({type:DELETE_TASK, payload})
export const checkTask = (payload) => ({type:CHECK_TASK, payload})

export const showAllTasks = () => ({type:SHOW_ALL_TASKS})