// import useIntersectionObserver from './customHooks/useIntersectionObserver'
import { useState, useEffect, useRef } from 'react'
import { Link, NavLink } from 'react-router-dom'

// const Section = ({ children, isFirst, uniqueClass }) => {
//     const [ref, isIntersecting] = useIntersectionObserver(
//         {
//             root: null,
//             rootMargin: '0px',
//             threshold: 0.15,
//         },
//         isFirst
//     )
//     return (
//         <section
//             ref={ref}
//             className={`revealable ${
//                 isIntersecting ? 'revealed' : ''
//             } ${uniqueClass}`}
//         >
//             {children}
//         </section>
//     )
// }

const Section = ({ children, reference, isfirst = '0', uniqueClass }) => {
    return (
        <section
            ref={reference}
            className={`revealable  ${uniqueClass}`}
            isfirst={isfirst}
        >
            {children}
        </section>
    )
}

export default function Home({ activateLink }) {
    const mainRef = useRef()
    // Sections refs
    const heroRef = useRef()
    const textRef = useRef()
    const point1Ref = useRef()
    const point2Ref = useRef()
    const point3Ref = useRef()
    const bottomImgRef = useRef()

    // Assign intersection observer to every section on the first render
    useEffect(() => {
        activateLink(0)
        const reveal = function (entries, observer) {
            const [entry] = entries
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed')
                observer.unobserve(entry.target)
            }
        }
        const revealOptions = {
            root: null,
            threshold: 0.15,
        }
        const revealObserver = new IntersectionObserver(reveal, revealOptions)

        Array.of(
            heroRef.current,
            textRef.current,
            point1Ref.current,
            point2Ref.current,
            point3Ref.current,
            bottomImgRef.current
        ).forEach((section) => {
            if (section.getAttribute('isfirst') === '1') {
                setTimeout(() => {
                    revealObserver.observe(section)
                }, 500)
            } else {
                revealObserver.observe(section)
            }
        })
    }, [])

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
            <div
                className="main-home"
                ref={mainRef}
            >
                <Section
                    isfirst="1"
                    uniqueClass="hero"
                    reference={heroRef}
                >
                    <div
                        onClick={onImageClick}
                        className="hero__image"
                    >
                        <div
                            className="filler"
                            id="filler-left"
                        ></div>
                        <div
                            className="filler"
                            id="filler-right"
                        ></div>
                    </div>
                </Section>

                <Section
                    uniqueClass="main-text"
                    reference={textRef}
                >
                    <h2
                        // ref={textRef}
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
                    <Link
                        to="/carta"
                        onClick={onLinkClick.bind(null, 2)}
                    >
                        <button>Ver carta</button>
                    </Link>
                </Section>

                <div className="points">
                    <Section
                        uniqueClass="point point-one"
                        reference={point1Ref}
                    >
                        <img
                            className="centered round-image"
                            src="images/scetches/cornerScene_noise.png"
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

                    <Section
                        uniqueClass="point point-two"
                        reference={point2Ref}
                    >
                        <img
                            src="images/scetches/barScene_noise.png"
                            alt="point-two"
                            className="round-image centered"
                        />
                        <p className="centered point-text">
                            In ante metus dictum at. Quis commodo odio aenean
                            sed adipiscing.
                        </p>
                    </Section>

                    <Section
                        uniqueClass="point point-three"
                        reference={point3Ref}
                    >
                        <img
                            src="images/scetches/metalFrameScene_noise.png"
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

                <Section
                    uniqueClass="bottom-image"
                    reference={bottomImgRef}
                >
                    <Link
                        to="/reservas"
                        onClick={onLinkClick.bind(null, 3)}
                        id="to-reserva-btn"
                        className="hide-for-desktop"
                    >
                        Reservar mesa
                    </Link>
                </Section>
            </div>
        </>
    )
}
