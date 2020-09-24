import React from "react";
import cn from 'classnames'

const TaskItem = ({data, index, onCheckTask}) => {
    const {task, isCompleted, id} = data;

    const onChangeCheckbox = () => {
        onCheckTask(id)
    }



    return (
        <div className="tasks__item">
            <div className="checkbox">
                <input onChange={onChangeCheckbox} id={'task_'+id} type="checkbox" checked={isCompleted} />
                <label htmlFor={'task_'+id}>
                    <svg width="11" height="8" viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.29999 1.20001L3.79999 6.70001L1.29999 4.20001"  stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </label>
            </div>
            <p>{task}</p>
        </div>
    )
}

export default TaskItem