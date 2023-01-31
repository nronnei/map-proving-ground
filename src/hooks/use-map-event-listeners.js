import GlobalMapService from '../services/LeafletMapService';
import { useRecoilCallback } from 'recoil';
import { layerIdsState, layersStateFamily, mapStateSelectorFamily } from '../store';


export function useMapEventListeners() {

  // Callback for updating the layer IDs array (e.g. new layer, reorder)
  // Done in a callback so we don't subscribe the map component to updates.
  const addLayerId = useRecoilCallback(({ set }) => (newId) => {
    set(layerIdsState, (currentState) => Array.from(new Set([...currentState, newId])))
  }, []);

  // Callback for setting a layer in the store.
  const setLayer = useRecoilCallback(({ set }) => (layerConfig) => {
    set(layersStateFamily(layerConfig.id), layerConfig);
  }, []);

  const setMapProperty = useRecoilCallback(({ set }) => ({ prop, value }) => {
    set(mapStateSelectorFamily(prop), value);
  }, []);

  function registerMapEventListeners() {
    GlobalMapService.map.on('moveend', () => {
      const center = GlobalMapService.map.getCenter();
      setMapProperty({ prop: 'center', value: center })
    })
    GlobalMapService.map.on('zoom', () => {
      const zoom = GlobalMapService.map.getZoom();
      setMapProperty({ prop: 'zoom', value: zoom });
    })
    GlobalMapService.map.on('click', (e) => {
      console.log('clicked', e)
      setMapProperty({ prop: 'lastClick', value: JSON.stringify(e.latlng) });
    })
  }

  return [{ addLayerId, setLayer, setMapProperty }, registerMapEventListeners];
}