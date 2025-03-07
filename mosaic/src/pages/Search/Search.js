// hooks
import { useFetchDocument } from "../../hooks/useFetchDocument";
import { useQuery } from "../../hooks/useQuery";

// CSS
//import styles from "./Search.module.css";

// Components
import PostDetail from "../../components/PostDetail";
import { Link } from "react-router-dom";

const Search = () => {
  const query = useQuery();
  const search = query.get("q");

  const { documents: posts } = useFetchDocument("posts", search);
  return (
    <div>
      <h2>Search</h2>
      <div>
        {posts && posts.length === 0 && (
          <>
            <p>There's no post with this tag '-'</p>
            <Link to="/" className="btn btn-dark">
              Back
            </Link>
          </>
        )}
        {posts && posts.map((post) => <PostDetail key={post.id} post={post} />)}
      </div>
    </div>
  );
};

export default Search;
