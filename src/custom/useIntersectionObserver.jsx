import { useRef, useState, useEffect } from 'react'

export default function useIntersectionObserver(
    options,
    isFirstSection = false
) {
    const [isIntersecting, setIsIntersecting] = useState(false)
    const ref = useRef(null)

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (isFirstSection) {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        setIsIntersecting(true)
                    }, 400)
                } else {
                    setIsIntersecting(false)
                }
            } else {
                setIsIntersecting(entry.isIntersecting)
            }
        }, options)

        const currentRef = ref.current
        if (currentRef) observer.observe(currentRef)
        return () => {
            if (currentRef) observer.unobserve(currentRef)
        }
    }, [ref, options, isFirstSection])

    return [ref, isIntersecting]
}
