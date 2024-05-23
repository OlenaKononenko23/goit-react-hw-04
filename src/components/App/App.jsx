
import { useEffect, useState } from "react";
import { getImages } from "../../images-api";
import ImageGallery from "../ImageGallery/ImageGallery";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import SearchBar from "../SearchBar/SearchBar"; 
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import ImageModal from "../ImageModal/ImageModal";
import css from "./App.module.css";


export default function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState("");
  const [totalPages, setTotalPages] = useState(0);
 
  

  useEffect(() => {
    if (searchQuery.trim() === "") {
      return;
    }
    async function fetchImages() {
      try {
        setIsLoading(true);
        setIsError(false);
        const fetchedImages = await getImages(searchQuery, page);
        setImages((prevState) => [...prevState, ...fetchedImages.images]);
        setTotalPages(fetchedImages.total_pages);
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

  const openModal = (imageUrl) => {
    setSelectedImageUrl(imageUrl);
    setModalIsOpen(true);
  };

  const closeModal = () => {
      setSelectedImageUrl("");
      setModalIsOpen(false);
  };

  return (
    <>
      <h1 className={css.h1}>Hello This Search Images!!!!</h1>
      <SearchBar onSubmit={handleSearch}/>
      
      {isError && <ErrorMessage />}
      
      {images.length > 0 && <ImageGallery images={images} onImageClick={openModal} />}

      {images.length > 0 && !isLoading && totalPages > page && <LoadMoreBtn onClick={handleLoadMore} />}

      {isLoading && <Loader />}

      <ImageModal
        isOpen={modalIsOpen}
        onClose={closeModal}
        imageUrl={selectedImageUrl}
      />
    </>
  );
}