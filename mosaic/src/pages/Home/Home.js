// CSS
import styles from "./Home.module.css";

// hooks
import { useNavigate, Link } from "react-router-dom";
import { useFetchDocument } from "../../hooks/useFetchDocument";

// React imports
import { useState } from "react";

//components
import PostDetail from "../../components/PostDetail";

const Home = () => {
  const [query, setQuery] = useState("");
  const { documents: posts, loading } = useFetchDocument("posts");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className={styles.home}>
      <h1>Feed</h1>
      <form className={styles.search_form} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Or shearch for a tag..."
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn btn-dark">Search</button>
      </form>
      <div className="post-list">
        {loading && <p>Loading...</p>}
        {posts && posts.map((post) => <PostDetail key={post.id} post={post} />)}
        {posts && posts.length === 0 && (
          <div className={styles.noposts}>
            <p>No post avaliable</p>
            <Link to="/posts/create" className="btn">
              Create a Post
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
