import type { Schema } from "../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { useEffect, useState } from "react";

type TaskType = Schema['Task']['type']

export function Tasks() {

    const tasksClient = generateClient<Schema>().models.Task

    const [tasks, setTasks] = useState<Array<TaskType>>([])

    useEffect(() => {
        tasksClient.observeQuery({
            authMode: 'userPool'
        }).subscribe({
            next: (data) => setTasks([...data.items])
        });
    }, []);

    function createPlace() {
        tasksClient.create({
            description: window.prompt('Task description')
        }, {
            authMode: 'userPool'
        })
    }

    return <main>
        <button onClick={createPlace}>Create Task</button>
        <h3>All tasks:</h3>
        <ul>
            {tasks.map((task) => (
                <li key={task.id}>{task.description}</li>
            ))}
        </ul>

    </main>
}