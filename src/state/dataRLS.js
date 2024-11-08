import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export const stateDataLamaSekolah = create(
    persist(
        (set, get) => ({
            dataLamaSekolah: [],
            setDataLamaSekolah: (dataFetch) => set({ dataLamaSekolah: dataFetch }),
        }),
        {
            name: 'dataLamaSekolah', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
        },
    ),
)