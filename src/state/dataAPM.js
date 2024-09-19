import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export const stateDataAngkaPartisipasiMurni = create(
    persist(
        (set, get) => ({
            dataAngkaPartisipasiMurni: [],
            setDataAngkaPartisipasiMurni: (dataFetch) => set({ dataAngkaPartisipasiMurni: dataFetch }),
        }),
        {
            name: 'dataPenduduk', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
        },
    ),
)