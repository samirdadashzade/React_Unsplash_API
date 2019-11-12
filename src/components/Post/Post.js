import React from "react";

const Post = props => {
  return (
    <div className="post">
      <img src={props.post.urls.small} alt="unsplash"></img>
      <h5>{props.post.description || "No description"}</h5>
    </div>
  );
};

export default Post;
