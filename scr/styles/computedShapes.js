/* eslint-disable prettier/prettier */
const computedCircle = (dimension) => ({
    height: dimension,
    width: dimension,
    borderRadius: dimension / 2
})

const computedSquare = (dimension) => ({
    height: dimension,
    width: dimension,
})

export default { computedCircle, computedSquare }