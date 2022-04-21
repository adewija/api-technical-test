import { assert, expect } from "chai"

describe('Pet Test Suites', function (){
  context('Production', function () {
    let responses = {}

    it('(+) Post Pet Create', function (){
      let method = "POST"
      let url = "https://petstore.swagger.io/v2/pet"
      let body = { 
        "id": 99,
        "category": {
          "id": 98,
          "name": "cat"
        },
        "name": "Catty",
        "photoUrls": [
          "catty.png"
        ],
        "tags": [
          {
            "id": 98,
            "name": "cat"
          }
        ],
        "status": "available"
      }
      let header = {
        accept: "application/json",
        "Content-Type": "application/json"
      }
      cy.request({
        method: method,
        url: url,
        body: body,
        headers: header
      }).then((response) =>{
        responses.create_pet = response.body
        expect(response.status).to.be.ok
        expect(response.body.id).to.equal(99, "id")
        expect(response.body.category.id).to.equal(98, "category_id")
        expect(response.body.category.name).to.equal("cat", "category_name")
        expect(response.body.name).to.equal("Catty", "name")
        expect(response.body.photoUrls[0]).to.equal("catty.png", "photoUrls")
        expect(response.body.tags[0].id).to.equal(98, "tags_id")
        expect(response.body.tags[0].name).to.equal("cat", "tags_name")
        expect(response.body.status).to.equal("available", "status")
      })
    })

    it("(+) Put Update an Existing Pet", function (){
      let method = "POST"
      let url = "https://petstore.swagger.io/v2/pet"
      let body = {
        "id": 99,
        "category": {
          "id": 98,
          "name": "cat"
        },
        "name": "CattyBanana",
        "photoUrls": [
          "cattybanana.png"
        ],
        "tags": [
          {
            "id": 98,
            "name": "cat"
          }
        ],
        "status": "available"
      }
      let header = {
        accept: "application/json",
        "Content-Type": "application/json"
      }
      cy.request({
        method: method,
        url: url,
        body: body,
        headers: header
      }).then((response) =>{
        expect(response.status).to.be.ok
        expect(response.body.id).to.equal(99, "id")
        expect(response.body.category.id).to.equal(98, "category_id")
        expect(response.body.category.name).to.equal("cat", "category_name")
        expect(response.body.name).to.equal("CattyBanana", "name")
        expect(response.body.photoUrls[0]).to.equal("cattybanana.png", "photoUrls")
        expect(response.body.tags[0].id).to.equal(98, "tags_id")
        expect(response.body.tags[0].name).to.equal("cat", "tags_name")
        expect(response.body.status).to.equal("available", "status")
      })
    })

    it("(+) Get Find Pet By ID", function (){
      let id = responses.create_pet.id
      let method = "GET"
      let url = "https://petstore.swagger.io/v2/pet/" + id
      let header = {
        accept: 'application/json',
      }
      cy.request({
        method: method,
        url: url,
        headers: header
      }).then((response) =>{
        expect(response.status).to.be.ok
        expect(response.body.id).to.equal(99, "id")
        expect(response.body.category.id).to.equal(98, "category_id")
        expect(response.body.category.name).to.equal("cat", "category_name")
        expect(response.body.name).to.equal("CattyBanana", "name")
        expect(response.body.photoUrls[0]).to.equal("cattybanana.png", "photoUrls")
        expect(response.body.tags[0].id).to.equal(98, "tags_id")
        expect(response.body.tags[0].name).to.equal("cat", "tags_name")
        expect(response.body.status).to.equal("available", "status")
      })
    })

    it('(+) Post Update a Pet with Form Data', function (){
      let pet_id = responses.create_pet.id
      let method = "POST"
      let url = "https://petstore.swagger.io/v2/pet/" + pet_id
      let body = {
        "name": "CattyUpdated",
        "status": "sold",
      }
      let header = {
        accept: 'application/json',
        "Content-Type": "application/x-www-form-urlencoded"
      }
      cy.request({
        method: method,
        url: url,
        body: body,
        headers: header
      }).then((response) =>{
        expect(response.status).to.be.ok
        expect(response.body.code).to.equal(200, "code")
        expect(response.body.type).to.equal("unknown", "type")
        expect(response.body.message).to.equal("99", "message")
      })
    })

    it.skip('(+) Post Upload Image', function (){
      let pet_id = responses.create_pet.id
      let additional_data = "new image"

      let method = "POST"
      let url = "https://petstore.swagger.io/v2/pet/" + pet_id + "/uploadImage"
      let header = {
        accept: "application/json",
        "Content-Type": "multipart/form-data; boundary=----WebKitFormBoundarym9LSkAHcAgbUa15a",
        additionalMetadata: additional_data,
        file: "@cypress/integration/api-technical-test/resources/test.png; type=image/jpeg",
      }
      cy.request({
        method: method,
        url: url,
        headers: header
      }).then((response) =>{
        expect(response.status).to.be.ok
        expect(response.body.code).to.equal(200, "code")
        expect(response.body.type).to.equal("unknown", "type")
        expect(response.body.message).to.contains("File uploaded", "message")
      })
    })

    it("(+) Delete Pet By ID", function (){
      let pet_id = responses.create_pet.id
      let method = "DELETE"
      let url = "https://petstore.swagger.io/v2/pet/" + pet_id
      let header = {
        accept: "application/json",
      }
      cy.request({
        method: method,
        url: url,
        headers: header
      }).then((response) =>{
        expect(response.status).to.be.ok
        expect(response.body.code).to.equal(200, "code")
        expect(response.body.type).to.equal("unknown", "type")
        expect(response.body.message).to.equal("99", "message")
      })
    })

    it("(+) Get Find Pets by Status", function (){
      let pet_status = "sold"
      let method = "GET"
      let url = "https://petstore.swagger.io/v2/pet/findByStatus?status=" + pet_status
      let header = {
        accept: "application/json",
        "Content-Type": "application/json"
      }
      cy.request({
        method: method,
        url: url,
        headers: header
      }).then((response) =>{
        expect(response.status).to.be.ok
        expect(response.body[0].id).to.exist
        expect(response.body[0].name).to.exist
        expect(response.body[0].photoUrls).to.exist
        expect(response.body[0].tags).to.exist
        expect(response.body[0].status).to.exist
      })
    })

    it("(-) Get Find Pet By ID - Pet ID not Found", function (){
      let id = -1
      let method = "GET"
      let url = "https://petstore.swagger.io/v2/pet/" + id
      let header = {
        accept: 'application/json',
      }
      cy.request({
        failOnStatusCode: false,
        method: method,
        url: url,
        headers: header
      }).then((response) =>{
        expect(response.status).to.equal(404, "status")
        expect(response.body.code).to.equal(1, "code")
        expect(response.body.type).to.equal("error", "type")
        expect(response.body.message).to.equal("Pet not found", "message")
      })
    })

    it('(-) Post Update a Pet with Form Data - Pet ID not Found', function (){
      let pet_id = -1
      let method = "POST"
      let url = "https://petstore.swagger.io/v2/pet/" + pet_id
      let body = {
        "name": "CattyUpdated",
        "status": "sold",
      }
      let header = {
        accept: 'application/json',
        "Content-Type": "application/x-www-form-urlencoded"
      }
      cy.request({
        failOnStatusCode: false,
        method: method,
        url: url,
        body: body,
        headers: header
      }).then((response) =>{
        expect(response.status).to.equal(404, "status")
        expect(response.body.code).to.equal(404, "code")
        expect(response.body.type).to.equal("unknown", "type")
        expect(response.body.message).to.equal("not found", "message")
      })
    })

    it("(-) Delete Pet By ID - Pet ID not Found", function (){
      let pet_id = -1
      let method = "DELETE"
      let url = "https://petstore.swagger.io/v2/pet/" + pet_id
      let header = {
        accept: "application/json",
      }
      cy.request({
        failOnStatusCode: false,
        method: method,
        url: url,
        headers: header
      }).then((response) =>{
        expect(response.status).to.equal(404, "status")
      })
    })

    it("(-) Get Find Pets by Status - Status not Found", function (){
      let pet_status = -1
      let method = "GET"
      let url = "https://petstore.swagger.io/v2/pet/findByStatus?status=" + pet_status
      let header = {
        accept: "application/json",
        "Content-Type": "application/json"
      }
      cy.request({
        failOnStatusCode: false,
        method: method,
        url: url,
        headers: header
      }).then((response) =>{
        expect(response.status).to.be.ok
        expect(response.body).to.have.length(0)
      })
    })
  })
})