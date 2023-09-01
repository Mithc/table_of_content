import React from 'react'
import './Icon.scss'

const Icon = ({
    width = 16,
    height = 16,
    fill = '#000000',
    active = false,
}) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            viewBox="0 0 16 16"
            fill="none"
            className={active ? 'rotate-90' : ''}
        >
            <path
                d="M6.00262 12.6667L11.336 8.00001L6.00262 3.33334V12.6667Z"
                fill={fill}
            />
        </svg>
    )
}

export default Icon
