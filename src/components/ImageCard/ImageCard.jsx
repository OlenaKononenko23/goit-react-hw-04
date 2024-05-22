import css from "./ImageCard.module.css"
export default function ImageCard({ image, description,onClick }) {
    
    const handleClick = () => {
    onClick(image.regular);
   
  };

    return (
        <div className={css.div}>
            <img className={css.img}
                src={image.small}
                alt={description}
                onClick={handleClick}
            />
        </div>
    );
}