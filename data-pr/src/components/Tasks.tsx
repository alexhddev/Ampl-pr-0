import type { Schema } from "../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { useEffect, useState } from "react";

type TaskType = Schema['Task']['type']



export function Tasks() {

    const tasksClient = generateClient<Schema>().models.Task

    const [tasks, setTasks] = useState<Array<TaskType>>([])

    useEffect(() => {
        tasksClient.observeQuery().subscribe({
            next: (data) => setTasks([...data.items])
        });
    }, []);

    function createPlace() {
        tasksClient.create({
            description: window.prompt('Task description')
        })
    }

    return <main>
        <button onClick={createPlace}>Create place</button>
        <h3>All places:</h3>
        <ul>
            {tasks.map((task) => (
                <li key={task.id}>{task.description}</li>
            ))}
        </ul>

    </main>
}