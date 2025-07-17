'use client'

import React, { createContext, useContext, useState } from 'react'

type NotificationMap = {
  [route: string]: boolean
}

const NotificationContext = createContext<{
  unread: NotificationMap
  setUnread: (route: string, hasUnread: boolean) => void
}>({
  unread: {},
  setUnread: () => {},
})

export const useNotifications = () => useContext(NotificationContext)

export const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
  const [unread, setUnreadMap] = useState<NotificationMap>({
    '/grupos': true,
    '/empresas': true,
  })

  function setUnread(route: string, hasUnread: boolean) {
    setUnreadMap(prev => ({ ...prev, [route]: hasUnread }))
  }

  return (
    <NotificationContext.Provider value={{ unread, setUnread }}>
      {children}
    </NotificationContext.Provider>
  )
}
