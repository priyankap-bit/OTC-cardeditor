import { ReactNode } from "react";

import { DefaultRootProps } from "@/core";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import store from '../../../packages/core/components/Redux/Store/index';
import { Provider } from 'react-redux';
export type RootProps = {
  children: ReactNode;
  title: string;
} & DefaultRootProps;

function Root({ children, editMode }: RootProps) {
  return (
    <>
      {/* <Header editMode={editMode} /> */}
      <Provider store={store}>
        {children}
      </Provider>
      {/* <Footer>
        <Footer.List title="Section">
          <Footer.Link href="#">Label</Footer.Link>
          <Footer.Link href="#">Label</Footer.Link>
          <Footer.Link href="#">Label</Footer.Link>
          <Footer.Link href="#">Label</Footer.Link>
        </Footer.List>
        <Footer.List title="Section">
          <Footer.Link href="#">Label</Footer.Link>
          <Footer.Link href="#">Label</Footer.Link>
          <Footer.Link href="#">Label</Footer.Link>
          <Footer.Link href="#">Label</Footer.Link>
        </Footer.List>
        <Footer.List title="Section">
          <Footer.Link href="#">Label</Footer.Link>
          <Footer.Link href="#">Label</Footer.Link>
          <Footer.Link href="#">Label</Footer.Link>
          <Footer.Link href="#">Label</Footer.Link>
        </Footer.List>
        <Footer.List title="Section">
          <Footer.Link href="#">Label</Footer.Link>
          <Footer.Link href="#">Label</Footer.Link>
          <Footer.Link href="#">Label</Footer.Link>
          <Footer.Link href="#">Label</Footer.Link>
        </Footer.List>
      </Footer> */}
    </>
  );
}

export default Root;
