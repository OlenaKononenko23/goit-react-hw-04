export default function ImageCard({image,description}) {
    return (
        <div>
            <img src={image} alt={description} />
        </div>
    );
}