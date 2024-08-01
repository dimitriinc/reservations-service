import useIntersectionObserver from './customHooks/useIntersectionObserver'
import { useState, useEffect, useRef } from 'react'

const Section = ({ children, isFirst, uniqueClass }) => {
    const [ref, isIntersecting] = useIntersectionObserver(
        {
            root: null,
            rootMargin: '0px',
            threshold: 0.15,
        },
        isFirst
    )
    return (
        <section
            ref={ref}
            className={`revealable ${
                isIntersecting ? 'revealed' : ''
            } ${uniqueClass}`}
        >
            {children}
        </section>
    )
}

export default function Main({ activateLink }) {
    const textRef = useRef()
    const onImageClick = () => {
        if (scrollY === 0) {
            if (document.documentElement.clientWidth > 769) {
                textRef.current.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                })
            } else {
                const coords = textRef.current.getBoundingClientRect()
                window.scrollTo({
                    left: coords.left + window.scrollX,
                    top: coords.top + window.scrollY - 160,
                    behavior: 'smooth',
                })
            }
        }
    }
    const onLinkClick = (index) => {
        activateLink(index)
    }
    return (
        <>
            <main>
                <Section
                    isFirst={true}
                    uniqueClass="hero"
                >
                    <div
                        onClick={onImageClick}
                        className="hero__image"
                    ></div>
                </Section>

                <Section uniqueClass="main-text">
                    <h2
                        ref={textRef}
                        className="fade-in"
                    >
                        Café francés de nueva generación
                    </h2>
                    <p className="main-message">
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. Reprehenderit soluta, esse nemo dolore delectus
                        quia aliquam ad perspiciatis minus saepe
                    </p>
                    <p className="pretencious-slogan">
                        <em>Audaces fortuna juvat.</em>
                    </p>
                    <div onClick={onLinkClick.bind(null, 2)}>
                        <button>Ver carta</button>
                    </div>
                </Section>

                <div className="points">
                    <Section uniqueClass="point point-one">
                        <img
                            className="centered round-image"
                            src="images/points/img1.jpeg"
                            alt="point-one"
                            id="img-point-one"
                        />
                        <p
                            className="centered point-text"
                            id="txt-point-one"
                        >
                            Tellus in hac habitasse platea dictumst. Ultrices
                            neque ornare aenean euismod elementum nisi quis
                            eleifend quam.
                        </p>
                    </Section>

                    <Section uniqueClass="point point-two">
                        <img
                            src="images/points/img2.jpg"
                            alt="point-two"
                            className="round-image centered"
                        />
                        <p className="centered point-text">
                            In ante metus dictum at. Quis commodo odio aenean
                            sed adipiscing.
                        </p>
                    </Section>

                    <Section uniqueClass="point point-three">
                        <img
                            src="images/points/img3.jpg"
                            alt="point-three"
                            className="round-image centered"
                        />
                        <p className="centered point-text">
                            Ullamcorper a lacus vestibulum sed arcu non odio.
                            Consectetur a erat nam at lectus urna duis convallis
                            convallis.
                        </p>
                    </Section>
                </div>

                <Section uniqueClass="bottom-image">
                    <div
                        onClick={onLinkClick.bind(null, 3)}
                        id="to-reserva-btn"
                        className="hide-for-desktop"
                    >
                        Reservar mesa
                    </div>
                </Section>
            </main>
        </>
    )
}
