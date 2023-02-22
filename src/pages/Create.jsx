import { useState } from "react";
import { useHistory } from "react-router-dom";

const Create = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const handelSubmit = (e) => {
    e.preventDefault();
    const blog = { title, body, author };

    setIsLoading(true);

    fetch("http://localhost:8000/blogs", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(blog),
    })
      .then(() => {
        console.log("blog added");
        setIsLoading(false);
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="create">
      <h2>Add A New Blog</h2>
      <form onSubmit={handelSubmit}>
        <label>Blog Title</label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Blog Body</label>
        <textarea
          required
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>

        <label>Blog Author</label>
        <select value={author} onChange={(e) => setAuthor(e.target.value)}>
          <option value="">Select</option>
          <option value="mario">Mario</option>
          <option value="yoshi">Yoshi</option>
        </select>

        {isLoading && <button disabled>Adding Blog...</button>}
        {!isLoading && <button>Add Blog</button>}
      </form>
      <p>{title}</p>
      <p>{author}</p>
      <p>{body}</p>
    </div>
  );
};

export default Create;
