import React from "react";
import { SafeAreaView } from "react-native";
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    FlatList,
    KeyboardAvoidingView,
} from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import Colors from "../Colors";

export default class TodoListModal extends React.Component {
    state = {
        name: this.props.list.name,
        color: this.props.list.color,
        todos: this.props.list.todos,
    };

    renderTodo = (todo) => {
        return (
            <View style={styles.todoContainer}>
                <TouchableOpacity>
                    <Ionicons
                        name={todo.completed ? "ios-square" : "ios-square-outline"}
                        size={30}
                        color={Colors.gray}
                        style={{ alignItems: 'center', justifyContent: 'center', alignContent: 'center' }}
                    />
                </TouchableOpacity>
                <Text
                    style={[
                        styles.todo,
                        {
                            textDecorationLine: todo.completed ? "line-through" : "none",
                            color: todo.completed ? Colors.gray : Colors.black,
                        },
                    ]}
                >
                    {todo.title}
                </Text>
            </View>
        );
    };

    render() {
        const taskCount = this.state.todos.length;
        const completedCount = this.state.todos.filter(
            (todo) => todo.completed
        ).length;

        return (
            <SafeAreaView style={styles.container}>
                <TouchableOpacity
                    style={{ position: "absolute", top: 64, right: 32, zIndex: 10 }}
                    onPress={this.props.closeModal}
                >
                    <AntDesign name={"close"} size={20} color={"black"} />
                </TouchableOpacity>

                <View
                    style={[
                        styles.section,
                        styles.header,
                        { borderColor: this.state.color },
                    ]}
                >
                    <View>
                        <Text style={styles.title}>{this.state.name}</Text>
                        <Text style={styles.taskCount}>
                            {completedCount} of {taskCount} tasks
                        </Text>
                    </View>
                </View>

                <View style={[styles.section, { flex: 3 }]}>
                    <FlatList
                        data={this.state.todos}
                        keyExtractor={(item) => item.title}
                        renderItem={({ item }) => this.renderTodo(item)}
                        contentContainerStyle={{
                            paddingHorizontal: 25,
                            paddingVertical: 15,
                        }}
                        showsVerticalScrollIndicator={false}
                    />
                </View>

                <KeyboardAvoidingView
                    style={[styles.section, styles.footer]}
                    behavior={"padding"}
                >
                    <TextInput
                        style={[styles.input, { borderColor: this.state.color }]}
                    />
                    <TouchableOpacity
                        style={[styles.addTodo, { backgroundColor: this.state.color }]}
                    >
                        <AntDesign name={"plus"} size={30} color={"white"} />
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    section: {
        flex: 1,
        alignSelf: "stretch",
    },
    header: {
        justifyContent: "flex-end",
        marginLeft: 64,
        borderBottomWidth: 3,
    },
    title: {
        fontWeight: "800",
        fontSize: 30,
    },
    taskCount: {
        color: Colors.gray,
        marginTop: 2,
        marginBottom: 15,
        fontWeight: "600",
        fontSize: 18,
    },
    footer: {
        paddingHorizontal: 32,
        flexDirection: "row",
        alignItems: "center",
    },
    input: {
        flex: 1,
        height: 48,
        borderWidth: StyleSheet.hairlineWidth,
        borderBottomLeftRadius: 10,
        borderTopLeftRadius: 10,
        paddingHorizontal: 8,
    },
    addTodo: {
        height: 48,
        width: 48,
        alignItems: "center",
        justifyContent: "center",
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
    },
    todoContainer: {
        paddingVertical: 10,
        flexDirection: "row",
        alignItems: "center",
    },
    todo: {
        color: Colors.black,
        fontWeight: "700",
        fontSize: 20,
        paddingLeft: 10,
    },
});
