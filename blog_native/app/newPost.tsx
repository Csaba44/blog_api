import styles from "@/style/style";
import { Category } from "@/types/post";
import axios from "axios";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
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

  const [categories, setCategories] = useState<Category[]>([]);

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
      return alert("The content is invalid.");
    } else if (!isCategoryValid) {
      return alert("You need to select at least one category.");
    }

    try {
      const res = await axios.post("http://localhost:8000/api/posts", formData);

      if (res.status === 201) alert("Post created.");

      router.push("/");
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };

  const onCategoryPress = (category: Category): void => {
    const isInArr = formData.categories.includes(category.id);

    if (!isInArr) {
      setFormData(prev => ({
        ...prev,
        categories: [...prev.categories, category.id]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        categories: prev.categories.filter(c => c !== category.id)
      }));
    }
  };

  return (
    <>
      {categories.length > 0 ? (
        <View style={{ ...styles.container, flex: 1, alignItems: "center", justifyContent: "center" }}>
          <Text style={{ ...styles.h1, margin: 15 }}>New Post</Text>

          <View>
            <TextInput
              placeholder="Title"
              style={styles.input}
              value={formData.title}
              onChangeText={(text) =>
                setFormData((prev) => ({ ...prev, title: text }))
              }
            />

            <TextInput
              placeholder="Content"
              multiline
              numberOfLines={5}
              style={{ ...styles.textbox, marginTop: 15 }}
              value={formData.content}
              onChangeText={(text) =>
                setFormData((prev) => ({ ...prev, content: text }))
              }
            />

            <View
              style={{
                width: 300,
                marginTop: 15,
                flexDirection: "row",
                flexWrap: "wrap",
                gap: 10,
                justifyContent: "center",
              }}
            >
              {categories.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  onPress={() => onCategoryPress(category)}
                  style={{
                    width: 90,
                    paddingVertical: 8,
                    borderRadius: 5,
                    alignItems: "center",
                    backgroundColor: formData.categories.includes(category.id)
                      ? "#688d1b"
                      : "gray",
                  }}
                >
                  <Text style={{ color: "white", textAlign: "center" }}>
                    {category.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity
              onPress={createPost}
              style={{ ...styles.button, marginTop: 15 }}
            >
              <Text style={{ textAlign: "center", color: "white" }}>
                Create
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <Text>Loading...</Text>
      )}
    </>
  );
}
