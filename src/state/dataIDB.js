import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export const stateDataIndeksDayaBeli = create(
    persist(
        (set, get) => ({
            dataIndeksDayaBeli: [],
            setDataIndeksDayaBeli: (dataFetch) => set({ dataIndeksDayaBeli: dataFetch }),
        }),
        {
            name: 'dataIndeksDayaBeli', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
        },
    ),
)