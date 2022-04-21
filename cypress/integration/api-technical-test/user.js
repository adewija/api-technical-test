import { assert, expect } from "chai"

describe("User Test Suites", function (){
  context("Production", function () {
    let responses = {}

    it("(+) Get User Login", function (){
      let username = "abcdef"
      let password = "12345"

      let method = "GET"
      let url = "https://petstore.swagger.io/v2/user/login?username=" + username + "&password=" + password
      let header = {
        accept: "application/json"
      }
      cy.request({
        method: method,
        url: url,
        headers: header
      }).then((response) =>{
        expect(response.status).to.be.ok
        expect(response.body.code).to.equal(200, "code")
        expect(response.body.type).to.equal("unknown", "type")
        expect(response.body.message).to.contains("logged in user session:", "message")
      })
    })

    it("(+) Post User Create", function (){
      let method = "POST"
      let url = "https://petstore.swagger.io/v2/user"
      let body = {
        "id": 77,
        "username": "johnlenon",
        "firstName": "John",
        "lastName": "Lenon",
        "email": "jlenon@abc.com",
        "password": "12345",
        "phone": "081234567890",
        "userStatus": 1
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
        expect(response.body.code).to.equal(200, "code")
        expect(response.body.type).to.equal("unknown", "type")
        expect(response.body.message).to.equal("77", "message")
      })
    })

    it('(+) Post User Create with Array', function (){
      let method = "POST"
      let url = "https://petstore.swagger.io/v2/user/createWithArray"
      let body = [
        {
          "id": 78,
          "username": "linanida",
          "firstName": "Lina",
          "lastName": "Nida",
          "email": "linanida@abc.com",
          "password": "12345",
          "phone": "081234567899",
          "userStatus": 1
        },
        {
          "id": 79,
          "username": "nidalili",
          "firstName": "Nida",
          "lastName": "Lili",
          "email": "nidalili@abc.com",
          "password": "12345",
          "phone": "081234567897",
          "userStatus": 1
        }
      ]
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
        expect(response.body.code).to.equal(200, "code")
        expect(response.body.type).to.equal("unknown", "type")
        expect(response.body.message).to.equal("ok", "message")
      })
    })

    it('(+) Post User Create with List', function (){
      let method = "POST"
      let url = "https://petstore.swagger.io/v2/user/createWithList"
      let body = [
        {
          "id": 80,
          "username": "bruceron",
          "firstName": "Bruce",
          "lastName": "Ron",
          "email": "ron@abc.com",
          "password": "12345",
          "phone": "081234567896",
          "userStatus": 1
        },
        {
          "id": 81,
          "username": "Ryanrun",
          "firstName": "Ryan",
          "lastName": "Run",
          "email": "run@abc.com",
          "password": "12345",
          "phone": "0812345678964",
          "userStatus": 1
        }
      ]
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
        expect(response.body.code).to.equal(200, "code")
        expect(response.body.type).to.equal("unknown", "type")
        expect(response.body.message).to.equal("ok", "message")
      })
    })

    it("(+) Get User By Username", function (){
      let username = "bruceron"
      let method = "GET"
      let url = "https://petstore.swagger.io/v2/user/" + username
      let header = {
        accept: "application/json",
      }
      cy.request({
        method: method,
        url: url,
        headers: header
      }).then((response) =>{
        responses.get_user = response.body
        expect(response.status).to.be.ok
        expect(response.body.id).to.equal(80, "id")
        expect(response.body.username).to.equal("bruceron", "username")
        expect(response.body.firstName).to.equal("Bruce", "firstName")
        expect(response.body.lastName).to.equal("Ron", "lastName")
        expect(response.body.email).to.equal("ron@abc.com", "email")
        expect(response.body.password).to.equal("12345", "password")
        expect(response.body.phone).to.equal("081234567896", "phone")
        expect(response.body.userStatus).to.equal(1, "userStatus")
      })
    })

    it("(+) Put User Update", function (){
      let username = responses.get_user.username
      let method = "PUT"
      let url = "https://petstore.swagger.io/v2/user/" + username
      let body = {
        "id": 80,
        "username": "bruceron",
        "firstName": "Bruce",
        "lastName": "Ron",
        "email": "ron@abc.com",
        "password": "111111",
        "phone": "0810000000",
        "userStatus": 1
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
        expect(response.body.code).to.equal(200, "code")
        expect(response.body.type).to.equal("unknown", "type")
        expect(response.body.message).to.equal("80", "message")
      })
    })

    it("(+) Delete User By Username", function (){
      let username = responses.get_user.username
      let method = "DELETE"
      let url = "https://petstore.swagger.io/v2/user/" + username
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
        expect(response.body.message).to.equal("bruceron", "message")
      })
    })

    it("(+) Get User Logout", function (){
      let method = "GET"
      let url = "https://petstore.swagger.io/v2/user/logout"
      let header = {
        accept: "application/json"
      }
      cy.request({
        method: method,
        url: url,
        headers: header
      }).then((response) =>{
        expect(response.status).to.be.ok
        expect(response.body.code).to.equal(200, "code")
        expect(response.body.type).to.equal("unknown", "type")
        expect(response.body.message).to.equal("ok", "message")
      })
    })

     it("(-) Get User By Username - User not Found", function (){
      let username = -1
      let method = "GET"
      let url = "https://petstore.swagger.io/v2/user/" + username
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
        expect(response.body.code).to.equal(1, "code")
        expect(response.body.type).to.equal("error", "type")
        expect(response.body.message).to.equal("User not found", "message")
      })
    })

    it("(-) Delete User By Username - User not Found", function (){
      let username = -1
      let method = "DELETE"
      let url = "https://petstore.swagger.io/v2/user/" + username
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
  })
})