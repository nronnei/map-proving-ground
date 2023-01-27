import { useRecoilState } from "recoil";
import camelCase from 'lodash/camelCase';
import { editLayerState } from "../store";


const EXPOSED_PROPERTIES = [
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

const layerAttrHooks = EXPOSED_PROPERTIES.reduce((hooks, path) => {
    console.log(`running hook gen. should log ${EXPOSED_PROPERTIES.length} times.`)
    const hookName = camelCase(`useLayer-${path}`);
    hooks[hookName] = createLayerAttrHook(path);
    return hooks
}, {});

export function useLayerAttrHooks() {
    return layerAttrHooks;
}

// Wish I could just export this and destructure from it
// but it doesn't seem to work that way
export default layerAttrHooks;