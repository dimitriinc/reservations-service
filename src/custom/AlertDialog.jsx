function AlertDialog({ message, onClose }) {
    return (
        <div className="overlay">
            <div className="dialog">
                <p className="alertMessage">{message}</p>
                <div
                    className="button-control-round"
                    onClick={onClose}
                    style={{ marginBottom: '0', width: '50%' }}
                >
                    OK
                </div>
            </div>
        </div>
    )
}

export default AlertDialog
