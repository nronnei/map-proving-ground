import L from 'leaflet';
import { atom, atomFamily, selectorFamily } from 'recoil';
import { useLeafletLayers } from './leaflet-hooks';
import _get from 'lodash/get';
import _set from 'lodash/set';
import produce from 'immer';

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
        console.log('onSet', map)
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

export const editLayerState = selectorFamily({
    key: 'editLayer',
    get: ({ path, id }) => ({ get }) => {
        const layer = get(layersStateFamily(id));
        console.log('running get', { path, id }, layer)
        return _get(layer, path);
    },
    set: ({ path, id }) => ({ get, set }, newValue) => {
        const layer = get(layersStateFamily(id));
        console.log('running set', path, id, layer)
        const updatedLayer = produce(layer, (draft) => _set(draft, path, newValue))
        return set(layersStateFamily(id), updatedLayer);
    },
})