const colorWithRandomHue = (): string => {
    let hue = 360 * Math.random();
    return 'hsl(' + hue + ', 100%, 75%)';
}

const colorLightWithRandomHue = (): string => {
    let hue = 360 * Math.random();
    return 'hsl(' + hue + ', 80%, 75%)';
}

const randomLightColor = (): string => {
    let r = 128 + (127 * Math.random());
    let g = 128 + (127 * Math.random());
    let b = 128 + (127 * Math.random());
    return 'rgb(' + r + ', ' + g + ', ' + b + ')';
}

const colorMethods = { colorWithRandomHue, colorLightWithRandomHue, randomLightColor };
export default colorMethods;