import { VisitorRequest } from "@/types/visitor-request";

export type ConversationStep =
  | "WELCOME"
  | "NAME"
  | "AGE"
  | "LOCATION"
  | "EMAIL"
  | "GRIEVANCE"
  | "CONFIRM"
  | "SUBMITTING"
  | "SUCCESS"
  | "ERROR";

export interface ChatMessage {
  id: string;
  sender: "rudra" | "visitor";
  text: string;
  timestamp: string;
}

export interface ConversationData {
  name: string;
  age: number | null;
  location: string;
  email: string;
  grievance: string;
}

export interface ConversationState {
  step: ConversationStep;
  data: ConversationData;
  messages: ChatMessage[];
  validationError: string | null;
  isSubmitting: boolean;
}

export type SubmitInputPayload =
  | string
  | {
      visitorText: string;
      valueToValidate?: string | null;
      rudraReply?: string;
    };

export type ConversationAction =
  | { type: "INIT_TIMESTAMP"; payload: string }
  | { type: "SUBMIT_INPUT"; payload: SubmitInputPayload }
  | { type: "CONFIRM_SUBMIT" }
  | { type: "SUBMIT_SUCCESS" }
  | { type: "SUBMIT_ERROR"; payload: string }
  | { type: "RETRY_SUBMIT" }
  | { type: "RESET" }
  | { type: "SET_ERROR"; payload: string };

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isValidNameOrLocation(val: string): boolean {
  if (!val || val.length < 2 || val.length > 50) return false;
  if (/[.!?]/.test(val)) return false;
  const wordCount = val.trim().split(/\s+/).filter(Boolean).length;
  if (wordCount > 4) return false;
  return true;
}

