import styles from "./Dashboard.module.css";

import { Link } from "react-router-dom";

// hook
import { useAuthValue } from "../../context/AuthContext";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";

const Dashboard = () => {
  const { user } = useAuthValue();
  const uid = user.id;

  const { documents: posts, loading } = useFetchDocuments("posts", null, uid);
  const deleteDocument = (id) => {};

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.dashboard}>
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
        <div className={styles.post_header}>
          <span>Título</span>
          <span>Ações</span>
        </div>
      )}

      {posts &&
        posts.map((post) => (
          <div key={post.id} className={styles.post_row}>
            <p>{post.title}</p>
            <div>
              <Link to={`/posts/${post.id}`} className="btn btn-outline">
                view
              </Link>
              <Link to={`/posts/edit/${post.id}`}>Edit</Link>
              <button
                onClick={() => deleteDocument(post.id)}
                className="btn btn-outline btn-danger"
              >
                Excluir
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Dashboard;
