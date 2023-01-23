import { atom, atomFamily, selectorFamily } from 'recoil';
import _get from 'lodash/get';
import _set from 'lodash/set';
import produce from 'immer';
import { toggleLayerVisibilityEffect } from './effects';

// export const mapState = atom({
//     key: 'map',
//     default: null,
//     dangerouslyAllowMutability: true,
// })

export const layerIdsState = atom({ key: 'layerIds', default: [] });

export const layersStateFamily = atomFamily({
    key: 'layers',
    default: {},
    effects: [
        toggleLayerVisibilityEffect
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