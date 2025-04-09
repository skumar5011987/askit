import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/authContext";

export const Dashboard = () => {
  const { posts, get_posts } = useContext(AuthContext);
  const [MyPosts, setMyPosts] = useState(false);

  const getMyPosts = async (e) => {
    e.preventDefault();
    await get_posts(true);
    setMyPosts(true);
  };

  const getAllPosts = async (e) => {
    e.preventDefault();
    await get_posts();
    setMyPosts(false);
  };

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center">
        {!MyPosts ? (
          <h3 className="mt-2">All Posts</h3>
        ) : (
          <h3 className="mt-2">My Posts</h3>
        )}

        <div className="d-flex align-items-center ms-auto">
          {!MyPosts ? (
            <button className="btn btn-secondary ms-2" onClick={getMyPosts}>
              My Posts
            </button>
          ) : (
            <button className="btn btn-secondary ms-2" onClick={getAllPosts}>
              All Posts
            </button>
          )}

          <Link to="/posts/new" className="btn btn-success ms-2">
            + New Post
          </Link>
        </div>
      </div>
      <hr />

      {posts?.length > 0 ? (
        posts.map((post) => <PostItem key={post.id} post={post} />)
      ) : (
        <p>No posts available.</p>
      )}
    </div>
  );
};

// Recursive PostItem Component
const PostItem = ({ post }) => {
  const [showAllReplies, setShowAllReplies] = useState(false);
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [replyText, setReplyText] = useState({ post: "" });
  const { create_post, update_post } = useContext(AuthContext);
  const navigate = useNavigate();

  const hasReplies = post.responses && post.responses.length > 0;
  const visibleReplies = showAllReplies
    ? post.responses
    : post.responses.slice(0, 1);

  const handlePostReply = async (e) => {
    e.preventDefault();
    const payload = {
      response_to: post.id,
      post: replyText.post,
    };

    await create_post(payload);
    // Reset the form
    setReplyText("");
    setShowReplyBox(false);
  };

  const handlePostLikes = async (e) => {
    e.preventDefault();
    const payload = {
      response_to: post.id,
    };
    await update_post(payload, navigate);
  };

  return (
    <div className="card mb-2">
      <div className="card-body">
        <h6 className="card-title">{post.author}</h6>
        <p className="card-text">{post.post}</p>
        <p className="card-text">
          <small className="text-muted">
            {new Date(post.created_at).toLocaleString()}
          </small>
        </p>

        {/* Like and Reply Buttons */}
        <div className="d-flex gap-2 my-2">
          <button
            className="btn btn-outline-primary btn-sm"
            onClick={handlePostLikes}
          >
            Like ({post.total_likes})
          </button>
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={() => setShowReplyBox(!showReplyBox)}
          >
            {showReplyBox ? "Cancel" : "Reply"}
          </button>
        </div>

        {/* Reply Box */}
        {showReplyBox && (
          <div className="mt-2">
            <textarea
              className="form-control mb-2 p-1"
              placeholder="Write your reply..."
              rows="2"
              value={replyText.post}
              onChange={(e) =>
                setReplyText((prev) => ({
                  ...prev,
                  post: e.target.value,
                }))
              }
            />
            <div className="d-flex gap-2">
              <button
                className="btn btn-sm btn-secondary"
                onClick={() => setShowReplyBox(false)}
              >
                Cancel
              </button>
              <button
                className="btn btn-sm btn-success"
                onClick={handlePostReply}
                disabled={!replyText?.post?.trim()}
              >
                Post
              </button>
            </div>
          </div>
        )}

        {/* Replies */}
        {hasReplies && (
          <div className="mt-1 ms-1 ps-1">
            {visibleReplies.map((reply) => (
              <PostItem key={reply.id} post={reply} />
            ))}
            {post.responses.length > 1 && (
              <button
                className="btn btn-link btn-sm mt-2"
                onClick={() => setShowAllReplies(!showAllReplies)}
              >
                {showAllReplies
                  ? "Hide replies"
                  : `${post.responses.length - 1} more repl${
                      post.responses.length > 2 ? "ies" : "y"
                    }`}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
