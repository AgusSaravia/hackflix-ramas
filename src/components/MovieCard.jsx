import React from "react";
import { Card } from "react-bootstrap";

const MovieCard = ({
  title,
  popularity,
  releaseDate,
  imgSrc,
  voteAvrg,
  isFiltered,
}) => {
  return (
    <Card className="text-white bg-dark h-100 shadow-sm cardHover">
      {/* Si la imagen falla en cargar por alguna razon hay que hacer improvements*/}
      {imgSrc ? (
        <Card.Img
          src={imgSrc}
          alt={`${title} Poster`}
          style={{ height: "100%", objectFit: "cover" }}
        />
      ) : (
        <div
          style={{
            height: "100%",
            backgroundColor: "#",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <span>No Image Available</span>
        </div>
      )}
      <Card.ImgOverlay
        className="d-flex flex-column justify-content-end"
        style={{
          background:
            "linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0))",
        }}
      >
        {/* <div
          style={{
            background: "rgba(0, 0, 0, 0.6)",
            padding: "10px",
            borderRadius: "5px",
          }}
        >
          <Card.Title>{title}</Card.Title>

          <Card.Text>
            <strong>Popularidad:</strong> {popularity}
          </Card.Text>
          <Card.Text>
            <strong>Estreno:</strong> {releaseDate}
          </Card.Text>
          <Card.Text>
            <strong>Estrellas:</strong> {voteAvrg}
          </Card.Text>
        </div> */}
      </Card.ImgOverlay>
    </Card>
  );
};

export default MovieCard;
