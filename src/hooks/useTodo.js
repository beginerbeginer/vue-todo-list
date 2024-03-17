import {ref} from 'vue';

const useTodo = () => {
  const todos = ref([]);
  const newTodo = ref('');
  const error = ref('');

  const addTodo = () => {
    console.log('addTodo', newTodo.value);
    if (validate()) {
      const todo = {
        id: todos.value.length + 1,
        title: newTodo.value,
        done: false,
      };
      todos.value.push(todo);
      newTodo.value = '';
    }
  };

  const deleteTodo = (id) => {
    console.log('deleteTodo');
    todos.value = todos.value.filter(todo => todo.id !== id);
  }

  const toggleTodo = (id) => {
    console.log('toggleTodo', id);
    todos.value = todos.value.map(todo => {
      if (todo.id === id) {
        todo.done = !todo.done;
      }
      return todo;
    });
  }

  const validate = () => {
    if (newTodo.value.trim() === '') {
      error.value = 'タスクを入力してください';
      return false
    }

    return true
  }

  const resetError = () => {
    error.value = ''
  }

  return {
    todos,
    newTodo,
    error,
    addTodo,
    deleteTodo,
    toggleTodo,
    resetError,
  };
}

export default useTodo;
