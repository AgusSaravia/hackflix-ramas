import React from "react";
import { Rating } from "react-simple-star-rating";
import { Button } from "react-bootstrap"; // Opcional, para el botón

const RatingFilter = ({ selectedStars, onRatingChange, onReset }) => {
  return (
    <div className="d-flex align-items-center mb-4">
      {/* Componente de estrellas */}
      <Rating
        onClick={onRatingChange}
        ratingValue={selectedStars} // Convertir a escala 0-100
        size={30} // Tamaño de las estrellas, ajusta según preferencia
        label
        transition
        fillColor="orange"
        emptyColor="gray"
        className="me-3"
      />

      {/* Mostrar la calificación seleccionada */}
      {selectedStars > 0 && (
        <span>Filtrando por {selectedStars} estrella(s)</span>
      )}

      {/* Botón para resetear el filtro */}
      {selectedStars > 0 && (
        <Button variant="secondary" onClick={onReset} className="ms-3">
          Mostrar Todas
        </Button>
      )}
    </div>
  );
};

export default RatingFilter;
