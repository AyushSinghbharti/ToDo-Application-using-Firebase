import React, { Component } from "react";
import { SafeAreaView } from "react-native";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Animated, // Add this import
} from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import Colors from "../Colors";
import { Swipeable } from "react-native-gesture-handler";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";

class TodoListModal extends React.Component {
  state = {
    newTodo: "",
  };

  toggleTodoCompleted = (index) => {
    let list = this.props.list;
    list.todos[index].completed = !list.todos[index].completed;

    this.props.updateList(list);
  };

  addTodo = () => {
    let list = this.props.list;
    if ((this.state.newTodo !== "") && (!list.todos.some(todo => todo.title === this.state.newTodo))) {
      list.todos.push({ title: this.state.newTodo, completed: false });
      this.props.updateList(list);
    }

    this.setState({ newTodo: "" });

    // Keyboard.dismiss();
  };

  deleteTodo = (index) => {
    let list = this.props.list;
    list.todos.splice(index, 1);

    this.props.updateList(list);
  }

  renderTodo = (todo, index) => {
    return (
      <Swipeable
        renderRightActions={(_, dragX) => this.rightActions(dragX, index)}
      >
        <View style={styles.todoContainer}>
          <TouchableOpacity onPress={() => this.toggleTodoCompleted(index)}>
            <Ionicons
              name={todo.completed ? "ios-square" : "ios-square-outline"}
              size={30}
              color={Colors.gray}
              style={{
                alignItems: "center",
                justifyContent: "center",
                alignContent: "center",
              }}
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
      </Swipeable>
    );
  };

  rightActions = (dragX, index) => {
    const scale = dragX.interpolate({
        inputRange: [-100, 0],
        outputRange: [1, 0.9],
        extrapolate: "clamp",
    })

    const opacity = dragX.interpolate({
        inputRange: [-100, -20, 9],
        outputRange: [1, 0.9, 0],
        extrapolate: "clamp",
    })
    return (
      <TouchableOpacity onPress={() => this.deleteTodo(index)}>
        <Animated.View
          style={{
            opacity: opacity,
            backgroundColor: "red",
            justifyContent: "center",
            alignItems: "center",
            // paddingHorizontal: 25,
            width: 80,
            flex: 1,
          }}
        >
          <Animated.Text style={{ color: "white", fontWeight: "800", transform: [{scale}] }}>
            Delete
          </Animated.Text>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  render() {
    const list = this.props.list;
    const taskCount = list.todos.length;
    const completedCount = list.todos.filter((todo) => todo.completed).length;

    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={"padding"}>
        <SafeAreaView style={styles.container}>
          <TouchableOpacity
            style={{ position: "absolute", top: 64, right: 32, zIndex: 10 }}
            onPress={this.props.closeModal}
          >
            <AntDesign name={"close"} size={20} color={"black"} />
          </TouchableOpacity>

          <View
            style={[styles.section, styles.header, { borderColor: list.color }]}
          >
            <View>
              <Text style={styles.title}>{list.name}</Text>
              <Text style={styles.taskCount}>
                {completedCount} of {taskCount} tasks
              </Text>
            </View>
          </View>

          <View style={[styles.section, { flex: 3 }]}>
            <FlatList
              data={list.todos}
              keyExtractor={(_, index) => index.toString()}
              renderItem={({ item, index }) => this.renderTodo(item, index)}
              contentContainerStyle={{
                paddingHorizontal: 25,
                paddingVertical: 15,
              }}
              showsVerticalScrollIndicator={false}
            />
          </View>

          <View style={[styles.section, styles.footer]}>
            <TextInput
              style={[styles.input, { borderColor: list.color }]}
              onChangeText={(text) => this.setState({ newTodo: text })}
              value={this.state.newTodo}
              placeholder="Enter Task here"
            />
            <TouchableOpacity
              style={[styles.addTodo, { backgroundColor: list.color }]}
              onPress={() => this.addTodo()}
            >
              <AntDesign name={"plus"} size={30} color={"white"} />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
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

export default gestureHandlerRootHOC(TodoListModal);
