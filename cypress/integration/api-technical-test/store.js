import { assert, expect } from "chai"

describe("Store Test Suites", function (){
  context("Production", function () {
    let responses = {}

    it("(+) Post Create Order for Pet", function (){
      let method = "POST"
      let url = "https://petstore.swagger.io/v2/store/order"
      let body = {
        "id": 99,
        "petId": 88,
        "quantity": 0,
        "shipDate": "2022-04-20T13:13:51.080Z",
        "status": "placed",
        "complete": true
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
        responses.store_order = response.body
        expect(response.status).to.be.ok
        expect(response.body.id).to.equal(99, "id")
        expect(response.body.petId).to.equal(88, "petId")
        expect(response.body.quantity).to.equal(0, "quantity")
        expect(response.body.shipDate).to.contains("2022-04-20", "shipDate")
        expect(response.body.status).to.equal("placed", "status")
        expect(response.body.complete).to.be.true
      })
    })

    it("(+) Get Store Order by ID", function (){
      let order_id = responses.store_order.id
      let method = "GET"
      let url = "https://petstore.swagger.io/v2/store/order/" + order_id
      let header = {
        accept: "application/json",
      }
      cy.request({
        method: method,
        url: url,
        headers: header
      }).then((response) =>{
        expect(response.status).to.be.ok
        expect(response.body.id).to.equal(99, "id")
        expect(response.body.petId).to.equal(88, "petId")
        expect(response.body.quantity).to.equal(0, "quantity")
        expect(response.body.shipDate).to.contains("2022-04-20", "shipDate")
        expect(response.body.status).to.equal("placed", "status")
        expect(response.body.complete).to.be.true
      })
    })

    it("(+) Delete Store Order by ID", function (){
      let order_id = responses.store_order.id
      let method = "DELETE"
      let url = "https://petstore.swagger.io/v2/store/order/" + order_id
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

    it("(+) Get Store Inventory", function (){
      let method = "GET"
      let url = "https://petstore.swagger.io/v2/store/inventory"
      let header = {
        accept: 'application/json'
      }
      cy.request({
        method: method,
        url: url,
        headers: header
      }).then((response) =>{
        expect(response.status).to.be.ok
        expect(response.body.sold).to.exist
      })
    })

    it("(-) Get Store Order by ID - Order ID not Found", function (){
      let order_id = -1
      let method = "GET"
      let url = "https://petstore.swagger.io/v2/store/order/" + order_id
      let header = {
        accept: "application/json",
      }
      cy.request({
        method: method,
        failOnStatusCode: false,
        url: url,
        headers: header
      }).then((response) =>{
        expect(response.status).to.equal(404, "status")
        expect(response.body.code).to.equal(1, "code")
        expect(response.body.type).to.equal("error", "type")
        expect(response.body.message).to.equal("Order not found", "message")
      })
    })

    it("(-) Delete Store Order by ID - Order ID not Found", function (){
      let order_id = -1
      let method = "DELETE"
      let url = "https://petstore.swagger.io/v2/store/order/" + order_id
      let header = {
        accept: "application/json",
      }
      cy.request({
        method: method,
        failOnStatusCode: false,
        url: url,
        headers: header
      }).then((response) =>{
        expect(response.status).to.equal(404, "status")
        expect(response.body.code).to.equal(404, "code")
        expect(response.body.type).to.equal("unknown", "type")
        expect(response.body.message).to.equal("Order Not Found", "message")
      })
    })
  })
})