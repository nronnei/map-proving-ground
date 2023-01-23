import L from 'leaflet';

export function useLeafletLayers() {
    const layers = {};

    function addToMap(layerConfig, map) {
        const { id, url, layerType = "tileLayer", ...opts } = layerConfig;
        const oldLayer = layers[id];
        const newLayer = L.tileLayer(url, opts);
        newLayer.addTo(map);
        console.log('\n\nADD_TO_MAP\n\n', newLayer, oldLayer);
        if (oldLayer) oldLayer.removeFrom(map);
        layers[id] = newLayer;
    }

    function removeFromMap(layerConfig, map) {
        const { id } = layerConfig;
        layers[id]?.removeFrom(map);
        delete layers[id];
    };

    return [layers, { addToMap, removeFromMap }];
}