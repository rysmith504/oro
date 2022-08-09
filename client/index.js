"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var App_1 = __importDefault(require("./components/App"));
var client_1 = require("react-dom/client");
var container = document.getElementById('app');
var root = (0, client_1.createRoot)(container); // createRoot(container!) if you use TypeScript
root.render(react_1.default.createElement(App_1.default, null));
// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById("root")
// );
