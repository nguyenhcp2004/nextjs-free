import accountApiRequest from '@/apiRequests/account'
import Profile from '@/app/me/profile'
import ProfileForm from '@/app/me/profile-form'
import { cookies } from 'next/headers'
import React from 'react'

export default async function GetMePage() {
  const cookieStore = cookies()
  const sessionToken = cookieStore.get('sessionToken')
  // Vì dùng cookie nên api này không được cached trên server
  // https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#opting-out-of-data-caching
  const result = await accountApiRequest.me(sessionToken?.value ?? '')

  return (
    <div>
      <h1>Profile</h1>
      <div>Xin chào {result.payload.data.name}</div>
      {/* <Profile /> */}
      <ProfileForm profile={result.payload.data} />
    </div>
  )
}
