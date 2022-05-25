import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";

const Post = ({ post }) => {
  return (
    <View>
      <Postheader posterPic={post.profilepic} posterUsername={post.user} />
      <Image
        source={{
          uri: post.imageURL,
        }}
        style={styles.postedImage}
      />
      <PostReact />
      <PostReactions
        likes={post.likes}
        username={post.user}
        caption={post.caption}
        comments={post.comments}
      />
      <Comments posts={post} />
    </View>
  );
};

const Comments = ({ posts }) => (
  <>
    {posts.comments.map((comment, index) => (
      <View key={index} style={{ marginLeft: 10, marginTop: 5 }}>
        <Text style={{ color: "white", fontWeight: "600" }}>
          {comment.user}
          {"  "}
          <Text style={{ fontWeight: "400" }}>{comment.comment}</Text>
        </Text>
      </View>
    ))}
  </>
);

const PostReactions = ({ likes, username, caption, comments }) => (
  <View style={{ marginLeft: 10 }}>
    <Text style={{ color: "white", fontWeight: "600", marginBottom: 5 }}>
      {likes} likes
    </Text>

    <Text
      style={{
        color: "white",
        fontWeight: "700",
        marginRight: 5,
        marginBottom: 5,
      }}
    >
      {username}
      <Text style={{ fontWeight: "500" }}> {caption}</Text>
    </Text>

    <TouchableOpacity>
      {comments.length > 0 && (
        <Text style={{ color: "grey" }}>
          View {comments.length > 1 ? "all" : ""} {comments.length}
          {comments.length > 1 ? " comments" : " comment"}
        </Text>
      )}
    </TouchableOpacity>
  </View>
);

const PostReact = () => {
  const [like, setLike] = React.useState(false);
  return (
    <View style={{ flexDirection: "row", marginTop: 10, marginLeft: 10 }}>
      <View style={{ marginRight: "auto", flexDirection: "row" }}>
        <TouchableOpacity
          onPress={() => setLike(like ? false : true)}
          style={{ marginRight: 12 }}
        >
          {!like && (
            <MaterialCommunityIcons
              name="heart-outline"
              size={32}
              color="white"
            />
          )}
          {like && (
            <MaterialCommunityIcons name="heart" size={32} color="red" />
          )}
        </TouchableOpacity>

        <TouchableOpacity>
          <Image
            source={{
              uri: "https://img.icons8.com/material-outlined/60/ffffff/filled-topic.png",
            }}
            style={styles.commenticon}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={require("../../assets/dms.png")} style={styles.icon} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity>
        <Image
          source={{
            uri: "https://img.icons8.com/fluency-systems-regular/60/ffffff/bookmark-ribbon--v1.png",
          }}
          style={styles.saveicon}
        />
      </TouchableOpacity>
    </View>
  );
};

const Postheader = ({ posterPic, posterUsername }) => {
  return (
    <View style={styles.HeaderContainer}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity>
          <Image source={{ uri: posterPic }} style={styles.posterImage} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.posterUsername}>{posterUsername}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity>
        <Text style={{ color: "white", fontWeight: "800", fontSize: 20 }}>
          ...
        </Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  posterImage: {
    width: 35,
    height: 35,
    borderRadius: 20,
    marginRight: 10,
  },

  posterUsername: {
    color: "white",
    fontWeight: "600",
  },

  postedImage: {
    width: "100%",
    height: 450,
    resizeMode: "cover",
  },
  icon: {
    width: 50,
    height: 50,
    resizeMode: "contain",
    marginTop: -8,
  },
  HeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 10,
    margin: 10,
  },
  commenticon: {
    width: 30,
    height: 30,
    resizeMode: "contain",
    marginRight: -5,
  },
  saveicon: {
    width: 30,
    height: 30,
    resizeMode: "contain",
    marginRight: 15,
  },
});
export default Post;
