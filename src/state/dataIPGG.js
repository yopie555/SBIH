import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export const stateDataIndeksPemberdayaanGender = create(
    persist(
        (set, get) => ({
            dataIndeksPemberdayaanGender: [],
            setDataIndeksPemberdayaanGender: (dataFetch) => set({ dataIndeksPemberdayaanGender: dataFetch }),
        }),
        {
            name: 'dataIndeksPemberdayaanGender', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
        },
    ),
)