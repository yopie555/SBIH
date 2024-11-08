import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export const stateDataVideo = create(
    persist(
        (set, get) => ({
            dataVideo: [],
            setDataVideo: (dataFetch) => set({ dataVideo: dataFetch }),
        }),
        {
            name: 'dataVideo', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
        },
    ),
)