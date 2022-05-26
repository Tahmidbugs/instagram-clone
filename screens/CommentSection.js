import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Button,
} from "react-native";
import Post from "../components/home/Post";
import LoginScreen from "./LoginScreen";
import { Formik } from "formik";
import firebase from "../firebase";
import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";

const CommentSection = ({ route, navigation }) => {
  const [currentLoggedInUser, setCurrentLoggedInUser] = React.useState(null);

  const getUserName = () => {
    const user = firebase.auth().currentUser;
    const db = firebase.firestore();
    const unsubscribe = db
      .collection("users")
      .where("owner_uid", "==", user.uid)
      .limit(1)
      .onSnapshot((snapshot) => {
        snapshot.docs.map((doc) => {
          setCurrentLoggedInUser({
            username: doc.data().username,
            profilePicture: doc.data().profile_picture,
            name: doc.data().name,
            bio: doc.data().bio,
          });
        });
      });
    console.log("re rendered");
    return unsubscribe;
  };
  React.useEffect(() => {
    getUserName();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      {currentLoggedInUser && (
        <>
          <Header navigation={navigation} />
          <Caption post={route.params} />
          <Comments post={route.params} />
          <AddComment
            post={route.params}
            currentLoggedInUser={currentLoggedInUser}
            navigation={navigation}
          />
        </>
      )}
    </View>
  );
};

const AddComment = ({ post, currentLoggedInUser, navigation }) => {
  //   console.log(currentLoggedInUser.profilePicture);
  const UploadCommentToFirebase = (post, comment) => {
    console.log(comment);
    const obj = {
      profilePicture: currentLoggedInUser.profilePicture,
      comment: comment,
      username: currentLoggedInUser.username,
    };

    const db = firebase.firestore();

    db.collection("users")
      .doc(post.owner_email)
      .collection("posts")
      .doc(post.id)
      .update({
        comments: firebase.firestore.FieldValue.arrayUnion(obj),
      });
  };

  return (
    <View>
      <Formik
        initialValues={{ comment: "" }}
        onSubmit={(values) => {
          UploadCommentToFirebase(post, values.comment);
          navigation.replace("CommentSection", post);
        }}
        validateOnMount={true}
      >
        {({
          handleChange,
          handleSubmit,
          values,
          errors,
          isValid,
          handleBlur,
        }) => (
          <>
            <View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 20,
                  borderColor: "#222525",
                  borderTopWidth: 1,
                  height: 60,
                }}
              >
                <Image
                  source={{ uri: currentLoggedInUser.profilePicture }}
                  style={{
                    height: 40,
                    width: 40,
                    borderRadius: 20,
                    marginRight: 10,
                  }}
                />
                <View
                  style={{
                    flexDirection: "row",
                    height: 40,
                    width: "85%",
                    borderRadius: 25,
                    borderWidth: 1,
                    borderColor: "#222525",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <TextInput
                    name="comment"
                    placeholder="Add your comment"
                    autoCorrect={false}
                    autoCapitalize="none"
                    placeholderTextColor={"grey"}
                    style={{
                      color: "white",
                      fontSize: 17,
                      marginLeft: 25,
                    }}
                    onChangeText={handleChange("comment")}
                    onBlur={handleBlur("comment")}
                    value={values.comment}
                    returnKeyType="default"
                  />
                  <Text
                    onPress={handleSubmit}
                    style={{
                      fontWeight: "600",
                      color: "#3C535E",
                      marginRight: 20,
                    }}
                  >
                    Post
                  </Text>
                </View>
              </View>
            </View>
          </>
        )}
      </Formik>
    </View>
  );
};
const Comments = ({ post }) => (
  <>
    {!post.comments.length && (
      <Text style={{ color: "grey" }}>No comments on this post</Text>
    )}
    {post.comments.length > 0 && (
      <View>
        {post.comments.map((comment, index) => (
          <View
            key={index}
            style={{
              flexDirection: "row",
              marginVertical: 20,
              marginLeft: 10,
              alignItems: "center",
            }}
          >
            <Image
              source={{ uri: comment.profilePicture }}
              style={{ height: 40, width: 40, borderRadius: 20 }}
            />
            <View>
              <Text
                style={{
                  color: "white",
                  fontWeight: "700",
                  marginLeft: 10,
                  marginBottom: 5,
                  flexWrap: "wrap",
                }}
              >
                {comment.username}
                <Text
                  style={{
                    fontWeight: "500",
                  }}
                >
                  {"  "}
                  {comment.comment}
                </Text>
              </Text>
              <Text
                style={{
                  color: "grey",
                  fontWeight: "400",
                  marginLeft: 10,
                  marginBottom: 5,
                  fontSize: 10,
                }}
              >
                15s<Text>{"     "}Reply</Text>
              </Text>
            </View>
            <TouchableOpacity style={{ marginLeft: "auto", marginRight: 20 }}>
              <MaterialCommunityIcons
                name="heart-outline"
                size={14}
                color="grey"
              />
            </TouchableOpacity>
          </View>
        ))}
      </View>
    )}
  </>
);

const Caption = ({ post }) => (
  <View
    style={{
      height: 80,
      borderColor: "#222525",
      borderTopWidth: 1,
      borderBottomWidth: 1,
      marginTop: 15,
    }}
  >
    <View
      style={{
        flexDirection: "row",
        marginVertical: 20,
        marginLeft: 10,
        alignItems: "center",
      }}
    >
      <Image
        source={{ uri: post.profilepic }}
        style={{ height: 40, width: 40, borderRadius: 20 }}
      />
      <View>
        <Text
          style={{
            color: "white",
            fontWeight: "700",
            marginLeft: 10,
            marginBottom: 5,
            flexWrap: "wrap",
          }}
        >
          {post.user}
          <Text style={{ fontWeight: "500" }}> {post.caption}</Text>
        </Text>
        <Text
          style={{
            color: "grey",
            fontWeight: "400",
            marginLeft: 10,
            marginBottom: 5,
            fontSize: 10,
          }}
        >
          47 seconds ago
        </Text>
      </View>
    </View>
  </View>
);

const Header = ({ navigation }) => {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image
          source={{
            uri: "https://img.icons8.com/ios-glyphs/90/ffffff/back.png",
          }}
          style={styles.backButton}
        />
      </TouchableOpacity>
      <Text style={styles.headerText}>Comments</Text>
      <Text></Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 50,
  },
  backButton: {
    width: 30,
    height: 30,
  },
  headerText: {
    color: "white",
    fontWeight: "700",
    fontSize: 20,
  },
});

export default CommentSection;
