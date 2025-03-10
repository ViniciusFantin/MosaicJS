import styles from "./Dashboard";

import { Link } from "react-router-dom";

// hook
import { useAuthValue } from "../../context/AuthContext";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";

const Dashboard = () => {
  const { user } = useAuthValue();
  const uid = user.id;

  const { documents: posts, loading } = useFetchDocuments("posts", null, uid);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Menage your Posts!</p>
      {posts && posts.length === 0 ? (
        <div className={styles.noposts}>
          <p>We don't found any post :/</p>
          <Link to="/posts/create" className="btn">
            {" "}
            Create your first Post Here!{" "}
          </Link>
        </div>
      ) : (
        <div>
          <p>Posts</p>
        </div>
      )}

      {posts && posts.map((post) => <h3>{post.title}</h3>)}
    </div>
  );
};

export default Dashboard;
