const request = require("supertest")
const app = require('../app')
const Student = require("../models/Student")
require('../models')

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

  //console.log(res.body);

  expect(res.statusCode).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body).toHaveLength(1)

  expect(res.body[0].students).toBeDefined()
  expect(res.body[0].students).toHaveLength(0)
})

test("GET -> '/courses/:id', should return statusCode 200, res.body to be defined and res.body.name to be courses.name", async () => {

  const res = await request(app)
    .get(`${BASE_URL}/${coursesId}`)

  // console.log(res.body);

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.name).toBe(courses.name)
  expect(res.body.students).toBeDefined()
  expect(res.body.students).toHaveLength(0)
})

test("PUT -> '/courses/:id', should return statusCodew 200, res.body to be defined and res.body.name to be Analisis", async () => {
  const res = await request(app)
    .put(`${BASE_URL}/${coursesId}`)
    .send({ name: "Analisis" })

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.name).toBe('Analisis')
})

test("Post -> '/courses:id/students', should return status code 200 and ...", async () => {

  const student = {
    firstName: "Jonatahn",
    lastName: "Hernandez",
    birthday: "1998-07-30",
    program: "Ingenieria"
  }

  const jonatahn = await Student.create(student)

  const res = await request(app)
    .post(`${BASE_URL}/${coursesId}/students`)
    .send([jonatahn.id])

  //console.log(res.body);

  expect(res.statusCode).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body).toHaveLength(1)
  expect(res.body.length).toBe(1)
  expect(res.body[0].courseStudents.courseId).toBe(coursesId)
  expect(res.body[0].courseStudents.studentId).toBe(jonatahn.id)

  //elimnar el estudainte 
  await jonatahn.destroy()


})

test("Delete -> '/courses/:id' should return statusCode 204", async () => {
  const res = await request(app)
    .delete(`${BASE_URL}/${coursesId}`)

  expect(res.statusCode).toBe(204)
})