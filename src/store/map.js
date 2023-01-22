import L from 'leaflet';
import { atom, atomFamily, selectorFamily } from 'recoil';
import { useLeafletLayers } from './leaflet-hooks';


export const mapState = atom({
    key: 'map',
    default: null,
    dangerouslyAllowMutability: true,
})

const [_, { addToMap, removeFromMap }] = useLeafletLayers()

async function propagateLayerToMapEffect({ onSet, getPromise }) {
    console.log('Running layer effect');
    onSet(async (layer) => {
        const map = await getPromise(mapState);
        if (!map) return;
        try {
            console.log('Inside onSet, and layer isVisible:', layer);
            (layer.isVisible ? addToMap : removeFromMap)(layer, map);
        } catch (error) {
            console.error(error);
        }
        return;
    })
}

export const layersStateFamily = atomFamily({
    key: 'layers',
    default: {},
    effects: [
        propagateLayerToMapEffect
    ]
})
