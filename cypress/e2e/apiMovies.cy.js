/// <reference types="cypress" />
const apiData=require('../fixtures/apiData.json')
const apiUrl = Cypress.env('apiUrl')
const api_Key= Cypress.env('apiKey')
const token= `Bearer ${Cypress.env('token')}`

// Generated random page num between 1-500 
let randomNumber =  Math.floor(Math.random() * (500 - 1 + 1)) + 1;
let randomRating =  Math.floor(Math.random() * (10.0 - 0.5 + 1)) + 0.5;
let movieId;

describe("Testing GET top-rated Movies API",()=>{
    it("GET top rated movies with default page 1 result",()=>{
        cy.request({
            method:'GET',
            url:`${apiUrl}movie/top_rated`,
            qs:{api_key: api_Key}

        })
        .should((response)=>{
            expect(response.status).to.eq(200)
            expect(response.body.page).to.eq(1)
        })

    })
    it("Should display error message code 401 GET top rated movies with incorrect api_key",()=>{
        cy.request({
            method:'GET',
            url:`${apiUrl}movie/top_rated`,
            qs:{api_key: 'dasdsasddsaasddsaadsdsa'},
            failOnStatusCode: false

        })
        .should((response)=>{
            expect(response.status).to.eq(401)
            expect(response.body.page).not.exist
        })

    })
    it("Should not GET top rated movies with page=0",()=>{
        cy.request({
            method:'GET',
            url:`${apiUrl}movie/top_rated`,
            qs:{
                api_key: api_Key,
                page: apiData.topRated.pageZero
            },
            failOnStatusCode: false

        })
        .should((response)=>{
            expect(response.status).to.eq(422)
        })

    })
    it("Should GET top rated movies with max page",()=>{
        cy.request({
            method:'GET',
            url:`${apiUrl}movie/top_rated`,
            qs:{
                api_key: api_Key,
                page: apiData.topRated.pageMax
            },
            failOnStatusCode: false

        })
        .should((response)=>{
            expect(response.status).to.eq(200)
            expect(response.body.page).to.eq(apiData.topRated.pageMax)
        })

    })
    it("Should GET top rated movies with random page between 1-500",()=>{
        cy.request({
            method:'GET',
            url:`${apiUrl}movie/top_rated`,
            qs:{
                api_key: api_Key,
                page: randomNumber
            },
            failOnStatusCode: false

        })
        .should((response)=>{
            expect(response.status).to.eq(200)
            expect(response.body.page).to.eq(randomNumber)
            movieId= response.body.results[0].id
            
        })

    })

})

describe("Testing POST rate-Movies API tests",()=>{
    const body={
        value:randomRating
    }
    const bodyWrong={
        value:7.4
    }
    it("POST rate movies with random movieId everytime",()=>{
        cy.request({
            method:'POST',
            url:`${apiUrl}movie/${movieId}/rating`,
            qs:{
                api_key: api_Key
            },
            headers:{
                'Authorization':token,
                'Content-Type': 'application/json; charset=utf-8',
            },
            body:body,
            failOnStatusCode: false

        })
        .should((response)=>{
            expect(response.status).to.eq(201)
            expect(response.body.success).to.eq(true)
        })
    })
    it("POST with incorrect movieId reponse code should be 404",()=>{
        let wrongMovieId="adasddsaasdads";
        cy.request({
            method:'POST',
            url:`${apiUrl}movie/${wrongMovieId}/rating`,
            qs:{
                api_key: api_Key
            },
            headers:{
                'Authorization':token,
                'Content-Type': 'application/json; charset=utf-8',
            },
            body:body,
            failOnStatusCode: false

        })
        .should((response)=>{
            expect(response.status).to.eq(404)
            expect(response.body.success).to.eq(false)
        })

    })

    it("POST without token then reponse code should be 401",()=>{
        cy.request({
            method:'POST',
            url:`${apiUrl}movie/${movieId}/rating`,
            qs:{
                api_key: api_Key
            },
            headers:{
                'Content-Type': 'application/json; charset=utf-8',
            },
            body:body,
            failOnStatusCode: false

        })
        .should((response)=>{
            expect(response.status).to.eq(401)
            expect(response.body.success).to.eq(false)
        })

    })
    it("POST with incorrect rating not multiple of 0.5 then reponse code should be 400",()=>{
        cy.request({
            method:'POST',
            url:`${apiUrl}movie/${movieId}/rating`,
            qs:{
                api_key: api_Key
            },
            headers:{
                'Authorization':token,
                'Content-Type': 'application/json; charset=utf-8',
            },
            body:bodyWrong,
            failOnStatusCode: false

        })
        .should((response)=>{
            expect(response.status).to.eq(400)
            expect(response.body.success).to.eq(false)
            expect(response.body.status_code).to.eq(18)
        })

    })

    
})