import { FC } from 'react';
import Geometry from '../utils/Geometry';
import "./LineView.css"

type LineViewProps = {
    x1: number,
    y1: number,
    x2: number,
    y2: number
}

/**
 * a thin line that goes from point (x1, y1) to point (x2, y2)
 */
const LineView: FC<LineViewProps> = ({ x1, y1, x2, y2 }) => {
    const mid_X = (x1 + x2) / 2
    const mid_Y = (y1 + y2) / 2
    const distance = Geometry.pointDistance(x1, y1, x2, y2);
    const angle = Geometry.pointAngleDegrees(x1, y1, x2, y2);

    return (
        <div className='line' style={{
            left: mid_X - (distance / 2),
            top: mid_Y,
            width: distance,
            transform: `rotate(${angle}deg)`
        }}>
        </div>
    );
}

export default LineView;