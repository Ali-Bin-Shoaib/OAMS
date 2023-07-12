import { createContext } from 'react';
import { _Guardian } from '../types';

export const GuardianContext = createContext<_Guardian[]>([]);
export const OrphanContext = createContext<{ id: number; name: string }[]>([]);
