import React, { useState } from "react";

interface IProps {
  src?: string;
  alt?: string;
  fallbackSrc?: string;
  className?: string;
}

const ImageWithError = (props: IProps): React.ReactElement => {
  const [hasError, setHasError] = useState(false);

  const handleImageError = () => {
    setHasError(true);
  };

  return (
    <>
      {hasError ? (
        props.fallbackSrc ? (
          <img
            src={props.fallbackSrc}
            alt={props.alt}
            className={props.className}
            loading="lazy"
          />
        ) : (
          <p>Failed to load image</p>
        )
      ) : props.src ? (
        <img
          src={props.src}
          alt={props.alt}
          onError={handleImageError}
          className={props.className}
          loading="lazy"
        />
      ) : (
        <img
          src={props.fallbackSrc}
          alt={props.alt}
          onError={handleImageError}
          className={props.className}
          loading="lazy"
        />
      )}
    </>
  );
};

export default ImageWithError;
