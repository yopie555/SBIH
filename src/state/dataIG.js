import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export const stateDataIndeksGini = create(
    persist(
        (set, get) => ({
            dataIndeksGini: [],
            setDataIndeksGini: (dataFetch) => set({ dataIndeksGini: dataFetch }),
        }),
        {
            name: 'dataIndeksGini', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
        },
    ),
)