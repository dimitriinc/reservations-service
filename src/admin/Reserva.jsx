function Reserva({ reserva }) {
    return (
        <div className="reservation-item">
            <h3>
                {reserva.name} - {reserva.hour}
            </h3>

            <div className="reservation-data">
                <div className="res-pax">
                    <span className="reservation-label">Pax: </span>
                    <span className="reservation-value">{reserva.pax}</span>
                </div>
                <div className="res-telephone">
                    <span className="reservation-label">Teléfono: </span>
                    <span className="reservation-value">{reserva.phone}</span>
                </div>
                <div className="res-comment">
                    <span className="reservation-label">Comentario: </span>
                    <span className="reservation-value">
                        {reserva.comment}
                    </span>
                </div>
            </div>

            {reserva.confirmed ? (
                <div className="reservation-confirmed">
                    <img
                        src="/images/confirm-tick.png"
                        alt="confirmado"
                    />
                </div>
            ) : (
                <div className="reservation-actions">
                    <div className="reservation-action-container">
                        <button
                            // dataId="${reservation.id}"
                            // dataEmail="${reservation.email}"
                            // dataName="${reservation.name}"
                            // dataDate="${reservation.date}"
                            // dataHour="${reservation.hour}"
                            className="reservation-action btn-confirm-res"
                        >
                            Confirmar
                        </button>
                        <img
                            id="reservation-confirmation-loader"
                            className="reservation-loader"
                            src="/images/loaders/res-actions.svg"
                            alt="loader"
                        />
                    </div>
                    <div className="reservation-action-container">
                        <button
                            // dataId="${reservation.id}"
                            // dataEmail="${reservation.email}"
                            // dataName="${reservation.name}"
                            // dataDate="${reservation.date}"
                            // dataHour="${reservation.hour}"
                            className="reservation-action btn-reject-res"
                        >
                            Rechazar
                        </button>
                        <img
                            id="reservation-rejection-loader"
                            className="reservation-loader"
                            src="/images/loaders/res-actions.svg"
                            alt="loader"
                        />
                    </div>
                </div>
            )}
        </div>
    )
}

export default Reserva
