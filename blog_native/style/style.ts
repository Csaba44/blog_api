import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  h1: {
    fontSize: 32,
    color: "#688d1b",
  },
  h2: {
    fontSize: 24,
  },
  category: {
    backgroundColor: "#688d1b",
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginRight: 10,
    borderRadius: 5,
  },
  container: {
    padding: 10,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: "#688d1b",
    outlineWidth: 0,
    width: 300,
    paddingLeft: 5,
  },
  textbox: {
    width: 300,
    height: 150,
    borderWidth: 1,
    borderColor: "#688d1b",
    padding: 5,
  },
  button: {
    backgroundColor: "#688d1b",
    paddingHorizontal: 30,
    paddingVertical: 10,
    flex: 1,
    justifyContent: "center",
    borderRadius: 999,
  },
});

export default styles;
