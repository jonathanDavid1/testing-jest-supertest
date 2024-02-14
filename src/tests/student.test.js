/**
 * POST (1) ---------------
 * GET ALL (1)            |
 * GET ONE (1)            |
 * PUT (1)                |
 * DELETE (1) ------------
 */

const request = require("supertest")
const app = require('../app')

const BASE_URL = '/students'

const student = {
  firstName: 'Jonathan',
  lastName: " Hernandez",
  birthday: "1998-07-30",
  program: "Ing. de software"
}

let studentId


test("POST -> '/students' should return statusCode 201, res.body to be defined and res.body.firstName = student.firsstName", async () => {
  const res = await request(app)
    .post(BASE_URL)
    .send(student)

  studentId = res.body.id

  expect(res.status).toBe(201)
  expect(res.body).toBeDefined()
  expect(res.body.firstName).toBe(student.firstName)
})

test("GET -> '/students' should return status code 200 , res.body to be defined and res.body.length = 1", async () => {
  const res = await request(app)
    .get(BASE_URL)

  expect(res.statusCode).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body).toHaveLength(1)
})

test("GET -> '/students/:id', should return statusCode 200, res.body to be defined and res.body.firstName to be student.firstName", async () => {

  const res = await request(app)
    .get(`${BASE_URL}/${studentId}`)

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.firstName).toBe(student.firstName)
})

test("PUT -> '/students/:id', should return statusCodew 200, res.body to be defined and res.body.firstName to be David", async () => {
  const res = await request(app)
    .put(`${BASE_URL}/${studentId}`)
    .send({ firstName: "David" })

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.firstName).toBe('David')
})

test("Delete -> '/students/:id' should return statusCode 204", async () => {
  const res = await request(app)
    .delete(`${BASE_URL}/${studentId}`)

  expect(res.statusCode).toBe(204)

})