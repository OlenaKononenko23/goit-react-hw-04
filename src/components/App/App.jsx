
import { useEffect, useState } from "react";
import { getImages } from "../../images-api";
import ImageGallery from "../ImageGallery/ImageGallery";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import SearchBar from "../SearchBar/SearchBar"; 
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import css from "./App.module.css";


export default function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (searchQuery.trim() === "") {
      return;
    }
    async function fetchImages() {
      try {
        setIsLoading(true);
        setIsError(false);
        const fetchedImages = await getImages(searchQuery,page);
        setImages((prevState) => [...prevState, ...fetchedImages]);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchImages();
  }, [page, searchQuery]);
  
  const handleSearch = async (topic) => {
    setSearchQuery(topic);
    setPage(1);
    setImages([]);
  };

  const handleLoadMore = async () => { 
    setPage(page + 1);   
  };

  return (
    <>
      <h1>Hello This Search Images!!!!</h1>
      <SearchBar onSubmit={handleSearch}/>
      
      {isError && <ErrorMessage />}
      
      {images.length > 0 && <ImageGallery images={images} />}

      {images.length > 0 && !isLoading && <LoadMoreBtn onClick={handleLoadMore} />}

      {isLoading && <Loader />}
      
    </>
  );
}