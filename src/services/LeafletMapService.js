export class LeafletMapService {
    constructor() {
        this._map = undefined;
        this._layers = []
    }

    get map() { return this._map }
    set map(value) { return this._map = value }

    addLayer(layerConfig) {
        const { id, url, layerType = "tileLayer", ...opts } = layerConfig;
        const oldLayer = this._layers[id];
        const newLayer = L.tileLayer(url, opts);
        newLayer.addTo(this._map);
        if (oldLayer) oldLayer.removeFrom(this._map);
        this._layers[id] = newLayer;
    }

    removeLayer(layerConfig) {
        const { id } = layerConfig;
        this._layers[id]?.removeFrom(this._map);
        delete this._layers[id];
    }

    invalidateMapSize(optsOrBool) {
        if (!this.map) return;
        this._map.invalidateSize(optsOrBool);
    }
}

export default (() => {
    return new LeafletMapService();
})();