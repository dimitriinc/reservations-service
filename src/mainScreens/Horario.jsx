import LeafletMap from "../auxiliaryComponents/LeafletMap"

function Horario() {
    return (
        <div className="main-hours">
            <section>
                <div className="horas">
                    <h2 className="aux_title">Horarios &amp; Ubicación</h2>

                    <p>
                        <a href="">
                            calle Mercaderes, 142
                            <br />
                            Arequipa
                        </a>
                    </p>

                    <p>
                        <strong>Atención</strong>
                        <br />
                        De lunes a sábado
                        <br />
                        2&#8212;10PM
                    </p>

                    <p>
                        <strong>Happy Hour</strong>
                        <br />
                        De lunes a sábado
                        <br />
                        2&#8212;6PM
                    </p>
                </div>

                <LeafletMap />
            </section>

            <section className="bottom-image revealable"></section>
        </div>
    )
}

export default Horario
