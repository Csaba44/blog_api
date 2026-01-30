import styles from "@/style/style";
import { Post } from "@/types/post";
import { formatDate } from "@/utils/formatDate";
import { Text, View } from "react-native";

type BlogPostParams = {
  post: Post
}

export default function BlogPost({ post }: BlogPostParams) {
  return <>
    <View style={{ marginTop: 20 }}>
      <Text>
        {post.categories.map(category => <View style={{ ...styles.category }}><Text>{category.name}</Text></View>)}
      </Text>
      <Text style={{ ...styles.h2, marginTop: 10 }}>{post.title}</Text>
      <Text style={{ marginTop: 20, fontSize: 16, }}>{post.content}</Text>
      <Text style={{ color: "gray" }}>{formatDate(post.created_at)}</Text>
    </View >
  </>
}