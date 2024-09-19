import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export const stateDataAngkaKematianIbuMelahirkan = create(
    persist(
        (set, get) => ({
            dataAngkaKematianIbuMelahirkan: [],
            setDataAngkaKematianIbuMelahirkan: (dataFetch) => set({ dataAngkaKematianIbuMelahirkan: dataFetch }),
        }),
        {
            name: 'dataPenduduk', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
        },
    ),
)