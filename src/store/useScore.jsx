import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

const useScore = create(
  persist(
    immer((set, get) => ({
      puntaje: {
        Antioquia: 0,
        Cundinamarca: 0,
        Santander: 0,
      },
      sumar: (tipo, puntos = 1) => set((state) => {
        // Asegurarnos que puntaje existe y tiene las propiedades
        if (!state.puntaje) {
          state.puntaje = {
            Antioquia: 0,
            Cundinamarca: 0,
            Santander: 0,
          };
        }
        // Inicializar si no existe el tipo
        if (typeof state.puntaje[tipo] !== 'number') {
          state.puntaje[tipo] = 0;
        }
        state.puntaje[tipo] += puntos;
      }),
      restar: (tipo, puntos = 1) => set((state) => {
        if (!state.puntaje) state.puntaje = {};
        if (typeof state.puntaje[tipo] !== 'number') {
          state.puntaje[tipo] = 0;
        }
        state.puntaje[tipo] -= puntos;
      }),
      reset: (tipo) => set((state) => {
        if (!state.puntaje) state.puntaje = {};
        state.puntaje[tipo] = 0;
      }),
    })),
    {
      name: 'score-storage',
      getStorage: () => sessionStorage,
      // Añade migración para corregir datos corruptos
      migrate: (persistedState, version) => {
        if (!persistedState) return {
          puntaje: {
            TitiCabeciblanco: 0,
            Danta: 0,
            MonoAraña: 0,
          }
        };
        
        // Corregir si puntaje se corrompió
        if (typeof persistedState.puntaje === 'number') {
          return {
            ...persistedState,
            puntaje: {
              Antioquia: 0,
            Cundinamarca: 0,
            Santander: 0,
            }
          };
        }
        
        return persistedState;
      }
    }
  )
);

export default useScore;