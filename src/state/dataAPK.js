import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export const stateDataAngkaPartisipasiKasar = create(
    persist(
        (set, get) => ({
            dataAngkaPartisipasiKasar: [],
            setDataAngkaPartisipasiKasar: (dataFetch) => set({ dataAngkaPartisipasiKasar: dataFetch }),
        }),
        {
            name: 'dataPenduduk', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
        },
    ),
)