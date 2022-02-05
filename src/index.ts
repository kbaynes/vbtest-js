import { Prisma, PrismaClient } from '@prisma/client'
import fastify, { FastifyRequest } from 'fastify'
import { request } from 'http'
import { ReadableStreamBYOBRequest } from 'stream/web'

const prisma = new PrismaClient()
const app = fastify()

/**
 * Create
 */
app.post<{
  Body: ICreateBlogPostBody
}>(`/posts`, async (req, res) => {
  const { title, content } = req.body
  const result = await prisma.blogPost.create({
    data: {
      title,
      content
    },
  })
  res.send(result)
})

/**
 * Update
 */
app.put<{
  Params: IPostByIdParam,
  Body: ICreateBlogPostBody
}>('/posts/:id', async (req, res) => {
  const { id } = req.params

  try {
    const { title, content } = req.body

    const updatedPost = await prisma.blogPost.update({
      where: { id: Number(id) || undefined },
      data: { title,content },
    })
    res.send(updatedPost)
  } catch (error) {
    res.send({ error: `Post with ID ${id} does not exist in the database` })
  }
})

/**
 * Get all posts
 */
app.get(`/posts`, async (req, res) => {
  const result = await prisma.blogPost.findMany()
  res.send(result)
})

/**
 * Get post by id
 */
app.get(`/posts/:id`, async (req: FastifyRequest, res) => {
  const params: any = req.params
  const id = parseInt(params['id'])

  const result = await prisma.blogPost.findUnique({
    where: {
      id: id,
    },
  })
  res.send(result)
})

/**
 * Delete all posts
 */
app.delete(`/posts`, async (req, res) => {
  const result = await prisma.blogPost.deleteMany({})
  res.send(result)
})

/**
 * Delete post by id
 */
 app.delete(`/posts/:id`, async (req: FastifyRequest, res) => {
  const params: any = req.params
  const id = parseInt(params['id'])

  const result = await prisma.blogPost.delete({
    where: {
      id: id,
    },
  })
  res.send(result)
})

interface ICreateBlogPostBody {
  title: string
  content: string | null
}

interface IPostByIdParam {
  id: number
}

app.listen(3000, (err) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`
  🚀 Server ready at: http://localhost:3000
  ⭐️ See sample requests: http://pris.ly/e/ts/rest-fastify#3-using-the-rest-api`)
})
