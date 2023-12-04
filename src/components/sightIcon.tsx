import { SvgIcon, SvgIconProps } from '@mui/material'

export default function SiteIcon(props: SvgIconProps) {
    const size = 24
    const rectWidth = size / 5
    const rectHeight1 = size / 3
    const rectHeight2 = size
    const rectHeight3 = (size * 2) / 3
    const space = size / 8
    const padding = (size - (space * 2 + rectWidth * 3)) / 2

    return (
        <SvgIcon {...props}>
            <svg width={size} height={size} fill='none'>
                <rect
                    width={rectWidth}
                    height={rectHeight1}
                    x={padding}
                    y={size - rectHeight1}
                    fill='#909fac'
                />
                <rect
                    width={rectWidth}
                    height={rectHeight2}
                    x={padding + rectWidth + space}
                    y={size - rectHeight2}
                    fill='#f69061'
                />
                <rect
                    width={rectWidth}
                    height={rectHeight3}
                    x={padding + (rectWidth + space) * 2}
                    y={size - rectHeight3}
                    fill='#5b687a'
                />
            </svg>
        </SvgIcon>
    )
}
