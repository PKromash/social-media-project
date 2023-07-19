import Navbar from "@/components/Navbar";
import Provider from "@/components/Provider";

export const Layout = ({children}) => {
  return (
    <html lang="en">
      <body>
        <Provider>
          <Navbar />
          <div style={{marginTop: "92px"}}>{children}</div>
        </Provider>
      </body>
    </html>
  );
};

export default Layout;
