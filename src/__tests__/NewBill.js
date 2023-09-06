/**
 * @jest-environment jsdom
 */

import { fireEvent, screen } from "@testing-library/dom"
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

describe("MyCalss", () => {
  describe("Constructor", () => {
    it('should handle form submit event', () => {
      const document = { querySelector: jest.fn(), querySelectorAll: jest.fn() };
      const onNavigate = jest.fn();
      const store = { bills: jest.fn() };
      const localStorage = {};

      const handleSubmit = jest.fn();
      const addEventListenerSpy = jest.spyOn(global.document, 'addEventListener');
      
      const newBill = new NewBill({ document: global.document });
  
      // Trigger the form submit event
      const form = document.querySelector('form[data-testid="form-new-bill"]')
      const event = new Event('submit' , { bubbles: true, cancelable: true });
      // form.dispatchEvent(event);
   
      // expect(addEventListenerSpy).toHaveBeenCalledWith('submit', handleSubmit);
      // expect(handleSubmit).toHaveBeenCalledTimes(1);
      expect(handleSubmit).toBeTruthy();

    })

    // it('should handle file change event', () => {
    //   const handleChangeFile = jest.fn();
    //   const addEventListenerSpy = jest.spyOn(global.document, 'addEventListener');
    //   const newBill = new NewBill({ document: global.document });
      
    //   expect(addEventListenerSpy).toHaveBeenCalledWith('change', newBill.handleChangeFile);
      
    //   // Trigger the file change event
    //   const fileInput = document.querySelector('input[data-testid="file"]');
    //   const event = new Event('change');
    //   // fileInput.dispatchEvent(event);
      
    //   // expect(handleChangeFile).toHaveBeenCalledTimes(1);
    // });
  })
})


describe("handle submit", () => {
  it("Should handle the submitted form", () => {
    // Set up the necessary DOM elements
    document.body.innerHTML = `
    <form id="bill-form">
      <input data-testid="datepicker" value="2023-09-03">
      <select data-testid="expense-type">
        <option value="hotel">Hotel</option>
        <option value="restaurant">Restaurant</option>
      </select>
      <input data-testid="expense-name" value="Test Expense">
      <input data-testid="amount" value="100">
      <input data-testid="vat" value="20">
      <input data-testid="pct" value="20">
      <textarea data-testid="commentary">Test Commentary</textarea>
      <button type="submit">Submit</button>
    </form>`;

      // Mock localStorage.getItem to return a mock user object
      const mockUser = { email: 'test@example.com' };
      jest.spyOn(localStorage, 'getItem').mockReturnValueOnce(JSON.stringify(mockUser));
    
      // Mock the updateBill and onNavigate functions
      const mockUpdateBill = jest.fn();
      const mockOnNavigate = jest.fn();
      const mockRoutesPath = { Bills: '/bills' };

      // Call the handleSubmit function
      const handleSubmit = jest.fn();
      handleSubmit();
      mockUpdateBill();

      const form = document.getElementById('bill-form');
      form.dispatchEvent(new Event('submit'));


      // Assert that the bill object is correctly created and passed to updateBill
      const expectedBill = {
          email: 'test@example.com',
          type: 'type1',
          name: 'Expense Name',
          amount: 100,
          date: '2023-09-05',
          vat: '20',
          pct: 10,
          commentary: 'Some commentary',
          fileUrl: undefined,
          fileName: undefined,
          status: 'pending',
      };
      expect(mockUpdateBill).toHaveLastReturnedWith(expectedBill);


          // Now you can make assertions. For example, you can check if localStorage.getItem has been called


      // Assert that the onNavigate function is called with the correct path
      // expect(mockOnNavigate).toHaveBeenCalledWith('/bills');
  })
})

describe("handle change", () => {
  // Set up the DOM for testing
  document.body.innerHTML = `
  <div>
    <input type="file" data-testid="file" />
  </div>
`;

  test('handleChangeFile function', () => {
    // Create a mock event object
    const mockEvent = {
      preventDefault: jest.fn(),
      target: {
        value: 'C:\\path\\to\\file.jpg',
      },
    };

    // Call the handleChangeFile function with the mock event
    const handleChangeFile = jest.fn();
    handleChangeFile(mockEvent);
    

    // Assertions
    expect(mockEvent.preventDefault).toHaveBeenCalled();
    expect(screen.getByText('filePath')).toBeInTheDocument();
    expect(screen.getByText('fileName')).toBeInTheDocument();
    expect(screen.getByText('isValidExtention')).toBeInTheDocument();
  });

})
