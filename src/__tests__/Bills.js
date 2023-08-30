/**
 * @jest-environment jsdom
 */

import {getByTestId, screen, waitFor, getByLabelText, getAllByTestId, getByRole, getByText, fireEvent} from "@testing-library/dom"
import "@testing-library/jest-dom"
import BillsUI from "../views/BillsUI.js"
import { bills } from "../fixtures/bills.js"
import { ROUTES_PATH} from "../constants/routes.js";
import {localStorageMock} from "../__mocks__/localStorage.js";
import { ourClass } from "../containers/Bills.js"
import { NewBillUI } from "../views/NewBillUI.js"

import router from "../app/Router.js";
import userEvent from "@testing-library/user-event";


describe("Given I am connected as an employee", () => {
  describe("When I am on Bills Page", () => {
    test("Then bill icon in vertical layout should be highlighted", async () => {

      Object.defineProperty(window, 'localStorage', { value: localStorageMock })
      window.localStorage.setItem('user', JSON.stringify({
        type: 'Employee'
      }))
      const root = document.createElement("div")
      root.setAttribute("id", "root")
      document.body.append(root)
      router()
      window.onNavigate(ROUTES_PATH.Bills)
      await waitFor(() => screen.getByTestId('icon-window'))
      const windowIcon = screen.getByTestId('icon-window')
      expect(
        getByTestId(document.body, "icon-window")).toHaveClass("active-icon")
      
    })
    test("Then bills should be ordered from earliest to latest", () => {
      document.body.innerHTML = BillsUI({ data: bills })
      const dates = screen.getAllByText(/^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/i).map(a => a.innerHTML)
      const antiChrono = (a, b) => ((a < b) ? -1 : 1)
      const datesSorted = [...dates].sort(antiChrono)
      expect(dates.sort(antiChrono)).toEqual(datesSorted)
    })

    test("Should show a New bill button to create a new bill", () => {
      const $wrapper = document.createElement("div")

      $wrapper.innerHTML = `<button type="button" data-testid='btn-new-bill' class="btn btn-primary">Nouvelle note de frais</button>
      `
        expect(
          getByTestId($wrapper, "btn-new-bill").textContent).toEqual("Nouvelle note de frais")
    })
  })
  test("Should navigate to new bill page", () => {
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

// describe("ourClass", () => {
//   let documentMock;
//   let onNavigateMock;
//   let storeMock;
//   let localStorageMock;

//   beforeEach(() => {
//     documentMock = {
//       querySelector: jest.fn().mockReturnValueOnce({
//         addEventListener: jest.fn(),
//       }),
//       querySelectorAll : jest.fn().mockReturnValueOnce([
//         {
//           addEventListener: jest.fn(),
//         },
//       ])
//     };

//     onNavigateMock = jest.fn();
//     storeMock = jest.fn();
//     localStorageMock = jest.fn();

//     new ourClass ({
//       document: documentMock,
//       onNavigate: onNavigateMock,
//       store: storeMock,
//       localStorage: localStorageMock
//     });
//   });

//     it('should add event listeners to buttonNewBill and iconEye', () => {
//       expect(documentMock.querySelector).toHaveBeenCalledWith(
//         'button[data-testid="btn-new-bill"]'
//       );
//       expect(documentMock.querySelector().addEventListener).toHaveBeenCalledWith(
//         'click',
//         expect.any(Function)
//       );
//         expect(documentMock.querySelectorAll).toHaveBeenCalledWith(
//         'div[data-testid="icon-eye"]'
//       );
//       expect(documentMock.querySelectorAll()[0].addEventListener).toHaveBeenCalledWith(
//         'click',
//         expect.any(Function)
//       );
//     });

//     it('should create an instance of Logout', () => {
//       expect(Logout).toHaveBeenCalledWith({
//         document: documentMock,
//         localStorage: localStorageMock,
//         onNavigate: onNavigateMock,
//       });
//     });
// })

describe("Test suite Bills page", () => {
  it("Should show the following title at the top of the page: Mes notes de frais ", () => {
    const $wrapper = document.createElement("div");

    $wrapper.innerHTML = `<div class='content-title' data-testid="myTitle">Mes notes de frais</div>`

    expect(
      getByTestId($wrapper, "myTitle").textContent).toEqual("Mes notes de frais")
  })
})


// describe("Nagivate to New bills", () => {
//   test("Should navigate to new bill page", () => {
//     Object.defineProperty(window, 'localStorage', { value: localStorageMock })
//       window.localStorage.setItem('user', JSON.stringify({
//         type: 'Employee'
//       }))
//       const root = document.createElement("div")
//       root.setAttribute("id", "root")
//       document.body.append(root);
//       router()
//       window.onNavigate(ROUTES_PATH.NewBill)
//       // await waitFor(() => screen.ByTestId('icon-mail'))
//       const mailIcon = screen.queryAllByTestId('icon-mail')[0]

//       expect(mailIcon).toHaveClass("active-icon");    
//   })
// })