import { atom, selector, atomFamily } from 'recoil'

export const layerStateFamily = atomFamily({
    key: 'layerStateFamily',
    default: {
        type: "FeatureCollection",
        features: []
    }
})

export const layerGroupFamily = atomFamily({
    key: "layerGroupFamily",
    default: []
})
