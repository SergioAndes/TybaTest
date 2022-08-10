const request = require('supertest')
const app =require('../../app')
const endpointUrl = '/restaurant/getRestaurants'
const mockData = require('../mock-data/get-restaurant.json')
const testUser = require('../mock-data/user-login.json')
const path = require('path')


//This is a simple happy path integration test
let token

describe('Get Restaurant List & user transactions',()=>{

    test('POST /user/login', async ()=>{
        const response = await request(app)
        .post('/user/login')
        .send(testUser)
        expect(response.statusCode).toBe(200)
        expect(typeof response.body.token).toBe("string")
        token = response.body.token
    })

    test('POST '+endpointUrl, async ()=>{
        const response = await request(app)
        .post(endpointUrl)
        .send(mockData)
        .set('Authorization', 'Bearer '+ token) 
        expect(response.statusCode).toBe(200)
        expect(typeof response.body.next_page_token).toBe("string")
    })

    test('GET /restaurant/transactions', async ()=>{
        const response = await request(app)
        .get('/restaurant/transactions')
        .send()
        .set('Authorization', 'Bearer '+ token) 
        expect(response.statusCode).toBe(200)
        console.log(response.body)
        expect(response.body[0].creator).toBe(testUser.userId)
    })
})
