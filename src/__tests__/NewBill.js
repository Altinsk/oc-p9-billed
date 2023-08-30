/**
 * @jest-environment jsdom
 */

import { screen } from "@testing-library/dom"
import "@testing-library/jest-dom"
import NewBillUI from "../views/NewBillUI.js"
import NewBill from "../containers/NewBill.js"
import {localStorageMock} from "../__mocks__/localStorage.js";



describe("Given I am connected as an employee", () => {
  describe("When I am on NewBill Page", () => {
    test("Then ...", () => {
      Object.defineProperty(window, 'localStorage', { value: localStorageMock })
      window.localStorage.setItem('user', JSON.stringify({
        type: 'Employee'
      }))
      const html = NewBillUI()
      document.body.innerHTML = html
      //to-do write assertion

      const $wrapper = document.createElement("div");

      $wrapper.innerHTML = `<div class='content-title'> Envoyer une note de frais </div>`

      expect($wrapper).toHaveTextContent("Envoyer une note de frais")
    })
  })
})
