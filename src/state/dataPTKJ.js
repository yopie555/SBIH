import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export const stateDataPersentaseTingkatKemantapanJalan = create(
    persist(
        (set, get) => ({
            dataPersentaseTingkatKemantapanJalan: [],
            setDataPersentaseTingkatKemantapanJalan: (dataFetch) => set({ dataPersentaseTingkatKemantapanJalan: dataFetch }),
        }),
        {
            name: 'dataPersentaseTingkatKemantapanJalan', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
        },
    ),
)