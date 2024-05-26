import css from "./ImageGallery.module.css";
import ImageCard from "../ImageCard/ImageCard";

export default function ImageGallery({images, onImageClick}) {
    return (
        <ul className={css.list}>
            {images.map((image) => (
                <li  key={image.id}>
                    <ImageCard image={image.urls} description={image.alt_description} onClick={onImageClick} />
                 </li>
            ))}
        </ul>
    );
}