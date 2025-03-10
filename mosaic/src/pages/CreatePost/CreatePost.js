import styles from "./CreatePost.module.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { useInsertDocument } from "../../hooks/useInsertDocument";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState("");
  const [formError, setFormError] = useState("");

  const { user } = useAuthValue();

  const { insertDocument, response } = useInsertDocument("posts");
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

    insertDocument({
      title,
      image,
      body,
      TagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    });

    // redirect home Page
    navigate("/");
  };

  return (
    <div className={styles.create_post}>
      <h2>Create a new Post</h2>
      <p>Share a memory or an opinion!</p>
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
        {!response.loading && <button className="btn">Post</button>}
        {response.loading && (
          <button className="btn" disabled>
            Loading...
          </button>
        )}
        {response.error && <p className="error"> {response.error} </p>}
        {formError && <p className="error"> {formError} </p>}
      </form>
    </div>
  );
};

export default CreatePost;
