import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export const stateDataAngkaHarapanLamaSekolah = create(
    persist(
        (set, get) => ({
            dataAngkaHarapanLamaSekolah: [],
            setDataAngkaHarapanLamaSekolah: (dataFetch) => set({ dataAngkaHarapanLamaSekolah: dataFetch }),
        }),
        {
            name: 'dataPenduduk', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
        },
    ),
)