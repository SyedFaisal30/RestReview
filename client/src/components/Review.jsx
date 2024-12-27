import React, { useState, useEffect } from "react";
import "./Review.css";
import Header from "./header.jsx";
import axios from "axios";

const Review = ({ user }) => {
  const [reviews, setReviews] = useState([]);
  const [replyText, setReplyText] = useState("");
  const [selectedReviewId, setSelectedReviewId] = useState(null);
  const [editingReplyId, setEditingReplyId] = useState(null);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const gId = user.googleId;
        const googleId = gId.toString();
        const data = { googleId: googleId };

        const response = await axios.post(
          "http://localhost:8080/u/get-reviews",
          data
        );
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    }

    fetchReviews();
  }, [user.googleId]);

  const handleReply = async (reviewId) => {
    if (!replyText) return;

    const updatedReviews = reviews.map((review) => {
      if (review._id === reviewId) {
        return {
          ...review,
          reply: replyText,
        };
      }
      return review;
    });

    try {
      const reply = replyText;
      await axios.post("http://localhost:8080/u/update-reply", {
        reviewId,
        reply,
      });

      alert("Reply sent successfully!");
    } catch (error) {
      alert("Error sending reply. Please try again.");
    }

    setReviews(updatedReviews);
    setReplyText("");
    setSelectedReviewId(null);
  };

  const handleEditReply = async (reviewId) => {
    const updatedReviews = reviews.map((review) => {
      if (review._id === reviewId) {
        return {
          ...review,
          reply: replyText,
        };
      }
      return review;
    });

    const reply = replyText;
    try {
      await axios.post("http://localhost:8080/u/update-reply", {
        reviewId,
        reply,
      });

      alert("Reply edited successfully!");
    } catch (error) {
      alert("Error editing reply. Please try again.");
    }
    setReviews(updatedReviews);
    setReplyText("");
    setEditingReplyId(null);
  };

  const handleDeleteReply = async (reviewId) => {
    const updatedReviews = reviews.map((review) => {
      if (review._id === reviewId) {
        return {
          ...review,
          reply: "",
        };
      }
      return review;
    });

    const reply = "";
    try {
      await axios.post("http://localhost:8080/u/update-reply", {
        reviewId,
        reply,
      });

      alert("Reply deleted successfully!");
    } catch (error) {
      alert("Error deleting reply. Please try again.");
    }
    setReviews(updatedReviews);
  };

  return (
    <>
      <Header />
      <div className="review-container">
        <h1>Restaurant Reviews</h1>
        {reviews.map((review) => (
          <div key={review._id} className="review-card">
            <div className="review-header">
              <img
                src={review.authorProfileImage}
                alt={review.authorName}
                className="profile-image"
              />
              <div>
                <h3>{review.authorName}</h3>
                <p className="review-time">
                  {new Date(review.time).toLocaleString()}
                </p>
                <div className="star-rating">
                  {"★".repeat(review.rating)}
                  {"☆".repeat(5 - review.rating)}
                </div>
              </div>
            </div>
            <p className="review-text">{review.text}</p>

            <div className="replies">
              <h4>Reply:</h4>
              {review.reply && (
                <div className="reply-card">
                  {editingReplyId === review._id ? (
                    <>
                      <textarea
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Edit your reply..."
                        className="textarea-edit"
                      />
                      <button
                        onClick={() => handleEditReply(review._id)}
                        className="edit-button"
                      >
                        Save
                      </button>
                    </>
                  ) : (
                    <>
                      <p>{review.reply}</p>
                      <p className="reply-time">
                        {new Date(review.updatedAt).toLocaleString()}
                      </p>
                      <button
                        onClick={() => {
                          setReplyText(review.reply);
                          setEditingReplyId(review._id);
                        }}
                        className="edit-button"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteReply(review._id)}
                        className="delete-button"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>

            <div className="reply-section">
              {!review.reply && selectedReviewId === review._id ? (
                <>
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Write your reply here..."
                    className="textarea-reply"
                  />
                  <button
                    onClick={() => handleReply(review._id)}
                    className="reply-button"
                  >
                    Submit Reply
                  </button>
                </>
              ) : (
                !review.reply && (
                  <button
                    onClick={() => setSelectedReviewId(review._id)}
                    className="reply-button"
                  >
                    Reply
                  </button>
                )
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Review;
