import L from 'leaflet';
import { atom, atomFamily, selector, selectorFamily } from 'recoil';
import { useLeafletLayers } from '../hooks/leaflet-hooks';
import _get from 'lodash/get';
import _set from 'lodash/set';
import produce from 'immer';
import GlobalMapService from '../services/LeafletMapService';



export const mapState = atom({
    key: 'map',
    default: () => Promise.resolve(L.map("map", { center: [51.505, -0.09], zoom: 13 })),
    dangerouslyAllowMutability: true,
})

export const layerIdsState = atom({ key: 'layerIds', default: [] });

const [_, { addToMap, removeFromMap }] = useLeafletLayers()

async function propagateLayerToMapEffect({ onSet }) {
    console.log('Running layer effect');
    onSet((layer) => {
        try {
            if (!GlobalMapService.map) return;
            const method = layer.isVisible ? 'addLayer' : 'removeLayer';
            GlobalMapService[method](layer);
        } catch (error) {
            console.error(error);
        }
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