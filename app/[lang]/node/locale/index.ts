// app/[lang]/vision/node/index.ts
import type { Dicts } from '@/components/locale';
import en from './en';
import ru from './ru';
import id from './id';

const dicts: Dicts<typeof en> = { en, ru, id };
export default dicts;