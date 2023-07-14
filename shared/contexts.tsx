import { createContext } from 'react';
import { _Guardian } from '../types';
import { ColorScheme } from '@mantine/core';

export const GuardianContext = createContext<{ user: { id: number; name: string } }[]>([]);
export const OrphanContext = createContext<{ id: number; name: string }[]>([]);
export const ColorSchemeContext = createContext<ColorScheme>('light');
