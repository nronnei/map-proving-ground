import { useRecoilState } from "recoil";
import { editLayerState } from "../store";
// import camelCase from 'lodash/camelCase';


const exposedProperties = [
    'attribution',
    'visible',
    'name',
    'opacity',
];

function createLayerEditHook(path) {
    return function (id) {
        return useRecoilState(editLayerState({ path, id }));
    }
}

export const useLayerAttribution = createLayerEditHook('attribution');
export const useLayerVisible = createLayerEditHook('visible');
export const useLayerName = createLayerEditHook('name');
export const useLayerOpacity = createLayerEditHook('opacity');