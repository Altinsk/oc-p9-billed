/**
 * @jest-environment jsdom
 */

import { screen } from "@testing-library/dom"
import "@testing-library/jest-dom"
import NewBillUI from "../views/NewBillUI.js"
import NewBill from "../containers/NewBill.js"
import {localStorageMock} from "../__mocks__/localStorage.js";
import { ROUTES_PATH} from "../constants/routes.js";
import router from "../app/Router.js";





describe("Given I am connected as an employee", () => {
  describe("When I am on NewBill Page", () => {
    it("Then ...", () => {
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

  it("Should navigate to new bill page", async () => {
    Object.defineProperty(window, 'localStorage', { value: localStorageMock })
      window.localStorage.setItem('user', JSON.stringify({
        type: 'Employee'
      }))
      const root = document.createElement("div")
      root.setAttribute("id", "root")
      document.body.append(root);
      router()
      window.onNavigate(ROUTES_PATH.NewBill)
      // await waitFor(() => screen.ByTestId('icon-mail'))
      const mailIcon = screen.queryAllByTestId('icon-mail')[0]

      expect(mailIcon).toHaveClass("active-icon");    
  })
})
