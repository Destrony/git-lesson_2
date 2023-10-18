// import ProfileStatus from "./ProfileStatus";
// import React from "react";
// import {create} from "react-test-renderer";
//
//
// describe("ProfileStatus component", () => {
//
//
//     test("after creation <span> should be" +
//         " displayed ", () => {
//         const component = create(<ProfileStatus status="it-kamasutra.com" />);
//         const root = component.root;
//         let span = root.findByType("span");
//         expect(span).not.toBeNull();
//     });
//     test("after creation <input> shouldn't be" +
//         " displayed ", () => {
//         const component = create(<ProfileStatus status="it-kamasutra.com" />);
//         const root = component.root;
//         expect(() => {
//             let input = root.findByType("span");
//         }).toThrow();
//     });
//
//
//     test("input should be displayed in editMode", () => {
//         const component = create(<ProfileStatus status="it-kamasutra.com" />);
//         const root = component.root;
//         let span = root.findByType("span");
//         span.props.onDoubleClick();
//         expect(span.children[0]).toBe("it-kamasutra.com");
//     });
// test("input should be displayed in editMode instead" +
//     " of span", () => {
//     const component = create(<ProfileStatus status="it-kamasutra.com" />);
//     const root = component.root;
//     let span = root.findByType("span");
//     span.props.onDoubleClick();
//     let input = root.findByType("input");
//     expect(input.props.value).toBe("it-kamasutra.com");
// });
// test("callback should be called", () => {
//     const mockCallback = jest.fn();
//     const component = create(<ProfileStatus status="it-kamasutra.com" updateStatus={mockCallback} />);
//     const instance = component.getInstance();
//     instance.deactivateEditMode();
//     expect(mockCallback.mock.calls.length).toBe(1);
// });
//
// });
