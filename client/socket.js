import io from 'socket.io-client';
import { observeSignaling } from 'cold-brew/rtc';

export default observeSignaling(io());
