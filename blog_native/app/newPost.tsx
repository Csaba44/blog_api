import styles from "@/style/style";
import { Category } from "@/types/post";
import axios from "axios";
import { useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Post() {

  type FormDataType = {
    title: string,
    content: string,
    categories: number[]
  }

  const [formData, setFormData] = useState<FormDataType>({
    title: "",
    content: "",
    categories: []
  });

  const getCategories = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/categories");

      if (res.status === 200) {
        setCategories(res.data);
      }
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  const [categories, setCategories] = useState<Category[]>([]);

  useFocusEffect(
    useCallback(() => {
      getCategories();

    }, []),
  );

  const createPost = async () => {
    const isTitleValid = formData.title.trim() !== "";
    const isContentValid = formData.content.trim() !== "";
    const isCategoryValid = formData.categories.length > 0;

    if (!isTitleValid) {
      return alert("The title is invalid.");
    } else if (!isContentValid) {
      return alert("The content is invalid.")
    } else if (!isCategoryValid) {
      return alert("You need to select at least one category.")
    }

    try {
      const res = await axios.post("http://localhost:8000/api/posts", formData);

      console.log(res.data);

      if (res.status === 201) alert("Post created.");
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };

  const onCategoryPress = (category: Category): void => {
    const isInArr = formData.categories.filter((c: number) => c === category.id).length !== 0;

    if (!isInArr) {
      setFormData((prev) => {
        const cats = [...prev.categories, category.id];

        return { ...prev, categories: cats };
      })
    } else {
      setFormData((prev) => {
        const cats = prev.categories.filter((c: number) => c !== category.id);

        return { ...prev, categories: cats };
      })
    }

  };


  return <>
    {categories.length > 0 ? <View style={{ ...styles.container, flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ ...styles.h1, margin: 15 }}>New Post</Text>

      <View>
        <TextInput placeholder="Title" style={styles.input} value={formData.title} onChangeText={(text) => setFormData((prev) => ({ ...prev, title: text }))}></TextInput>
        <TextInput placeholder="Content" multiline={true} numberOfLines={5} style={{ ...styles.textbox, marginTop: 15 }} value={formData.content} onChangeText={(text) => setFormData((prev) => ({ ...prev, content: text }))}></TextInput>

        <Text style={{
          maxWidth: 300, marginTop: 15,
          flex: 4,
          marginHorizontal: "auto",
          width: 300,
        }}>
          {
            categories.map((category) => <>
              <TouchableOpacity onPress={() => onCategoryPress(category)} key={category.id} style={{ ...styles.button, maxWidth: 100, borderRadius: 5, backgroundColor: formData.categories.includes(category.id) ? "#688d1b" : "gray" }}><Text style={{ textAlign: "center", color: "white" }}>{category.name}</Text></TouchableOpacity >
            </>)
          }
        </Text>

        <TouchableOpacity onPress={createPost} style={{ ...styles.button, marginTop: 15 }}><Text style={{ textAlign: "center", color: "white" }}>Create</Text></TouchableOpacity>
      </View>
    </View > : <Text>Loading...</Text>}

  </>
}