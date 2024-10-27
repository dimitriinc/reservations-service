import { useState } from 'react'

function Reserva({ reserva, pendiente }) {
    const [reservaConfirmed, setReservaConfirmed] = useState(reserva.confirmed)
    const [rejecting, setRejecting] = useState(false)
    const [confirming, setConfirming] = useState(false)
    const [iconName, setIconName] = useState('confirm-tick.png')

    const handleConfirm = async () => {
        if (rejecting) return
        setConfirming(true)
        const data = {
            id: reserva.id,
            name: reserva.name,
            email: reserva.email,
            date: reserva.date,
            hour: reserva.hour,
        }
        try {
            const res = await fetch(
                'https://future-url.pe/confirm-reservation',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                }
            )
            setConfirming(false)
            setReservaConfirmed(true)
        } catch (_) {
            // Dummy
            setTimeout(() => {
                setConfirming(false)
                setReservaConfirmed(true)
            }, 2000)
        }
    }

    const handleReject = async () => {
        if (confirming) return
        setRejecting(true)
        const data = {
            id: reserva.id,
            name: reserva.name,
            email: reserva.email,
            date: reserva.date,
            hour: reserva.hour,
        }
        try {
            const res = await fetch(
                'https://future-url.pe/reject-reservation',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                }
            )
            setRejecting(false)
            setIconName('cancelled.png')
            setReservaConfirmed(true)
        } catch (_) {
            // Dummy
            setTimeout(() => {
                setRejecting(false)
                setIconName('cancelled.png')
                setReservaConfirmed(true)
            }, 2000)
        }
    }

    return (
        <div className="reservation-item">
            <h3>
                {reserva.name} - {reserva.hour}
            </h3>

            <div className="reservation-data">
                {pendiente && (
                    <div className="res-fecha">
                        <span className="reservation-label">Fecha: </span>
                        <span className="reservation-value">
                            {reserva.date}
                        </span>
                    </div>
                )}
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
                    <span className="reservation-value">{reserva.comment}</span>
                </div>
            </div>

            {reservaConfirmed ? (
                <div className="reservation-confirmed">
                    <img
                        src={`/images/${iconName}`}
                        alt="confirmado"
                    />
                </div>
            ) : (
                <div className="reservation-actions">
                    <div className="reservation-action-container">
                        <button
                            className={`reservation-action btn-confirm-res ${
                                confirming && 'invisible'
                            }`}
                            onClick={handleConfirm}
                        >
                            Confirmar
                        </button>
                        <img
                            id="reservation-confirmation-loader"
                            className="reservation-loader"
                            src="/images/loaders/res-actions.svg"
                            alt="loader"
                            style={
                                confirming
                                    ? { visibility: 'visible', opacity: '1' }
                                    : null
                            }
                        />
                    </div>
                    <div className="reservation-action-container">
                        <button
                            className={`reservation-action btn-reject-res ${
                                rejecting && 'invisible'
                            }`}
                            onClick={handleReject}
                        >
                            Rechazar
                        </button>
                        <img
                            id="reservation-rejection-loader"
                            className="reservation-loader visible"
                            src="/images/loaders/res-actions.svg"
                            alt="loader"
                            style={
                                rejecting
                                    ? {
                                          visibility: 'visible',
                                          opacity: '1',
                                      }
                                    : null
                            }
                        />
                    </div>
                </div>
            )}
        </div>
    )
}

export default Reserva
