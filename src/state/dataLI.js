import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export const stateDataLajuInflasi = create(
    persist(
        (set, get) => ({
            dataLajuInflasi: [],
            setDataLajuInflasi: (dataFetch) => set({ dataLajuInflasi: dataFetch }),
        }),
        {
            name: 'dataPenduduk', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
        },
    ),
)