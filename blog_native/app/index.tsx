import { useCallback, useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { Post } from "@/types/post";
import axios from "axios";
import BlogPost from "@/components/BlogPost";
import styles from "@/style/style";
import { useFocusEffect } from "expo-router";



export default function Index() {

  const [posts, setPosts] = useState<Post[]>([]);

  const getPosts = async () => {
    try {
      const res = await axios.get("http://127.0.0.01:8000/api/posts");

      if (res.status === 200) {
        setPosts(res.data);
      }
    } catch (error) {
      console.log(error);
      alert(error);
    }

  };


  useFocusEffect(
    useCallback(() => {
      getPosts();

    }, []),
  );


  return (
    <View style={styles.container}>
      <Text style={{ ...styles.h1, margin: 15 }}>Blog posts</Text>
      {posts.length > 0 ? <> <FlatList style={{ maxHeight: 700 }} data={posts} renderItem={({ item }) => <BlogPost post={item} />} keyExtractor={item => item.id.toString()} />
        <Text>Posts loaded: {posts.length}</Text></> : <Text>There are no posts to display.</Text>}
    </View>
  );
}
