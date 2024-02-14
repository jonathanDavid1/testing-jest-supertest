const request = require("supertest")
const app = require('../app')

const BASE_URL = '/courses'

const courses = {
  name: 'algebra',
  credits: 10
}

let coursesId

test("POST -> '/courses' should return statusCode 201, res.body to be defined and res.body.name = courses.name", async () => {
  const res = await request(app)
    .post(BASE_URL)
    .send(courses)

  coursesId = res.body.id

  expect(res.status).toBe(201)
  expect(res.body).toBeDefined()
  expect(res.body.name).toBe(courses.name)
})

test("GET -> '/courses' should return status code 200 , res.body to be defined and res.body.length = 1", async () => {
  const res = await request(app)
    .get(BASE_URL)

  expect(res.statusCode).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body).toHaveLength(1)
})

test("GET -> '/courses/:id', should return statusCode 200, res.body to be defined and res.body.name to be courses.name", async () => {

  const res = await request(app)
    .get(`${BASE_URL}/${coursesId}`)

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.name).toBe(courses.name)
})

test("PUT -> '/courses/:id', should return statusCodew 200, res.body to be defined and res.body.name to be Analisis", async () => {
  const res = await request(app)
    .put(`${BASE_URL}/${coursesId}`)
    .send({ name: "Analisis" })

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.name).toBe('Analisis')
})

test("Delete -> '/coursess/:id' should return statusCode 204", async () => {
  const res = await request(app)
    .delete(`${BASE_URL}/${coursesId}`)

  expect(res.statusCode).toBe(204)
})