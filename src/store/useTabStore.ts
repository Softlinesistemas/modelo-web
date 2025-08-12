
import { create } from 'zustand'

type TabStore = {
  AMIGOSTab: number
  gruposTab: number
  fornecedoresTab: number
  empresasTab: number
  setTab: (section: 'AMIGOSTab' | 'gruposTab' | 'fornecedoresTab' | 'empresasTab', index: number) => void
}

export const useTabStore = create<TabStore>((set) => ({
  AMIGOSTab: 0,
  gruposTab: 0,
  fornecedoresTab: 0,
  empresasTab: 0,
  setTab: (section, index) => set({ [section]: index }),
}))
