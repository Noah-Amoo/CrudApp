import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";

import { data } from '@/data/todos'

export default function Index() {
  const [todos, setTodos] = useState(data.sort((a,b) => b.id - a.id))
  const [text, setText] = useState('')

  // CREATE
  const addTodo = () => {
    if (text.trim()) {
      const newId = todos.length > 0 ? todos[0].id + 1 : 1;
      setTodos([{ id: newId, title: text, completed: false, ...todos}])
      setText('')
    } 
  }

  // UPDATE
  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed} : todo
    ))
  }

  return (
    <SafeAreaView>
      <View>
        <Text>Edit app/index.tsx to edit this screen.</Text>
      </View>
    </SafeAreaView>
  );
}
