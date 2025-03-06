// CSS
import styles from "./Home.module.css";

// hooks
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

//components

const Home = () => {
  const [query, setQuery] = useState("");
  const [posts] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <h1>Feed</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Or shearch for a tag..."
          onChange={(e) => setQuery(e.target.values)}
        />
        <button className="btn btn-dark">Search</button>
      </form>
      <div>
        <h1>Posts...</h1>
        {posts && posts.lenght === 0 && (
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
