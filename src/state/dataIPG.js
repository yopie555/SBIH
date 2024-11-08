import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export const stateDataIndeksPembangunanGender = create(
    persist(
        (set, get) => ({
            dataIndeksPembangunanGender: [],
            setDataIndeksPembangunanGender: (dataFetch) => set({ dataIndeksPembangunanGender: dataFetch }),
        }),
        {
            name: 'dataIndeksPembangunanGender', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
        },
    ),
)