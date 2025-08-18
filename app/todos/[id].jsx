import { useLocalSearchParams } from "expo-router";
import { View, Text, StyleSheet, Pressable, TextInput } from 'react-native'

import { useState, useEffect, useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeContext } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Inter_500Medium, useFonts } from "@expo-google-fonts/inter";
import Octicons from "@expo/vector-icons/Octicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function EditScreen() {
    const { id } = useLocalSearchParams()
    const [todo, setTodo] = useState({})
    const { colorScheme, setColorScheme, theme } = useContext(ThemeContext)
    const router = useRouter()

    const [loaded, error] = useFonts({
    Inter_500Medium,
    })

    // This hook calls the fetch data to load the details of a todo based on its id
    useEffect(() => {
        const fetchData = async (id) => {
            try {
                const jsonValue = await AsyncStorage.getItem("TodoApp")
                const storageTodos = jsonValue != null ? JSON.parse(jsonValue) : null;

                if (storageTodos && storageTodos.length) {
                    const myTodo = storageTodos.find(todo => todo.id.toSTring() === id)
                    setTodo(myTodo)
                }
            } catch (e) {
                console.error(e)
            }
        }

        fetchData(id)
    }, [id])

    if (!loaded && !error) {
        return null
    }

    // Function to update or save the current version of the edited todo
    const handleSave = async () => {
        try {
            const savedTodo = { ...todo, title: todo.title }

            const jsonValue = await AsyncStorage.getItem('TodoApp')
            const storageTodos = jsonValue != null ? JSON.parse(jsonValue) : null

            if (storageTodos && storageTodos.length) {
                const otherTodos = storageTodos.filter(todo => todo.id !== savedTodo.id)
                const allTodos = [...otherTodos, savedTodo]

                await AsyncStorage.setItem('TodoApp', JSON.stringify(allTodos))
            } else {
                await AsyncStorage.setItem('TodoApp', JSON.stringify([savedTodo]))
            }

            // Takes us back to the homepage after editing the todo or saving for the first time
            router.push('/')
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <View>
            <Text>{ id }</Text>
        </View>
    )
}