import InternalOverlay from './overlay';
import Popup from './popup';
import OverlayContext from './overlay-context';

const Overlay = InternalOverlay;
Overlay.Popup = Popup;
Overlay.OverlayContext = OverlayContext;

export default Overlay;
