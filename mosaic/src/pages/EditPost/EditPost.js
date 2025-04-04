import styles from "./EditPost.module.css";

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { useUpdateDocument } from "../../hooks/useUpdateDocument";
import { useFetchDocument } from "../../hooks/useFetchDocument";

const EditPost = () => {
  const { id } = useParams();
  const { document: post } = useFetchDocument("posts", id);

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState("");
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setBody(post.body);
      setImage(post.image);

      const textTags = post.TagsArray.join(", ");

      setTags(textTags);
    }
  }, [post]);

  const { user } = useAuthValue();

  const { updateDocument, response } = useUpdateDocument("posts");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    // validando image
    try {
      new URL(image);
    } catch (error) {
      setFormError("Image most be a URL");
    }

    // Array de tags
    const TagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());

    // Checar valores
    if (!title || !image || !tags || !body) {
      setFormError("please, fill in all fields");
    }

    if (formError) return;

    const data = {
      title,
      image,
      body,
      TagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    };

    updateDocument(id, data);

    // redirect home Page
    navigate("/dashboard");
  };

  return (
    <div className={styles.edit_post}>
      {post && (
        <>
          <h2>Edit your post: {post.title}</h2>
          <p>change the information here</p>
          <form onSubmit={handleSubmit}>
            <label>
              {" "}
              <span> Title:</span>
              <input
                type="text"
                name="text"
                required
                placeholder="think about a gooood title..."
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
            </label>
            <label>
              <span>Image URL</span>
              <input
                type="text"
                name="image"
                required
                placeholder="enter a image in here"
                onChange={(e) => setImage(e.target.value)}
                value={image}
              />
            </label>
            <p className={styles.preview_title}>Image Preview</p>
            <img
              className={styles.image_preview}
              src={post.image}
              alt={post.title}
            />
            <label>
              <span>Content: </span>
              <textarea
                name="body"
                required
                placeholder="enter the content of the post"
                onChange={(e) => setBody(e.target.value)}
                value={body}
              ></textarea>
            </label>
            <label>
              <span>Tags: </span>
              <input
                type="text"
                name="Tags"
                placeholder="Enter a comma separated tag "
                onChange={(e) => setTags(e.target.value)}
                value={tags}
              />
            </label>
            {!response.loading && <button className="btn">Edit</button>}
            {response.loading && (
              <button className="btn" disabled>
                Loading...
              </button>
            )}
            {response.error && <p className="error"> {response.error} </p>}
            {formError && <p className="error"> {formError} </p>}
          </form>
        </>
      )}
    </div>
  );
};

export default EditPost;
