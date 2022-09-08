import React from "react";
import { useIsFocused } from "@react-navigation/native";

import { ScrollView } from "react-native";

import EmptyStateView from "../../../reused-components/EmptyStateView";
import PostComponent from "./PostComponent";

export default function Home({ posts, userObject }) {
  const isFocused = useIsFocused();

  // renders EmptyStateView if the screen is not in focuse to save resources
  // setTimeout to preserve the screen as navigation is happening so the data doesn't disappear

  if (!isFocused) {
    setTimeout(() => {
      return <EmptyStateView />;
    }, 100);
  }

  // check if the posts array has data, if it does then map over it and render a post
  // component for each item in the post array

  return (
    <ScrollView>
      {posts.length !== 0 &&
        posts.map((post) => (
          <PostComponent key={post.id} post={post} userObject={userObject} />
        ))}
    </ScrollView>
  );
}
