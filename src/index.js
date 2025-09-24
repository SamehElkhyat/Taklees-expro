import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./index.css";
import { store } from "./store/Store/Store.js";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import ChunkErrorBoundary from "./Component/ErrorBoundary/ChunkErrorBoundary";
import "./utils/chunkErrorHandler";

// Enhanced Loading component
const LoadingSpinner = () => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
    <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
      <p className="text-gray-600 font-medium">جاري تحميل التطبيق...</p>
    </div>
  </div>
)

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <ChunkErrorBoundary>
      <Suspense fallback={<LoadingSpinner />}>
        <RouterProvider router={router} />
      </Suspense>
    </ChunkErrorBoundary>
  </Provider>
);