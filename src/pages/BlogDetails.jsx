import { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import useFetch from "../hooks/useFetch";

const BlogDetails = () => {
  const { id } = useParams();
  const history = useHistory();
  const {
    data: blog,
    error,
    isLoading,
  } = useFetch(`http://localhost:8000/blogs/${id}`);
  const [isLoading2, setIsLoading2] = useState(false);

  const deleteHandel = (e) => {
    setIsLoading2(true);

    fetch(`http://localhost:8000/blogs/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        console.log("blog deleted");
        setIsLoading2(false);
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="blog-details">
      {error && <h2 style={{ textAlign: "center" }}>{error}</h2>}
      {isLoading && <h2 style={{ textAlign: "center" }}>Loading....</h2>}
      {blog && (
        <article>
          <h2>{blog.title}</h2>
          <p>Author: {blog.author}</p>
          <div>{blog.body}</div>
          {isLoading2 && (
            <button onClick={deleteHandel} disabled>
              Deleting
            </button>
          )}
          {!isLoading2 && <button onClick={deleteHandel}>Delete</button>}
        </article>
      )}
    </div>
  );
};

export default BlogDetails;
