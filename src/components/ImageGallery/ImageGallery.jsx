import ImageCard from "../ImageCard/ImageCard";

export default function ImageGallery({images}) {
    return (
        <ul>
            {images.map((image) => (
                <li key={image.id}>
                <ImageCard image={image.urls.small} description ={image.alt_description} />
                 </li>
            ))}
        </ul>
    );
}