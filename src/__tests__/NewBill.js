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

describe("Handle submit", () => {
  it("Should handle the submitted form", () => {
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

    const user = { email: 'test@example.com' };
    Storage.prototype.getItem = jest.fn(() => JSON.stringify(user));
    
    const form = document.getElementById('bill-form');
    form.dispatchEvent(new Event('submit'));

    // const updateBillSpy = jest.spyOn(YourClass.prototype, 'updateBill');
    // const onNavigateSpy = jest.spyOn(YourClass.prototype, 'onNavigate');

    // const expectedBill = {
    //   email: user.email,
    //   type: 'hotel',
    //   name: 'Test Expense',
    //   amount: 100,
    //   date: '2023-09-03',
    //   vat: '20',
    //   pct: 20,
    //   commentary: 'Test Commentary',
    //   fileUrl: undefined,
    //   fileName: undefined,
    //   status: 'pending'
    // };
    // expect(updateBillSpy).toHaveBeenCalledWith(expectedBill);
    // expect(onNavigateSpy).toHaveBeenCalledWith(ROUTES_PATH['Bills']);

    // it('should handle form submission', () => {
    //   document.body.innerHTML = `
    //     <form id="bill-form">
    //       <input data-testid="datepicker" value="2023-09-03">
    //       <select data-testid="expense-type">
    //         <option value="hotel">Hotel</option>
    //         <option value="restaurant">Restaurant</option>
    //       </select>
    //       <input data-testid="expense-name" value="Test Expense">
    //       <input data-testid="amount" value="100">
    //       <input data-testid="vat" value="20">
    //       <input data-testid="pct" value="20">
    //       <textarea data-testid="commentary">Test Commentary</textarea>
    //       <button type="submit">Submit</button>
    //     </form>`;
      
    //     const user = { email: 'test@example.com' };
    //     Storage.prototype.getItem = jest.fn(() => JSON.stringify(user));
        
    //     const updateBillSpy = jest.spyOn(YourClass.prototype, 'updateBill');
    //     const onNavigateSpy = jest.spyOn(YourClass.prototype, 'onNavigate');
        
    //     const form = document.getElementById('bill-form');
    //     form.dispatchEvent(new Event('submit'));
        
    //     const expectedBill = {
    //       email: user.email,
    //       type: 'hotel',
    //       name: 'Test Expense'
    //     }    
    // })
  })
})


// describe("handle Change", () => {
//   describe("Should have all the required data", () => {
//       const updateBill = jest.fn();
//       const onNavigate = jest.fn();
//     localStorage.getItem = jest.fn().mockImplementation(() => JSON.stringify({ email: "test@example.com" }));
//     document.querySelector = jest.fn();
//     document.querySelector.mockImplementation((selector) => {
//       switch (selector) {
//         case 'input[data-testid="datepicker"]':
//           return { value: '2023-03-09' };
//         // mock other elements here...
//         default:
//           return null;
//       }
//     });


//     test('handleSubmit', () => {
//       // const event = {
//       //   preventDefault: jest.fn(),
//       //   target: { querySelector: document.querySelector }
//       // };
//       // handleSubmit(event);
//       // expect(localStorage.getItem).toHaveBeenCalledWith("user");
//       // expect(this.updateBill).toHaveBeenCalledWith(/* expected bill object */);
//       // expect(this.onNavigate).toHaveBeenCalledWith(ROUTES_PATH['Bills']);
//     });
    

//     // jest.spyOn(event.target, 'querySelector')
//     // .mockReturnValueOnce({ value: 'expense-type-value' }) // Replace with the desired value
//     // .mockReturnValueOnce({ value: 'expense-name-value' }) // Replace with the desired value
//     // .mockReturnValueOnce({ value: 'amount-value' }) // Replace with the desired value
//     // .mockReturnValueOnce({ value: 'datepicker-value' }) // Replace with the desired value
//     // .mockReturnValueOnce({ value: 'vat-value' }) // Replace with the desired value
//     // .mockReturnValueOnce({ value: 'pct-value' }) // Replace with the desired value
//     // .mockReturnValueOnce({ value: 'commentary-value' }); // Replace with the desired value

//     // const form = screen.getAllByTestId('form-new-bill')[0];
//     // form.dispatchEvent(new Event('submit'));


    
//     // Now you can make assertions. For example, you can check if localStorage.getItem has been called
//     // expect(updateBill).toHaveBeenCalledWith({
//     //   email: 'user-email', // Replace with the desired value
//     //   type: 'expense-type-value', // Replace with the desired value
//     //   name: 'expense-name-value', // Replace with the desired value
//     //   amount: parseInt('amount-value'), // Replace with the desired value
//     //   date: 'datepicker-value', // Replace with the desired value
//     //   vat: 'vat-value', // Replace with the desired value
//     //   pct: parseInt('pct-value') || 20, // Replace with the desired value
//     //   commentary: 'commentary-value', // Replace with the desired value
//     //   fileUrl: undefined,
//     //   fileName: undefined,
//     //   status: 'pending'
//     // });    

//   })
//   it("Should handle any change", () => {
//     document.body.innerHTML = `
//       <input data-testid="file" type="file" />
//     `;
//     const input = document.querySelector('input[data-testid="file"]');
//     const mockFile = new File([""], "photo.png", { type: "image/png" });
//     // input.files = {
//     //   0: mockFile,
//     //   length: 1,
//     //   item: (index) => mockFile
//     // };

//     const mockEvent = {
//       preventDefault: jest.fn(),
//       target: { value: "C:\\fakepath\\photo.png" }
//     };

//     const newBill = new NewBill({ document, onNavigate,  localStorage})
//     newBill.handleChangeFile(mockEvent);

//     // expect(formData.get('file')).toBe(mockFile);
//     // expect(formData.get('email')).toBe(email);
//     // expect(isValidExtention).toBeTruthy();
    

    



//   })

// })
