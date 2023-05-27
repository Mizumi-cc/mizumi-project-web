import { create } from "zustand"

import type { Alert } from "../utils/models"

type AlertState = {
  alerts: Alert[]
}

type Actions = {
  reset: () => void
  addAlert: (alert: Alert) => void
  removeAlert: (alert: Alert) => void
}

const initialState: AlertState = {
  alerts: []
}

const useAlertStore = create<AlertState & Actions>((set) => ({
  ...initialState,
  reset: () => set(initialState),
  addAlert: (alert) => set((state) => ({ alerts: [...state.alerts, alert] })),
  removeAlert: (alert) => set((state) => ({ alerts: state.alerts.filter((a) => a !== alert) }))
}))

export default useAlertStore
