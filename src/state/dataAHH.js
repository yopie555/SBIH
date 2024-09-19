import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export const stateDataAngkaHarapanHidup = create(
    persist(
        (set, get) => ({
            dataAngkaHarapanHidup: [],
            setDataAngkaHarapanHidup: (dataFetch) => set({ dataAngkaHarapanHidup: dataFetch }),
        }),
        {
            name: 'dataPenduduk', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
        },
    ),
)