/**
 * distance between two points
 */
const pointDistance = (x1: number, y1: number, x2: number, y2: number): number => {
    const sideA = x2 - x1;
    const sideB = y2 - y1;
    return Math.sqrt(Math.pow(sideA, 2) + Math.pow(sideB, 2));
}

/**
 * angle between two points in radians
 */
const pointAngleRadians = (x1: number, y1: number, x2: number, y2: number): number => {
    return Math.atan2(y2 - y1, x2 - x1);
}

/**
 * angle between two points in degrees
 */
const pointAngleDegrees = (x1: number, y1: number, x2: number, y2: number): number => {
    return Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
}

const methods = { pointDistance, pointAngleRadians, pointAngleDegrees };
export default methods;