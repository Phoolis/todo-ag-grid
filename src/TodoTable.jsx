function TodoTable({ todos }) {
    return (
    <table>
            <tbody>
                <tr>
                    <th>Date</th>
                    <th>Description</th>
                </tr>
                {todos.map((todo, index) => (
                    <tr key={index}>
                        <td>{todo.date}</td>
                        <td>{todo.description}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default TodoTable;