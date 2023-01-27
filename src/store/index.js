import { atom, atomFamily, selector, selectorFamily } from 'recoil';
import _get from 'lodash/get';
import _set from 'lodash/set';
import produce from 'immer';
import { toggleLayerVisibilityEffect } from './effects';
import GlobalMapService from '../services/LeafletMapService';


export const exposedMapState = atom({
    key: 'exposedMapState',
    default: {
        ready: false,
    }
});

export const mapCenterSelector = selector({
    key: 'mapCenter',
    get: ({ get }) => {
        try {
            return get(exposedMapState).center
        } catch (error) {
            console.error(error)
        }
    },
    set: ({ set }, center) => {
        try {
            set(exposedMapState, (current) => {
                return produce(current, (draft) => ({ ...draft, center, ready: true }))
            })
        } catch (error) {
            console.error(error)
        }
    }
})

export const mapStateSelectorFamily = selectorFamily({
    key: 'mapStateSelectorFamily',
    get: (property) => ({ get }) => {
        try {
            return get(exposedMapState)[property]
        } catch (error) {
            console.error(error)
        }
    },
    set: (property) => ({ set }, value) => {
        try {
            set(exposedMapState, (current) => {
                return produce(current, (draft) => ({
                    ...draft,
                    [property]: value,
                    ready: true
                }))
            })
        } catch (error) {
            console.error(error)
        }
    }
})

// export const mapCenterQuery = selectorFamily({
//     key: 'MapCenterQuery',
//     get: (param = 'center') = () => {
//         if (!param) return undefined;
//         return GlobalMapService.map.getCenter();
//     } 
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
        return _get(layer, path);
    },
    set: ({ path, id }) => ({ get, set }, newValue) => {
        const layer = get(layersStateFamily(id));
        const updatedLayer = produce(layer, (draft) => _set(draft, path, newValue))
        return set(layersStateFamily(id), updatedLayer);
    },
})