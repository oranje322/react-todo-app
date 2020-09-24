import React from 'react';
import Sidebar from "./Components/Sidebar/Sidebar";
import Tasks from "./Components/Tasks/Tasks";


function App() {
    return (
        <div className={'todo'}>
            <Sidebar/>
            <Tasks/>
        </div>
    );
}

export default App;
