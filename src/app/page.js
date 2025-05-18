import React from 'react'
import { auth } from './auth'; 
import { redirect } from 'next/navigation';
import Header from './header/header'
const page=async()=> {
  const session = await auth();
  if (!session) {
    redirect('/signin-or-signup');
  }
  return (
    <div>
      <Header></Header>
      <h1>This is Main page</h1>
    </div>
  )
}

export default page
