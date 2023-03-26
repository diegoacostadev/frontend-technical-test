import type {AppProps} from "next/app";

import {Nunito} from "next/font/google";

import "../styles/globals.css";
import Header from "@/components/Header";
const nunito = Nunito({subsets: ["latin"]});

function App({Component, pageProps}: AppProps) {
  return (
    <>
      <div className={`bg-gray-100 py-5 ${nunito.className} flex h-screen flex-col`}>
        <div className="container h-full flex flex-col">
          <div className="flex grow flex-col overflow-hidden rounded-3xl">
            <Header />
            <div className="flex grow flex-col bg-white overflow-hidden">
              <Component {...pageProps} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
