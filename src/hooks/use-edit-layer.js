import { useRecoilState } from "recoil";
import { editLayerState } from "../store";
import camelCase from 'lodash/camelCase';

export function useEditLayer(id) {

    const _genSelectors = (path) => {
        return useRecoilState(editLayerState({ path, id }));
    }

    const exposedProperties = [
        'attribution',
        'visible',
        'name',
        'opacity',
    ];

    const layer = {};
    const controller = {};

    exposedProperties.forEach(p => {
        const [getter, setter] = _genSelectors(p);
        layer[p] = getter;
        controller[camelCase(`set-${p}`)] = setter;
    })

    return [layer, controller];
}