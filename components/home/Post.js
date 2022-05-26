import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";
import firebase from "../../firebase";
import { useNavigation } from "@react-navigation/native";
const Post = ({ post }) => {
  const handleCommentSectionCall = () =>
    navigation.navigate("CommentSection", post);
  const navigation = useNavigation();
  return (
    <View>
      <Postheader posterPic={post.profilepic} posterUsername={post.user} />
      <ScrollView minimumZoomScale={1} maximumZoomScale={5}>
        <Image
          source={{
            uri: post.imageURL,
          }}
          style={styles.postedImage}
        />
      </ScrollView>
      <PostReact post={post} commentSectionCalled={handleCommentSectionCall} />
      <PostReactions
        likes_by_users={post.likes_by_users}
        username={post.user}
        caption={post.caption}
        comments={post.comments}
        commentSectionCalled={handleCommentSectionCall}
      />
      {/* <Comments posts={post} /> */}
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

const PostReactions = ({
  likes_by_users,
  username,
  caption,
  comments,
  commentSectionCalled,
}) => (
  <View style={{ marginLeft: 10 }}>
    <Text style={{ color: "white", fontWeight: "600", marginBottom: 5 }}>
      {likes_by_users.length} likes
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

    <TouchableOpacity onPress={commentSectionCalled}>
      {comments.length > 0 && (
        <Text style={{ color: "grey" }}>
          View{comments.length > 1 ? "all" : ""} {comments.length}
          {comments.length > 1 ? " comments" : " comment"}
        </Text>
      )}
    </TouchableOpacity>
  </View>
);

const PostReact = ({ post, commentSectionCalled }) => {
  const [like, setLike] = React.useState(false);
  const handleLikes = () => {
    setLike(like ? false : true);
    const db = firebase.firestore();
    db.collection("users")
      .doc(post.owner_email)
      .collection("posts")
      .doc(post.id)
      .update({
        likes_by_users: !like
          ? firebase.firestore.FieldValue.arrayUnion(
              firebase.auth().currentUser.email
            )
          : firebase.firestore.FieldValue.arrayRemove(
              firebase.auth().currentUser.email
            ),
      })
      .then(() => console.log("updated"))
      .catch((error) => {
        console.log("error updating likes: ", error);
      });
  };
  return (
    <View style={{ flexDirection: "row", marginTop: 10, marginLeft: 10 }}>
      <View style={{ marginRight: "auto", flexDirection: "row" }}>
        <TouchableOpacity onPress={handleLikes} style={{ marginRight: 12 }}>
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

        <TouchableOpacity onPress={commentSectionCalled}>
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
