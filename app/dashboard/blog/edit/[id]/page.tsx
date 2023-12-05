import React from 'react'
import EditForm from './components/EditForm'
import { IBlogDetial } from '@/lib/types'
import { readBlogContentById } from '@/lib/actions/blog'

export default async function page({params} : {params: {id: string}}) {

    const {data: blog} = await readBlogContentById(params.id)

  return (
    <EditForm blog={blog as IBlogDetial} />
  )
}
