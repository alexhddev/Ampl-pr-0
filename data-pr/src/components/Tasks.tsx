import type { OwnerSchema } from "../../amplify/data/owner-resource";
import { generateClient } from "aws-amplify/data";
import { useEffect, useState } from "react";

type TaskType = OwnerSchema['Task']['type']

export function Tasks() {

    const tasksClient = generateClient<OwnerSchema>().models.Task

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
        <button onClick={createPlace}>Create Task</button>
        <h3>All tasks:</h3>
        <ul>
            {tasks.map((task) => (
                <li key={task.id}>{task.description}</li>
            ))}
        </ul>

    </main>
}