import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export const stateDataAngkaMelekHuruf = create(
    persist(
        (set, get) => ({
            dataAngkaMelekHuruf: [],
            setDataAngkaMelekHuruf: (dataFetch) => set({ dataAngkaMelekHuruf: dataFetch }),
        }),
        {
            name: 'dataAngkaMelekHuruf', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
        },
    ),
)