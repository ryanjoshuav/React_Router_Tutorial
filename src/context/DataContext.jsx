import { createContext, useEffect, useState } from "react";
import useAxiosFetch from "../hooks/useAxiosFetch";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const url = "http://localhost:3500/posts";
  const { data, fetchError, isLoading } = useAxiosFetch(url);

  useEffect(() => {
    setPosts(data);
  }, [data]);

  //*Old Fetch before useAxiosFetch
  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     try {
  //       const response = await api.get("/posts");
  //       setPosts(response.data);
  //     } catch (error) {
  //       if (error.response) {
  //         //Not in the 200 response range
  //         console.log(error.response.data);
  //         console.log(error.response.status);
  //         console.log(error.response.headers);
  //       } else {
  //         console.log(`Error: ${error.message}`);
  //       }
  //     }
  //   };

  //   fetchPosts();
  // }, []);

  useEffect(() => {
    //*Search function
    const filteredResults = posts.filter(({ body, title }) => {
      const temp =
        body.toLowerCase().includes(search.toLowerCase()) ||
        title.toLowerCase().includes(search.toLowerCase());
      return temp;
    });
    setSearchResults(filteredResults.reverse());
  }, [posts, search]);

  return (
    <DataContext.Provider
      value={{
        search,
        setSearch,
        searchResults,
        fetchError,
        isLoading,
        setPosts,
        posts,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
