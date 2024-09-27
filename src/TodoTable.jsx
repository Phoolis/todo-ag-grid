function TodoTable({ todos }) {
    return (
    <table>
            <tbody>
                {todos.map((todo, index) => (
                    <tr key={index}>
                        <td>{todo}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default TodoTable;