function getTimestamp(): string {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export const initialConversationState: ConversationState = {
  step: "NAME",
  data: {
    name: "",
    age: null,
    location: "",
    email: "",
    grievance: "",
  },
  messages: [
    {
      id: "init-welcome",
      sender: "rudra",
      text: "Welcome to Rudra's sanctuary. I am listening through the storm. To begin, what is your name?",
      timestamp: "",
    },
  ],
  validationError: null,
  isSubmitting: false,
};

export function conversationReducer(
  state: ConversationState,
  action: ConversationAction
): ConversationState {
  switch (action.type) {
    case "INIT_TIMESTAMP":
      return {
        ...state,
        messages: state.messages.map((msg) =>
          msg.id === "init-welcome" && !msg.timestamp
            ? { ...msg, timestamp: action.payload }
            : msg
        ),
      };

    case "RESET":
      return {
        ...initialConversationState,
        messages: [
          {
            id: `reset-${Date.now()}`,
            sender: "rudra",
            text: "Welcome to Rudra's sanctuary. I am listening through the storm. To begin, what is your name?",
            timestamp: getTimestamp(),
          },
        ],
      };

    case "SET_ERROR":
      return {
        ...state,
        validationError: action.payload,
      };

    case "CONFIRM_SUBMIT":
      if (state.step !== "CONFIRM" && state.step !== "ERROR") return state;
      return {
        ...state,
        step: "SUBMITTING",
        isSubmitting: true,
        validationError: null,
      };

    case "SUBMIT_SUCCESS":
      return {
        ...state,
        step: "SUCCESS",
        isSubmitting: false,
        validationError: null,
        messages: [
          ...state.messages,
          {
            id: `msg-success-${Date.now()}`,
            sender: "rudra",
            text: "Your request has been recorded into the Rudra Sentinel archive. Your burden has been acknowledged. Peace be with you through the storm.",
            timestamp: getTimestamp(),
          },
        ],
      };

    case "SUBMIT_ERROR":
      return {
        ...state,
        step: "ERROR",
        isSubmitting: false,
        validationError: action.payload,
      };

    case "RETRY_SUBMIT":
      return {
        ...state,
        step: "CONFIRM",
        isSubmitting: false,
        validationError: null,
      };

    case "SUBMIT_INPUT": {
      let visitorText: string;
      let rawValue: string;
      let customRudraReply: string | undefined;

      if (typeof action.payload === "string") {
        visitorText = action.payload;
        rawValue = action.payload;
        customRudraReply = undefined;
      } else {
        visitorText = action.payload.visitorText;
        rawValue = action.payload.valueToValidate ?? action.payload.visitorText;
        customRudraReply = action.payload.rudraReply;
      }

      const trimmedVisitorText = (visitorText || "").trim();
      const trimmedValue = (rawValue || "").trim();
      const currentTimestamp = getTimestamp();

      // Enforce strict validation rules per step
      switch (state.step) {
        case "WELCOME":
        case "NAME": {
          const visitorMsg: ChatMessage = {
            id: `msg-vis-${Date.now()}`,
            sender: "visitor",
            text: trimmedVisitorText || trimmedValue,
            timestamp: currentTimestamp,
          };

          const isInvalid = !isValidNameOrLocation(trimmedValue);

          const rudraMsg: ChatMessage = {
            id: `msg-rud-${Date.now()}`,
            sender: "rudra",
            text: customRudraReply || (isInvalid ? "Please provide a valid name (2 to 50 characters, no full sentences)." : `Greetings, ${trimmedValue}. How old are you?`),
            timestamp: currentTimestamp,
          };

          if (isInvalid) {
            return {
              ...state,
              messages: [...state.messages, visitorMsg, rudraMsg],
              validationError: "Please enter a valid name (2 to 50 characters, no full sentences or punctuation).",
            };
          }

          return {
            ...state,
            step: "AGE",
            data: { ...state.data, name: trimmedValue },
            messages: [...state.messages, visitorMsg, rudraMsg],
            validationError: null,
          };
        }

        case "AGE": {
          const ageNum = parseInt(trimmedValue, 10);
          const isInvalid = isNaN(ageNum) || !Number.isInteger(ageNum) || ageNum < 1 || ageNum > 120;

          const visitorMsg: ChatMessage = {
            id: `msg-vis-${Date.now()}`,
            sender: "visitor",
            text: trimmedVisitorText || trimmedValue,
            timestamp: currentTimestamp,
          };

          const rudraMsg: ChatMessage = {
            id: `msg-rud-${Date.now()}`,
            sender: "rudra",
            text: customRudraReply || (isInvalid ? "Please enter a valid age (whole number between 1 and 120)." : "Thank you. Where are you currently located?"),
            timestamp: currentTimestamp,
          };

          if (isInvalid) {
            return {
              ...state,
              messages: [...state.messages, visitorMsg, rudraMsg],
              validationError: "Please enter a valid age (whole number between 1 and 120).",
            };
          }

          return {
            ...state,
            step: "LOCATION",
            data: { ...state.data, age: ageNum },
            messages: [...state.messages, visitorMsg, rudraMsg],
            validationError: null,
          };
        }

        case "LOCATION": {
          const isInvalid = !isValidNameOrLocation(trimmedValue);

          const visitorMsg: ChatMessage = {
            id: `msg-vis-${Date.now()}`,
            sender: "visitor",
            text: trimmedVisitorText || trimmedValue,
            timestamp: currentTimestamp,
          };

          const rudraMsg: ChatMessage = {
            id: `msg-rud-${Date.now()}`,
            sender: "rudra",
            text: customRudraReply || (isInvalid ? "Please enter a valid location (2 to 50 characters, no full sentences)." : "Understood. What is your email address so we may stay in touch?"),
            timestamp: currentTimestamp,
          };

          if (isInvalid) {
            return {
              ...state,
              messages: [...state.messages, visitorMsg, rudraMsg],
              validationError: "Please enter a valid location (2 to 50 characters, no full sentences or punctuation).",
            };
          }

          return {
            ...state,
            step: "EMAIL",
            data: { ...state.data, location: trimmedValue },
            messages: [...state.messages, visitorMsg, rudraMsg],
            validationError: null,
          };
        }

        case "EMAIL": {
          const isInvalid = !trimmedValue || !EMAIL_REGEX.test(trimmedValue);

          const visitorMsg: ChatMessage = {
            id: `msg-vis-${Date.now()}`,
            sender: "visitor",
            text: trimmedVisitorText || trimmedValue,
            timestamp: currentTimestamp,
          };

          const rudraMsg: ChatMessage = {
            id: `msg-rud-${Date.now()}`,
            sender: "rudra",
            text: customRudraReply || (isInvalid ? "Please enter a valid email address (e.g. name@example.com)." : "Thank you. Please describe your burden or grievance in detail—what is weighing on you today?"),
            timestamp: currentTimestamp,
          };

          if (isInvalid) {
            return {
              ...state,
              messages: [...state.messages, visitorMsg, rudraMsg],
              validationError: "Please enter a valid email address (e.g. name@example.com).",
            };
          }

          return {
            ...state,
            step: "GRIEVANCE",
            data: { ...state.data, email: trimmedValue },
            messages: [...state.messages, visitorMsg, rudraMsg],
            validationError: null,
          };
        }

        case "GRIEVANCE": {
          const isInvalid = !trimmedValue || trimmedValue.length < 1 || trimmedValue.length > 2000;

          const visitorMsg: ChatMessage = {
            id: `msg-vis-${Date.now()}`,
            sender: "visitor",
            text: trimmedVisitorText || trimmedValue,
            timestamp: currentTimestamp,
          };

          const rudraMsg: ChatMessage = {
            id: `msg-rud-${Date.now()}`,
            sender: "rudra",
            text: customRudraReply || (isInvalid ? "Please describe your burden (1 to 2000 characters)." : "I have recorded your transmission. Please review your details below and confirm submission when ready."),
            timestamp: currentTimestamp,
          };

          if (isInvalid) {
            return {
              ...state,
              messages: [...state.messages, visitorMsg, rudraMsg],
              validationError: "Please describe your burden (1 to 2000 characters).",
            };
          }

          return {
            ...state,
            step: "CONFIRM",
            data: { ...state.data, grievance: trimmedValue },
            messages: [...state.messages, visitorMsg, rudraMsg],
            validationError: null,
          };
        }

        case "CONFIRM":
        case "SUBMITTING":
        case "SUCCESS":
        case "ERROR":
          return state;

        default:
          return state;
      }
    }

    default:
      return state;
  }
}
