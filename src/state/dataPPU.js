import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export const stateDataPersentasePendudukUsia = create(
    persist(
        (set, get) => ({
            dataPersentasePendudukUsia: [],
            setDataPersentasePendudukUsia: (dataFetch) => set({ dataPersentasePendudukUsia: dataFetch }),
        }),
        {
            name: 'dataPersentasePendudukUsia', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
        },
    ),
)