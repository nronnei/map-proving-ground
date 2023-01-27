import { useRecoilState } from "recoil";
import { editLayerState } from "../store";
import camelCase from 'lodash/camelCase';


const exposedProperties = [
    'attribution',
    'visible',
    'name',
    'opacity',
];

function createLayerAttrHook(path) {
    return function (id) {
        return useRecoilState(editLayerState({ path, id }));
    }
}

const layerAttrHooks = exposedProperties.reduce((hooks, path) => {
    console.log('running hook gen')
    const hookName = camelCase(`useLayer-${path}`);
    hooks[hookName] = createLayerAttrHook(path);
    return hooks
}, {});

export function useLayerAttrHooks() {
    return layerAttrHooks;
}