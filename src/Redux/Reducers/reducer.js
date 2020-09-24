const SET_ITEMS_LIST = 'SET_ITEMS_LIST'
const DELETE_ITEM_LIST = 'DELETE_ITEM_LIST'
const SET_ACTIVE_ITEM_LIST = 'SET_ACTIVE_ITEM_LIST'

const SET_TASKS = 'SET_TASKS'
const CHECK_TASK = 'CHECK_TASK'

const SHOW_ALL_TASKS = 'SHOW_ALL_TASKS'

const initialState = {
    items: [{id: 0, name: 'Покупки', color: 'green', tasks: [
            {listItem: 0, id: 0, task: 'Купить колбасы', isCompleted: true},
            {listItem: 0, id: 1, task: 'Купить молока', isCompleted: false}
        ]},
        {id: 1, name: 'Книги', color: 'orange', tasks: [
                {listItem: 1, id: 0, task: 'Прочитать Гарри Поттера', isCompleted: true}
            ]},
        {id: 2, name: 'Сериалы', color: 'red', tasks : [
                {listItem: 2, id: 0, task: 'Посмотреть House M.D.', isCompleted: false}
            ]},
        {id: 3, name: 'Учеба', color: 'blue', tasks: [
                {listItem: 3, id: 0, task: 'Выучить JS', isCompleted: true},
                {listItem: 3, id: 1, task: 'Выучить React', isCompleted: true},
            ]},
        {id: 4, name: 'Разное', color: 'indigo', tasks: [
                {listItem: 4, id: 0, task: 'Убраться в комнате', isCompleted: false},
            ]}],
    activeListItem: 0,
    isShowAllTasks: false,
    showAllTasks: []
}


export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ITEMS_LIST:
            return {
                ...state,
                items: [...state.items, action.payload]
            }
        case DELETE_ITEM_LIST: {
            let newItems = state.items.filter(obj => obj.id != action.payload)
            if(newItems.length === 0){
                newItems = [{task: []}]
            }

            return {
                ...state,
                items: newItems
            }
        }
        case SET_ACTIVE_ITEM_LIST:
            return {
                ...state,
                activeListItem: action.payload,
                isShowAllTasks: false,

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
        case CHECK_TASK:
            return {
                ...state,
                items: state.items.map(item => {
                    if(item.id !== action.payload.activeListItem) {
                        return item
                    } else {
                        const newTasksMass = item.tasks.map(task => {
                            if(task.id === action.payload.taskId) {
                                return {
                                    listItem: action.payload.activeListItem,
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
            }
        case SHOW_ALL_TASKS:
            return {
                ...state,
                isShowAllTasks: true,
                showAllTasks: [...state.items.map(task => task.tasks)].flat(),
                // activeListItem: false
            }

        default:
            return state

    }
}

export const setItemsList = (payload) => ({type: SET_ITEMS_LIST, payload})
export const deleteItemsList = payload => ({type: DELETE_ITEM_LIST, payload})
export const setActiveItemList = payload => ({type: SET_ACTIVE_ITEM_LIST, payload})

export const setTasks = (payload) => ({type:SET_TASKS, payload})
export const checkTask = (payload) => ({type:CHECK_TASK, payload})

export const showAllTasks = () => ({type:SHOW_ALL_TASKS})