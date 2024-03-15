<script lang="ts" setup>
import {ref} from 'vue';

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
</script>
<template>
    <div class="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-16">
        <div class="px-4 py-2">
            <h1 class="text-gray-800 font-bold text-2xl uppercase">To-Do List</h1>
        </div>
        <form class="w-full max-w-sm mx-auto px-4 py-2"
              @submit.prevent="addTodo"
        >
            <div class="flex items-center border-b-2 border-teal-500 py-2">
                <input
                    v-model="newTodo"
                    @input="resetError"
                    class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                    type="text" placeholder="Add a task">
                <button
                    class="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
                    type="submit">
                    Add
                </button>
            </div>
        </form>

        <p class="text-red-500 text-xs italic text-left pl-5" v-if="error">{{ error }}</p>

        <ul class="divide-y divide-gray-200 px-4">
            <li class="py-4" v-for="todo in todos" :key="todo.id">
                <div class="flex items-center justify-between">
                    <div class="flex items-center">
                        <input id="todo1" name="todo1" type="checkbox"
                               @change="toggleTodo(todo.id)"
                               :checked="todo.done"
                               class="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded">
                        <label for="todo1"
                               class="ml-3 block text-gray-900"
                               :class="todo.done ? 'line-through': ''">
                            <span class="text-lg font-medium">{{ todo.title }}</span>
                        </label>
                    </div>
                    <button @click="deleteTodo(todo.id)" class="bg-red-500 hover:bg-red-700 text-white font-bold">削除</button>
                </div>
            </li>
        </ul>
    </div>
</template>
