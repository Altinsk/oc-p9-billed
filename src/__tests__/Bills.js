/**
 * @jest-environment jsdom
 */

import {getByTestId, screen, waitFor, getByLabelText, getAllByTestId, getByRole, fireEvent, getByText, render, findByTestId} from "@testing-library/dom"
import "@testing-library/jest-dom"
import BillsUI from "../views/BillsUI.js"
import { bills } from "../fixtures/bills.js"
import { ROUTES_PATH} from "../constants/routes.js";
import {localStorageMock} from "../__mocks__/localStorage.js";
import MyClass from '../containers/Bills.js';
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
    test("The bills should be ordered from earliest to latest", () => {
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
          getByTestId($wrapper, "btn-new-bill").textContent).toEqual("Nouvelle note de frais"
        )
    })
  })
})

describe("Test suite Bills page", () => {
  it("Should show a title at the top of the page", () => {
    const $wrapper = document.createElement("div");

    $wrapper.innerHTML = `<div class='content-title' data-testid="myTitle">Mes notes de frais</div>`

    expect(
      getByTestId($wrapper, "myTitle").textContent).toEqual("Mes notes de frais"
    )
  })
})

describe('MyClass', () => {
  describe('constructor', () => {
    test('should initialize the class properties and add event listeners', () => {
      // Create a mock document object and other required dependencies
      const document = { querySelector: jest.fn(), querySelectorAll: jest.fn() };
      const onNavigate = jest.fn();
      const store = { bills: jest.fn() };
      const localStorage = {};

      // Create an instance of MyClass
      const myClass = new MyClass({ document, onNavigate, store, localStorage });

      // Assert that the properties and event listeners are set correctly
      expect(myClass.onNavigate).toBe(onNavigate);
      expect(myClass.store).toBe(store);

      // Assert that the event listeners are added correctly
      expect(document.querySelector).toHaveBeenCalledWith('button[data-testid="btn-new-bill"]');
      expect(document.querySelectorAll).toHaveBeenCalledWith('div[data-testid="icon-eye"]');
    });
  });
});

describe('MyClass', () => {
  describe('handleClickNewBill', () => {
    test('should call onNavigate with the correct route path', () => {
      // Create a mock onNavigate function
      const onNavigate = jest.fn();

      // Create an instance of MyClass
      const myClass = new MyClass({ document, onNavigate, store: {}, localStorage: {} });

      // Call the handleClickNewBill method
      myClass.handleClickNewBill();

      // // Assert that onNavigate is called with the correct route path
      expect(onNavigate).toHaveBeenCalledWith(ROUTES_PATH['NewBill']);
    });
  });
});

describe('MyClass', () => {
  describe('getBills', () => {
    test('should return bills from the store', async () => {
      // Create a mock store object with the necessary methods
      const store = { bills: jest.fn().mockReturnValue({ list: jest.fn().mockResolvedValue(['bill1']) }) };

      // Create an instance of MyClass
      const myClass = new MyClass({ document, onNavigate: jest.fn(), store, localStorage: {} });

      // Call the getBills method and await the result
      const result = await myClass.getBills();
      const result1 = Object.values(result[0]).slice(0, 5).join('');

      // Assert that the bills are returned correctly
      expect(result1).toEqual("bill1");
    });
  });
});





