import useFetch from "../hooks/useFetch";
import BlogList from "../components/BlogList";

const Home = () => {
  const {
    data: blogs,
    error,
    isLoading,
  } = useFetch("http://localhost:8000/blogs");

  return (
    <div className="home">
      {error && <h2 style={{ textAlign: "center" }}>{error}</h2>}
      {isLoading && <h2 style={{ textAlign: "center" }}>Loading....</h2>}
      {blogs && <BlogList blogs={blogs} title="All Blogs" />}
    </div>
  );
};

export default Home;
