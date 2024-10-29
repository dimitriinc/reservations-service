import { Html } from '@react-three/drei'

function Loader({isLoading, progress}) {
    return (
        <>
            <div className={`web-gl-loader`}
                    style={
                        isLoading
                            ? { visibility: 'visible', opacity: '1' }
                            : { visibility: 'hidden', opacity: '0' }
                    }
            >
                <img
                    src="/images/loaders/res-actions.svg"
                    style={{ width: '32px', height: '32px' }}
                ></img>
                <div className='loading-runner' style={{transform: `scaleX(${progress})`}}></div>
            </div>
        </>
    )
}

export default Loader
