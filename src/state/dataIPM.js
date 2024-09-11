import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export const stateDataIPM = create(
    persist(
        (set, get) => ({
            dataIPM: [],
            setDataIPM: (dataFetch) => set({ dataIPM: dataFetch }),
        }),
        {
            name: 'dataIPM', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
        },
    ),
)