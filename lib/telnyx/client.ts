import { TelnyxWrapper } from './wrapper';

const telnyxWrapper = new TelnyxWrapper(process.env.TELNYX_API_KEY || '');

export default telnyxWrapper;