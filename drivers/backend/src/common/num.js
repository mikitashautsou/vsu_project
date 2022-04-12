
import { uuid } from 'uuidv4';

export const generateRandomNumber = () => uuid().replace(/-/g, '').toUpperCase()
