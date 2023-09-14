/**
 * @jest-environment jsdom
 */

import { fireEvent, screen ,  upload} from "@testing-library/dom"
import "@testing-library/jest-dom"
import userEvent from "@testing-library/user-event";
import NewBillUI from "../views/NewBillUI.js"
import NewBill from "../containers/NewBill.js"
import {localStorageMock} from "../__mocks__/localStorage.js";
import { ROUTES_PATH } from "../constants/routes.js";
import router from "../app/Router.js";
import { mockedBills } from "../__mocks__/store.js";
import { ROUTES } from "../constants/routes.js";



describe("Given I am connected as an employee", () => {
  describe("When I am on NewBill Page", () => {
    it("Then ...", () => {
      Object.defineProperty(window, 'localStorage', { value: localStorageMock })
      window.localStorage.setItem('user', JSON.stringify({
        type: 'Employee'
      }))
      const html = NewBillUI()
      document.body.innerHTML = html
      const $wrapper = document.querySelector(".content-title");
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
       const mailIcon = screen.queryAllByTestId('icon-mail')[0]

      expect(mailIcon).toHaveClass("active-icon");    
  })
})

describe('handle submit', () => {
  beforeAll(() => {
    document.body.innerHTML = NewBillUI();
  });

  it("Should handle file", async () => {
    const onNavigate = jest.fn();
    const newBill = new NewBill ({ document, onNavigate, mockedBills });

    const fileInput = screen.getByTestId("file");
    const file = new File(['hello'], 'hello.png', {type: 'image/png'});
    await userEvent.upload(fileInput, file);

    setTimeout(() => {
      expect(newBill.billId).toEqual('1234');
      // expect(newBill.fileUrl).toBe('https://localhost:3456/images/test.jpg');

    });
  });

  it("Should handle form", async () => {
    const onNavigate = (pathname) => {
      document.body.innerHTML = ROUTES({ pathname })
    };
    const newBill = new NewBill ({ document, onNavigate, mockedBills });

    const formElement = screen.getByTestId("form-new-bill");
    formElement.submit();

    const element = await screen.findByText('Mes notes de frais')
    expect(element).toBeInTheDocument();
  });
});



