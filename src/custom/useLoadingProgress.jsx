import { useProgress } from "@react-three/drei";
import { useEffect } from "react";

function useLoadingProgress(callback) {
    const {progress} = useProgress

    useEffect(() => {
        callback(progress)
    }, [callback, progress])
}