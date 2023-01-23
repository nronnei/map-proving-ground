import GlobalMapService from '../services/LeafletMapService';
// import { useLeafletLayers } from '../hooks/leaflet-hooks';

// const [_, { addToMap, removeFromMap }] = useLeafletLayers()


export async function toggleLayerVisibilityEffect({ onSet }) {
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