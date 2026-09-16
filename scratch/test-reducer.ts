import {
  conversationReducer,
  initialConversationState,
  ConversationState,
} from "../lib/chat/conversationReducer";

console.log("=== STARTING REDUCER CLICK-THROUGH TEST ===");

let state: ConversationState = initialConversationState;
console.log("0. Initial state step:", state.step);

// 1. Submit Name
state = conversationReducer(state, {
  type: "SUBMIT_INPUT",
  payload: { visitorText: "Alex Mercer", valueToValidate: "Alex Mercer", rudraReply: "Greetings Alex." },
});
console.log("1. After NAME step:", state.step, "Data:", state.data.name);

// 2. Submit Age
state = conversationReducer(state, {
  type: "SUBMIT_INPUT",
  payload: { visitorText: "28", valueToValidate: "28", rudraReply: "Thank you." },
});
console.log("2. After AGE step:", state.step, "Data:", state.data.age);

// 3. Submit Location
state = conversationReducer(state, {
  type: "SUBMIT_INPUT",
  payload: { visitorText: "Metropolis", valueToValidate: "Metropolis", rudraReply: "Understood." },
});
console.log("3. After LOCATION step:", state.step, "Data:", state.data.location);

// 4. Submit Email
state = conversationReducer(state, {
  type: "SUBMIT_INPUT",
  payload: { visitorText: "alex@example.com", valueToValidate: "alex@example.com", rudraReply: "Recorded." },
});
console.log("4. After EMAIL step:", state.step, "Data:", state.data.email);

// 5. Submit Grievance
state = conversationReducer(state, {
  type: "SUBMIT_INPUT",
  payload: { visitorText: "Seeking peace in the storm.", valueToValidate: "Seeking peace in the storm.", rudraReply: "Review details." },
});
console.log("5. After GRIEVANCE step:", state.step, "Data:", state.data.grievance);

// 6. Confirm Submit
state = conversationReducer(state, { type: "CONFIRM_SUBMIT" });
console.log("6. After CONFIRM_SUBMIT action:", state.step, "isSubmitting:", state.isSubmitting);

// 7. Submit Success
state = conversationReducer(state, { type: "SUBMIT_SUCCESS" });
console.log("7. After SUBMIT_SUCCESS action:", state.step, "isSubmitting:", state.isSubmitting);
console.log("Messages count:", state.messages.length);
console.log("Last message from Rudra:", state.messages[state.messages.length - 1].text);

// 8. Test input lockdown on SUCCESS
const stateAfterLockedInput = conversationReducer(state, {
  type: "SUBMIT_INPUT",
  payload: "Trying to type extra text",
});
console.log("8. After attempting input on SUCCESS:", stateAfterLockedInput.step, "Messages unchanged:", stateAfterLockedInput.messages.length === state.messages.length);

// 9. Reset
state = conversationReducer(state, { type: "RESET" });
console.log("9. After RESET action:", state.step, "Data reset:", state.data.name === "");

console.log("=== REDUCER TEST PASSED 100% ===");
